#!/bin/bash

action=$1

if [ $action = "" ]; then
  echo "Action not provided. Available ones: 'list', 'create', 'get', 'update', 'delete'"
  exit 1
fi

case $action in
  "list")
    curl localhost:8888/.netlify/functions/comments
    ;;
  "create")
    curl http://localhost:8888/.netlify/functions/comments \
      --include \
      --header "Content-Type: application/json" \
      --request "POST" \
      --data '{"slug": "hello", "content": "world"}'
    ;;
esac
