#!/usr/bin/env bash

set -euo pipefail

npx changeset pre exit alpha
git add .
git commit -m "Exit release candidate"
git push origin

echo "arvici"
echo $REF_NAME

git checkout changeset-release/$REF_NAME

echo "awesome"

git merge $REF_NAME

echo "good"