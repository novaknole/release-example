#!/usr/bin/env bash

set -euo pipefail

echo $PACKAGE_NAME_TO_PUBLISH

arr=("@glagh/giorgi-contracts-monorepo" "@glagh/giorgi-configs-monorepo")

if [ "$IS_PRERELEASE" == "true" ]; then
    changeset pre enter alpha || true
else
    changeset pre exit alpha || true
fi

echo "coming here1"

# Loop through the array
for item in "${arr[@]}"; do
if [[ "$item" != "$PACKAGE_NAME_TO_PUBLISH" ]]; then
    echo "coming here2"
    changeset version --ignore $item
    echo "coming here3"
fi
done
