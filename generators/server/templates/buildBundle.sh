#!/bin/bash
BUNDLE_NAME=$(awk -F':' 'NR=1 {print $2}' ./bundle/descriptor.yaml)

echo "Generation of the $BUNDLE_NAME bundle"
echo "====================================="

echo "Preparing micro-frontends for inclusion in the bundle"
./prepareMicrofrontends.sh
echo 
echo "---"
echo
echo "Including micro-frontends metadata and resources in the bundle package"
./prepareBundle.sh
echo
echo "---"
echo
echo "All done! Bundle available in the $(pwd)/bundle folder"

