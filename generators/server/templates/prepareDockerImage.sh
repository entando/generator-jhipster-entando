#!/bin/sh

echo ""
echo "Building project and Docker image "
export MY_IMAGE=$(./mvnw -Pprod clean package jib:dockerBuild | while read i
do

	if [[ "$i" == *"Built image to Docker daemon"* ]]; then
		echo "$i" | awk '{print $NF}'
	fi
done
)
echo "Built $MY_IMAGE"

echo ""
echo "Uploading $MY_IMAGE to dockerhub"
docker push $MY_IMAGE
