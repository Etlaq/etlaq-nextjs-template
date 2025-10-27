#!/bin/bash

# Pexels Image Fetcher
# Usage: ./fetch-images.sh "search query" [per_page] [page]
# Example: ./fetch-images.sh "technology" 5 1

# Pexels API Configuration
API_KEY="Sd9Donnm80Sdw3iBPISdo6d1oCCg7ZwmOrcgv8W1BLyZaidJYOJCxLjb"
BASE_URL="https://api.pexels.com/v1"

# Parse arguments
QUERY="${1:-technology}"
PER_PAGE="${2:-15}"
PAGE="${3:-1}"

# Build URL
URL="${BASE_URL}/search?query=${QUERY}&per_page=${PER_PAGE}&page=${PAGE}"

# Fetch images
echo "Fetching images for: '$QUERY' (page: $PAGE, per_page: $PER_PAGE)"
echo "---"

curl -s "$URL" \
  -H "Authorization: $API_KEY" \
  | jq -r '.photos[] | "ID: \(.id)\nURL: \(.src.large)\nPhotographer: \(.photographer)\nAlt: \(.alt)\n---"'

# Alternative: Save JSON response to file
# FILENAME="pexels_${QUERY// /_}_$(date +%s).json"
# curl -s "$URL" -H "Authorization: $API_KEY" > "$FILENAME"
# echo "Saved to: $FILENAME"
