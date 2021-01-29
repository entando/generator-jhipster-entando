#!/bin/bash

set -e
source $(dirname $0)/00-init-env.sh

#-------------------------------------------------------------------------------
# Start docker container
#-------------------------------------------------------------------------------
cd "$JHI_FOLDER_APP"
if [ -a src/main/docker/keycloak.yml ]; then
    docker-compose -f src/main/docker/keycloak.yml up -d
fi
docker ps -a
