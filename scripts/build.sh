#!/usr/bin/env sh
base=$1
rm -rf "$base/dist"
node "$base/node_modules/webpack/bin/webpack.js"
