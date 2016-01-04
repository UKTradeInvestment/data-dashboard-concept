#!/bin/bash
rm -rf dist server-prod.js
webpack --config ./webpack.production.config.js --progress --profile --colors
babel server.js -o server-prod.js
babel app -d dist
