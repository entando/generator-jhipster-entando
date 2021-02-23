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

launchCurlTests() {
    endpointsToTest=("$@")
    retryCount=1
    maxRetry=10
    httpUrl="http://localhost:8081/services/test"

    for endpoint in "${endpointsToTest[@]}"; do
        curl -fv "$httpUrl$endpoint"
        status=$?
        while [ "$status" -ne 0 ] && [ "$retryCount" -le "$maxRetry" ]; do
            echo "*** [$(date)] Application not reachable yet. Sleep and retry - retryCount =" $retryCount "/" $maxRetry
            retryCount=$((retryCount+1))
            sleep 10
            curl -fv "$httpUrl$endpoint"
            status=$?
        done

        if [ "$status" -ne 0 ]; then
            echo "*** [$(date)] Not connected after" $retryCount " retries."
            return 1
        fi
    done
    return $?
}

#-------------------------------------------------------------------------------
# Run the application
#-------------------------------------------------------------------------------
cd "$JHI_FOLDER_APP"
java \
    -jar app.jar \
    --spring.profiles.active="$JHI_PROFILE" \
    --logging.level.ROOT=OFF \
    --logging.level.org.zalando=OFF \
    --logging.level.org.springframework.web=ERROR \
    --logging.level.tech.jhipster=OFF \
    --logging.level.tech.jhipster.sample=OFF &
echo $! > .pidRunApp
sleep 40

# Curl some test endpoints
endpointsToTest=(
    '/'
    '/management/health'
    '/management/health/liveness'
    '/management/health/readiness'
)
launchCurlTests "${endpointsToTest[@]}"

#-------------------------------------------------------------------------------
# Run e2e tests
#-------------------------------------------------------------------------------
runMFE_E2eTests bank-account

resultRunApp=$?
kill $(cat .pidRunApp)

exit $((resultRunApp))
