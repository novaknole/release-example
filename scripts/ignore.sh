#!/usr/bin/env bash

set -euo pipefail

# Define the mapping as an associative array
mapping="contracts:@glagh/giorgi-contracts-monorepo configs:@glagh/giorgi-configs-monorepo"

echo $REF_NAME

# if we did workflow dispatch manually on release-v, that means we want to release main version, so we exit the pre mode.
# if something was pushed to release-.., we still don't exit pre-mode.

echo $EVENT_NAME

echo "Loopsing through keys and values:"

# for pair in $mapping; do
# key="${pair%%:*}"
# value="${pair#*:}"

#     if [[ "$key" != "$package" ]]; then
#         changeset version --ignore $value
#     fi
# done

