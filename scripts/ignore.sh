#!/usr/bin/env bash

set -euo pipefail

echo "awesome99"

echo $PACKAGE_NAME_TO_PUBLISH

# TEMP_BRANCH=changeset-temp-release/main
# RELEASE_BRANCH=changeset-release/main

# if [ "$WHEN" == "before" ]; then
#     echo "awesome123"

#     echo $PACKAGE_NAME_TO_PUBLISH

#     arr=("@glagh/giorgi-contracts-monorepo" "@glagh/giorgi-configs-monorepo")

#     git checkout -b "$TEMP_BRANCH"

#     # Loop through the array
#     for item in "${arr[@]}"; do
#     if [[ "$item" != "$PACKAGE_NAME_TO_PUBLISH" ]]; then
#         changeset version --ignore $item
#     fi
#     done

#     git add .
#     git commit -m "Ignored changesets of all packages except $PACKAGE_NAME_TO_PUBLISH"

#     # Push branch
#     if ! git push origin "$TEMP_BRANCH"; then
#         echo "Can't push $TEMP_BRANCH."
#         exit 1
#     fi
# fi

# if [ "$WHEN" == "after" ]; then
#     git checkout $RELEASE_BRANCH
#     git merge $TEMP_BRANCH
#     git push origin $RELEASE_BRANCH
#     git branch -D $TEMP_BRANCH
# fi