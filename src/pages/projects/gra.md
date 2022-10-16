---
title: gra
description: gra is a remote address getter for a particular URL.
publishDate: 2021-05-27T10:39:00.000Z
githubLink: https://github.com/Imballinst/gra
---

`gra` stands for "Get Remote Address". The motivation of this project was to get the remote address of a DNS that is generated with Elastic Load Balancing (ELB) from Amazon Web Services (AWS), such as https://somerandomstring.us-east-1.elb.amazonaws.com. More information about Elastic Load Balancing can be seen here: https://docs.aws.amazon.com/elasticloadbalancing/latest/classic/elb-internet-facing-load-balancers.html.

It can be used to get the remote address of other DNS as well. For example, Google's:

```shell
$ curl --request POST \
  --url https://gra-get-remote-address.herokuapp.com/ip \
  --header 'Content-Type: application/json' \
  --data '{
        "url": "https://google.com"
}'
{"data":{"ip":"172.217.164.142"}}
```

This project was made using [Express](http://expressjs.com) and deployed in Heroku. Underneath, it uses the built-in `dns` package which is used to resolve the remote address.
