#!/bin/bash

echo "build start------"

cd book && mkdocs build

sleep 5

cd ../frontend && mkdocs build 

sleep 15

cd ../backend && mkdocs build

sleep 15

cd ../personal && mkdocs build

sleep 10

echo "build end------"
echo -e "\n\n"
