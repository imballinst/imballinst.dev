#!/bin/bash

action=$1
# This second argument is replacable.
# By default, this refers to Hades' uuid.
uuid="${2:-4c0ba5d1-8139-4506-9334-08a8c3314c0d}"

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
  "get")
    curl localhost:8888/.netlify/functions/comments/$uuid
    ;;
  "update")
    curl http://localhost:8888/.netlify/functions/comments/$uuid \
      --include \
      --header "Content-Type: application/json" \
      --request "PUT" \
      --data '{"id": "4c0ba5d1-8139-4506-9334-08a8c3314c0d", "name": "Haydes", "role": "Emet-Selch", "level": 99},'
    ;;
  "delete")
    curl http://localhost:8888/.netlify/functions/comments/$uuid \
      --request "DELETE"
    ;;
esac
