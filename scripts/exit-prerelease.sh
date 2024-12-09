#!/usr/bin/env bash

set -euo pipefail

npx changeset pre exit alpha
git add .
git commit -m "Exit release candidate"
git push origin

git checkout changeset-release/$REF_NAME

git merge $REF_NAME