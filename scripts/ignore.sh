#!/usr/bin/env bash

set -euo pipefail

# Define the mapping as an associative array
mapping="contracts:@glagh/giorgi-contracts-monorepo configs:@glagh/giorgi-configs-monorepo"

echo $PACKAGE

# arr=("@glagh/giorgi-contracts-monorepo" "@glagh/giorgi-configs-monorepo")

# if [ "$IS_PRERELEASE" == "true" ]; then
#     changeset pre enter alpha || true
# else
#     changeset pre exit alpha || true
# fi


echo "Looping through keys and values:"

for pair in $mapping; do
key="${pair%%:*}"
value="${pair#*:}"

    if [[ "$key" != "$package" ]]; then
        changeset version --ignore $value
    fi
done

