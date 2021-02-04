#!/bin/bash

set -e
if [[ -a $(dirname $0)/00-init-env.sh ]]; then
    source $(dirname $0)/00-init-env.sh
else
    echo "*** 00-init-env.sh not found, relying on JHI_* en vars"
fi

prepareFolder() {
    rm -rf "$JHI_FOLDER_APP"
    mkdir -p "$JHI_FOLDER_APP"/.jhipster/
}

moveEntity() {
    local entity="$1"
    cp "$JHI_SAMPLES"/.jhipster/"$entity".json "$JHI_FOLDER_APP"/.jhipster/
}

#-------------------------------------------------------------------------------
# Generate project with jhipster
#-------------------------------------------------------------------------------
prepareFolder
cd "$JHI_FOLDER_APP"

#-------------------------------------------------------------------------------
# Copy jhipster config
#-------------------------------------------------------------------------------
cp -f "$JHI_SAMPLES"/"$JHI_APP"/.yo-rc.json "$JHI_FOLDER_APP"/

#-------------------------------------------------------------------------------
# Copy the entities
#-------------------------------------------------------------------------------
moveEntity BankAccount
moveEntity Label
moveEntity Operation

#-------------------------------------------------------------------------------
# Print entities json
#-------------------------------------------------------------------------------
echo "*** Entities:"
ls -alR .

runOptions="--blueprints entando --skip-checks --force --no-insight --skip-install --with-entities"

jhipster $runOptions
