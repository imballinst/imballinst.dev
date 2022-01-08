package main

import (
	"encoding/json"
	"flag"
	"fmt"
	"log"
	"net/http"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

func handler(request events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {
	return &events.APIGatewayProxyResponse{
		StatusCode: 200,
		Headers:    map[string]string{"Content-Type": "application/json"},
		// MultiValueHeaders: http.Header{"Set-Cookie": {"Ding", "Ping"}},
		Body: "{message: Hello, world!}",
	}, nil
}

func handlerServeHTTP(w http.ResponseWriter, req *http.Request) {
	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/json")

	resp := "{message: Hello, world!}"
	jsonResp, err := json.Marshal(resp)
	if err != nil {
		log.Fatalf("Error happened in JSON marshal. Err: %s", err)
	}

	w.Write(jsonResp)
	return
}

func main() {
	// Idea is taken from https://blog.carlmjohnson.net/post/2020/how-to-host-golang-on-netlify-for-free/.
	port := flag.Int("port", -1, "specify http port for local development; AWS lambda will be used if omitted")
	flag.IntVar(port, "p", *port, "alias for port")
	flag.Parse()

	if *port == -1 {
		// Make the handler available for Remote Procedure Call.
		lambda.Start(handler)
	} else {
		http.Handle("/", http.HandlerFunc(handlerServeHTTP))

		if err := http.ListenAndServe(fmt.Sprintf(":%d", *port), nil); err != nil {
			log.Fatal(err)
		}
	}
}
