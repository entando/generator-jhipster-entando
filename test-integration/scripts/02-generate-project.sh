#!/bin/bash

set -e
if [[ -a $(dirname $0)/00-init-env.sh ]]; then
    source $(dirname $0)/00-init-env.sh
else
    echo "*** 00-init-env.sh not found, relying on JHI_* en vars"
fi

#-------------------------------------------------------------------------------
# Generate project with jhipster
#-------------------------------------------------------------------------------
rm -rf "$JHI_FOLDER_APP"
mkdir -p "$JHI_FOLDER_APP"
mkdir -p "$JHI_FOLDER_APP/.jhipster"
# Copy the project definition file
cp -f "$JHI_SAMPLES"/"$JHI_APP"/.yo-rc.json "$JHI_FOLDER_APP"/
# Copy the entities definition files
cp -f "$JHI_SAMPLES"/.jhipster/* "$JHI_FOLDER_APP"/.jhipster/
cd "$JHI_FOLDER_APP"
ls -al .

runOptions="--blueprints entando --skip-checks --force --no-insight --skip-install --with-entities"

jhipster $runOptions
