#!/bin/bash

set -e
if [[ -a $(dirname $0)/00-init-env.sh ]]; then
    source $(dirname $0)/00-init-env.sh
else
    echo "*** 00-init-env.sh not found, relying on JHI_* en vars"
fi

#-------------------------------------------------------------------------------
# Start docker container
#-------------------------------------------------------------------------------
cd "$JHI_FOLDER_APP"
if [ -a src/main/docker/keycloak.yml ]; then
    docker-compose -f src/main/docker/keycloak.yml up -d
fi
docker ps -a
