#!/usr/bin/env bash

set -euo pipefail

RELEASE_BRANCH=changeset-release/main

echo "awesome123"

echo $PACKAGE_NAME_TO_PUBLISH

arr=("@glagh/giorgi-contracts-monorepo" "@glagh/giorgi-configs-monorepo")

# Loop through the array
for item in "${arr[@]}"; do
  if [[ "$item" != "$PACKAGE_NAME_TO_PUBLISH" ]]; then
    changeset version --ignore $item
  fi
done

git add .
git commit -m "Ignored changesets of all packages except $PACKAGE_NAME_TO_PUBLISH"

# Push branch
if ! git push origin "$RELEASE_BRANCH"; then
  echo "Can't push $RELEASE_BRANCH."
  exit 1
fi