#!/usr/bin/env sh

set -e

npm run build

cd dist

echo > .nojekyll

echo 'base64.rafaelfranco.com' > CNAME

git init
git checkout -B main
git add -A
git commit -m 'deploy'

git push -f git@github.com:rfoel/base64-to-pdf.git main:gh-pages

cd -
