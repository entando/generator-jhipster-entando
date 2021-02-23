#!/bin/bash

set -e
if [[ -a $(dirname $0)/00-init-env.sh ]]; then
    source $(dirname $0)/00-init-env.sh
else
    echo "*** 00-init-env.sh not found, relying on JHI_* en vars"
fi

#-------------------------------------------------------------------------------
# Package the backend app
#-------------------------------------------------------------------------------
cd "$JHI_FOLDER_APP"
if [ -f "mvnw" ]; then
    ./mvnw -ntp verify -DskipTests -P"$JHI_PROFILE" --batch-mode
    mv target/*.jar app.jar
elif [ -f "gradlew" ]; then
    ./gradlew bootJar -P"$JHI_PROFILE" -x test
    mv build/libs/*SNAPSHOT.jar app.jar
fi
