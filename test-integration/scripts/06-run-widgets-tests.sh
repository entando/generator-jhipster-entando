#!/bin/bash

set -e
if [[ -a $(dirname $0)/00-init-env.sh ]]; then
    source $(dirname $0)/00-init-env.sh
else
    echo "*** 00-init-env.sh not found, relying on JHI_* en vars"
fi

runMFETests() {
  local entityFolderName="$1"

  for widget in detailsWidget formWidget tableWidget
  do
    cd "$JHI_FOLDER_APP/ui/widgets/$entityFolderName/$widget/"
    npm i && npm test
  done
}

#-------------------------------------------------------------------------------
# Run server test
#-------------------------------------------------------------------------------
runMFETests bank-account
runMFETests label
runMFETests operation
