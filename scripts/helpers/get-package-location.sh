#!/bin/bash

# Ensure `jq` is installed
if ! command -v jq &> /dev/null; then
    echo "jq is required but not installed. Install it and try again."
    exit 1
fi

# Get the workspace info as JSON
workspacesInfo=$(yarn --silent --json workspaces info)

# Parse the JSON data
data=$(echo "$workspacesInfo" | jq -r '.data')

# Convert the nested JSON string back into a JSON object
workspaces=$(echo "$data" | jq -r '.')

# Package name to look for
name="$1"

# Check if the package exists
if ! echo "$workspaces" | jq -e ".[\"$name\"]" &> /dev/null; then
    echo "Package name \"$name\" not found in workspace info."
    exit 1
fi

# Extract the location of the package
packageLocation=$(echo "$workspaces" | jq -r ".[\"$name\"].location")

# Print the location
echo "$packageLocation"