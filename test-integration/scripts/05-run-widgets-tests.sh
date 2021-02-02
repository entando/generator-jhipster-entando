#!/bin/bash

set -e
if [[ -a $(dirname $0)/00-init-env.sh ]]; then
    source $(dirname $0)/00-init-env.sh
else
    echo "*** 00-init-env.sh not found, relying on JHI_* en vars"
fi

DEFAULT_MFE_NAME=bank-account
#-------------------------------------------------------------------------------
# Run server test
#-------------------------------------------------------------------------------

for widget in detailsWidget formWidget tableWidget
do
  cd "$JHI_FOLDER_APP/ui/widgets/$DEFAULT_MFE_NAME/$widget/"
  npm i && npm test
done
