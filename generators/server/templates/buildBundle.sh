#!/bin/bash
set -e
BUNDLE_NAME=$(awk -F':' 'NR==1 {gsub(/ /, "", $2); print $2}' ./bundle/descriptor.yaml)

echo "Generation of the $BUNDLE_NAME bundle"
echo "====================================="
echo ""

echo "Step 1. Preparing micro-frontends for inclusion in the bundle"
./prepareMicrofrontends.sh
echo "---"
echo "Step 2. Including micro-frontends metadata and resources in the bundle package"
./prepareBundle.sh
echo "---"
echo "All done! Bundle available in the $(pwd)/bundle folder"

