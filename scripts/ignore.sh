#!/usr/bin/env bash

set -euo pipefail

echo "awesome123"

echo $PACKAGE_NAME_TO_PUBLISH

arr=("@glagh/giorgi-contracts-monorepo" "@glagh/giorgi-configs-monorepo")


# Loop through the array
for item in "${arr[@]}"; do
  if [[ "$item" != "$PACKAGE_NAME_TO_PUBLISH" ]]; then
    changeset version --ignore @item
  fi
done