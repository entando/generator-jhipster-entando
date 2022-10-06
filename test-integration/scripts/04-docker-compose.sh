#!/bin/bash

function waitForKeycloak() {
    maxRetry=10
    counter=0

    while [[ "$counter" -lt "$maxRetry" ]]
    do
      if curl --fail http://localhost:9080/auth; then
        return 0
      else
        echo "##### Keycloak container not ready #$counter. Retrying in 5 secs"
        counter=$((counter+1))
        sleep 5
      fi;
    done

    echo "##### keycloak logs #####"
    docker logs docker_keycloak_1
    return 1
}

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
  # create keycloak-db folder and set permissions
  mkdir -p src/main/docker/keycloak/keycloak-db
  mkdir -p src/main/docker/keycloak/keycloak-db/content
  chmod -R 777 src/main/docker/keycloak/keycloak-db

  docker-compose -f src/main/docker/keycloak.yml up -d
  waitForKeycloak
  if [[ $? -eq 1 ]] ; then
    echo "### Keycloak container not ready. This could produce the pipeline failure ###"
    exit 1
  fi
fi
if [ -a src/main/docker/redis.yml ]; then
    docker-compose -f src/main/docker/redis.yml up -d
fi
docker ps -a
