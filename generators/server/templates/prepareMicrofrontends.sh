#!/bin/bash

BUNDLE_NAME=$(awk -F':' 'NR==1{gsub(" ","",$2); print $2}' ./bundle/descriptor.yaml)
WIDGET_FOLDER="ui/widgets";
BASE_LOG_OUTPUT="./.bundle_build/logs"
ERROR_OUTPUT="./.bundle_build/errors"
PIDS=()

function getMicrofrontendsNumber() {
    find "$WIDGET_FOLDER" -mindepth 3 -maxdepth 3 -type d -name bundle | wc -l
}

function processWidget() {
    local WIDGET_PATH="$1"
    local MFE_NAME="$2"
    local WIDGET_NAME="$3"

    (
       cd "$WIDGET_PATH"

       THIS=$BASHPID
       echo "Installing micro-frontend dependencies"
       npm install || return $?
       echo "Building micro-frontend code"
       npm run build --production | while read i
        do
            if [[ "$i" == *"Failed to compile"* ]]; then
                echo "$i" 1>&2
                echo "**ERROR DETECTED**" 1>&2
                ( sleep 3; kill $THIS ) &
            else
                echo "$i"
            fi
        done

       [ $? -ne 0 ] && return $?

       echo "$MFE_NAME - $WIDGET_NAME built successfully"
    ) || (
        touch "$ERROR_OUTPUT/$MFE_NAME-$WIDGET_NAME"
    )

}

if [ "$(getMicrofrontendsNumber)" -eq 0 ]; then
    echo "No micro-frontends found in $WIDGET_FOLDER, skipping this step"
    exit 0
else

    # Prepare supporting folders
    mkdir -p "$BASE_LOG_OUTPUT"
    rm -fr "$ERROR_OUTPUT" && mkdir -p "$ERROR_OUTPUT"

    # Get all entities
    ALL_MFE_PATHS=$(find "$WIDGET_FOLDER" -mindepth 3 -maxdepth 3 -type d -name bundle)
    ENTITIES=$(echo "$ALL_MFE_PATHS" | awk -F'/' '{print $3}' | sort -u)

    for ENTITY in $ENTITIES; do

        # Get entity widgets
        WIDGETS=$(echo "$ALL_MFE_PATHS" | awk -F'/' -v e_name="$ENTITY" '$3 == e_name {print $0}')

        for WIDGET_PATH in $WIDGETS; do

            # Process the widgets
            MFE_NAME=$(echo "$WIDGET_PATH" | awk -F'/' '{print $3}')
            WIDGET_NAME=$(echo "$WIDGET_PATH" | awk -F'/' '{print $4}')
            LOG_OUTPUT_FOLDER="$BASE_LOG_OUTPUT/$BUNDLE_NAME/$MFE_NAME"
            LOG_OUTPUT="$LOG_OUTPUT_FOLDER/$WIDGET_NAME.log"

            echo "- Processing micro-frontend $MFE_NAME - $WIDGET_NAME in background"
            echo "  Logs available at $LOG_OUTPUT"
            echo ""

            mkdir -p "$LOG_OUTPUT_FOLDER"
            processWidget "$WIDGET_PATH" "$MFE_NAME" "$WIDGET_NAME" >> "$LOG_OUTPUT" 2>&1 &
            PIDS+=($!)
        done
    done

    echo "Waiting for all processes to complete"

    # Wait for all the collected PIDs to terminate
    for PID in "${PIDS[@]}"; do
        wait "$PID"
    done

    echo "All processes completed"
    echo ""

    # Check for errors and in case exit
    ERROR_COUNT=$(find "$ERROR_OUTPUT" -type f | wc -l)
    if [ "$ERROR_COUNT" -ge 1 ]; then
        echo ""
        echo "ERROR: Some of the micro-frontend didnt built correctly; Check the logs in $BASE_LOG_OUTPUT"
        ERRORS=$(find "$ERROR_OUTPUT" -type f)
        for ERR in $ERRORS; do
            echo "> $ERR"
        done
        echo ""
        exit 1
    else
        echo ""
        echo "SUCCESS: All micro-frontends have been built correctly"
        echo ""
        exit 0
    fi
fi

