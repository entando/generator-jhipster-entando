#!/bin/bash
set -e

while [[ "$1" =~ ^- && ! "$1" == "--" ]]; do case $1 in
  -d | --docker )
    docker="true";
    ;;
esac; shift; done
if [[ "$1" == '--' ]]; then shift; fi

BUNDLE_NAME=$(awk -F':' 'NR==1 {gsub(/ /, "", $2); print $2}' ./bundle/descriptor.yaml)
STEP=1

echo "Generation of the $BUNDLE_NAME bundle"
echo "====================================="
echo ""


if [[ -n "$docker" ]]; then
	echo "Step $STEP. Preparing docker image"
	./prepareDockerImage.sh
	echo "---"
	STEP=$((STEP+1))
fi

echo "Step $STEP. Preparing micro-frontends for inclusion in the bundle"
./prepareMicrofrontends.sh
echo "---"
STEP=$((STEP+1))
echo "Step $STEP. Including micro-frontends metadata and resources in the bundle package"
./prepareBundle.sh
echo "---"
echo "All done! Bundle available in the $(pwd)/bundle folder"

