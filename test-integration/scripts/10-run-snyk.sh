#!/bin/bash

set -e
if [[ -a $(dirname $0)/00-init-env.sh ]]; then
    source $(dirname $0)/00-init-env.sh
else
    echo "*** 00-init-env.sh not found, relying on JHI_* en vars"
fi

#-------------------------------------------------------------------------------
# Generate the application
#-------------------------------------------------------------------------------
cd "$JHI_FOLDER_APP"
snyk test --all-projects --sarif-file-output=snyk.sarif --detection-depth=5
