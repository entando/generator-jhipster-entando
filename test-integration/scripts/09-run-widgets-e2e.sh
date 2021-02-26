#!/bin/bash

set -e
if [[ -a $(dirname $0)/00-init-env.sh ]]; then
    source $(dirname $0)/00-init-env.sh
else
    echo "*** 00-init-env.sh not found, relying on JHI_* en vars"
fi

runMFE_E2eTests() {
  local entityFolderName="$1"

  for widget in detailsWidget formWidget tableWidget
  do
    cd "$JHI_FOLDER_APP/ui/widgets/$entityFolderName/$widget/"
    npm run ci:cypress:run
  done
}

#-------------------------------------------------------------------------------
# Run e2e tests
#-------------------------------------------------------------------------------
runMFE_E2eTests bank-account
