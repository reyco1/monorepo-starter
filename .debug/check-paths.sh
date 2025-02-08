#!/bin/bash
echo "Frontend build output structure:"
tree frontend/dist 2>/dev/null || find frontend/dist -type d 2>/dev/null || echo "Directory not found: frontend/dist"

echo -e "\nIndex.html location:"
find frontend/dist -name "index.html" 2>/dev/null || echo "No index.html found"

echo -e "\nContents of index.html location:"
INDEX_PATH=$(find frontend/dist -name "index.html" 2>/dev/null)
if [ -n "$INDEX_PATH" ]; then
    ls -la "$(dirname "$INDEX_PATH")"
fi

echo -e "\nBackend build output:"
ls -la backend/dist 2>/dev/null || echo "Directory not found: backend/dist"

echo -e "\nFirebase hosting public directory contents:"
FIREBASE_PUBLIC=$(node -e "console.log(require('./firebase.json').hosting.public)")
echo "Checking contents of: $FIREBASE_PUBLIC"
ls -la "$FIREBASE_PUBLIC" 2>/dev/null || echo "Directory not found: $FIREBASE_PUBLIC"
