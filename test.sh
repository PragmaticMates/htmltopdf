#!/bin/sh
curl -X POST \
  http://localhost:3000/generate-pdf \
  -H 'Accept: */*' \
  -H 'Accept-Encoding: gzip, deflate' \
  -H 'Content-Type: text/html' \
  --data @'input.html' \
  --output 'output.pdf'