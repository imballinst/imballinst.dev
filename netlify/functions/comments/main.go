package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"
	"strings"
	"time"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"

	f "github.com/fauna/faunadb-go/v5/faunadb"
)

// Reference on the tags: https://dev.to/faruq2/how-to-build-a-crud-rest-api-with-go-gin-and-fauna-37o6.
type Comment struct {
	Slug     string    `json:"slug" fauna:"slug"`
	Content  string    `json:"content" fauna:"content"`
	Datetime time.Time `json:"datetime" fauna:"datetime"`
}

type HttpError struct {
	code int
	err  error
}

var (
	secret   = os.Getenv("FAUNA_SECRET")
	endpoint = os.Getenv("FAUNA_ENDPOINT")
)
var client *f.FaunaClient

func handler(request events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {
	if request.HTTPMethod == "GET" {
		comments, err := listComments(request)
		return sendResponse(comments, err, 200)
	} else if request.HTTPMethod == "POST" {
		comment, err := postComments(request)
		return sendResponse(comment, err, 200)
	}

	return &events.APIGatewayProxyResponse{
		StatusCode: 501,
	}, nil
}

func main() {
	initializeLocalFauna()

	client = f.NewFaunaClient(secret, f.Endpoint("https://db.us.fauna.com"))

	// Make the handler available for Remote Procedure Call
	lambda.Start(handler)
}

// Get environment variables for local development.
func initializeLocalFauna() {
	if secret == "" && endpoint == "" {
		file, err := ioutil.ReadFile("./.env.sh")

		if err == nil {
			content := string(file)
			contentSlice := strings.Split(content, "\n")
			m := map[string]string{}

			for _, row := range contentSlice {
				kv := strings.Split(row, "=")
				l := len(kv)

				if l == 2 {
					m[kv[0]] = kv[1]
				}
			}

			secret = m["FAUNA_SECRET"]
			endpoint = m["FAUNA_ENDPOINT"]
		}
	}
}

func sendResponse(body interface{}, httpError HttpError, defaultStatusCode int) (*events.APIGatewayProxyResponse, error) {
	// Send response error from querying stuff.
	if httpError.err != nil {
		return &events.APIGatewayProxyResponse{
			StatusCode: httpError.code,
			Headers:    map[string]string{"Content-Type": "application/json"},
			Body:       string(httpError.err.Error()),
		}, nil
	}

	// Marshal to []byte.
	j, err := json.Marshal(body)
	if err != nil {
		return &events.APIGatewayProxyResponse{
			StatusCode: 500,
			Headers:    map[string]string{"Content-Type": "application/json"},
			Body:       string(err.Error()),
		}, nil
	}

	var statusCode int

	if defaultStatusCode != 0 {
		statusCode = defaultStatusCode
	} else {
		statusCode = 200
	}

	// Send successful response.
	return &events.APIGatewayProxyResponse{
		StatusCode: statusCode,
		Headers:    map[string]string{"Content-Type": "application/json"},
		Body:       string(j),
	}, nil
}

// GET.
func listComments(request events.APIGatewayProxyRequest) ([]Comment, HttpError) {
	res, err := client.
		Query(
			f.Select("data",
				f.
					Map(f.
						Paginate(f.
							Match(f.
								Index("all_comments"))), f.
						Lambda("x", f.Select("data", f.Get(f.Var("x")))))),
		)

	if err != nil {
		return nil, HttpError{code: 500, err: err}
	}

	marshalled, err := f.MarshalJSON(res)

	r := strings.NewReader(string(marshalled))

	var c []Comment
	err = json.NewDecoder(r).Decode(&c)
	fmt.Println(res, string(marshalled), c)
	// err = json.Unmarshal(marshalled, &c)
	// fmt.Println(res, string(marshalled), c)

	// if err != nil {
	// 	return nil, HttpError{code: 500, err: err}
	// }

	return c, HttpError{code: 0, err: nil}
}

// POST.
func postComments(request events.APIGatewayProxyRequest) (Comment, HttpError) {
	var c Comment

	err := json.Unmarshal([]byte(request.Body), &c)
	if err != nil {
		return c, HttpError{code: 500, err: err}
	}

	c.Datetime = time.Now()
	_, err = client.Query(
		f.Create(
			f.Collection("comments"),
			f.Obj{"data": f.Obj{
				"slug":     c.Slug,
				"content":  c.Content,
				"datetime": c.Datetime,
			}}))

	if err != nil {
		return c, HttpError{code: 500, err: err}
	}

	return c, HttpError{code: 0, err: nil}
}
