#!/bin/bash

# Test Spotify API Routes
# This script tests all Spotify API endpoints to check if they're working

echo "=== Testing Spotify API Routes ==="
echo ""

BASE_URL="http://localhost:3000"

echo "1. Testing /api/spotify/now-playing"
curl -s "$BASE_URL/api/spotify/now-playing" | python3 -m json.tool 2>/dev/null || curl -s "$BASE_URL/api/spotify/now-playing"
echo ""
echo ""

echo "2. Testing /api/spotify/top-tracks?limit=5"
curl -s "$BASE_URL/api/spotify/top-tracks?limit=5" | python3 -m json.tool 2>/dev/null || curl -s "$BASE_URL/api/spotify/top-tracks?limit=5"
echo ""
echo ""

echo "3. Testing /api/spotify/create-playlist?time_range=long_term&limit=5"
curl -s -X POST "$BASE_URL/api/spotify/create-playlist?time_range=long_term&limit=5" | python3 -m json.tool 2>/dev/null || curl -s -X POST "$BASE_URL/api/spotify/create-playlist?time_range=long_term&limit=5"
echo ""
echo ""

echo "=== Test Complete ==="
echo ""
echo "Check the server logs for detailed error messages if any endpoint failed."

