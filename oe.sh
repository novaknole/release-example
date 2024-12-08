#!/bin/bash

# Define the package name
packageName="@glagh/giorgi-contracts-monorepo"

# Call the helper script
packageLocation=$(./scripts/helpers/get-package-location.sh "$packageName")

# Check if the location was retrieved
if [ -z "$packageLocation" ]; then
    echo "Failed to retrieve location for $packageName."
    exit 1
fi

# Use the package location
echo "The location of $packageName is $packageLocation"