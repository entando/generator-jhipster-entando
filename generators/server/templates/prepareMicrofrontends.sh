#!/bin/bash 

function processWidget() {
    local BASE_DIR
    local WIDGET_PATH="$1"
    local MFE_NAME="$2"
    local WIDGET_NAME="$3"
    local LOG_OUTPUT_FOLDER="$BASE_LOG_OUTPUT/$MFE_NAME"
    local LOG_OUTPUT="$BASE_LOG_OUTPUT/$MFE_NAME/$WIDGET_NAME.log"

    BASE_DIR=$(pwd)

    echo "---"
    echo "Processing micro-frontend $MFE_NAME - $WIDGET_NAME"
    echo "Logs available at $LOG_OUTPUT"
    echo ""

    cd "$WIDGET_PATH" || exit 1
    mkdir -p "$LOG_OUTPUT_FOLDER"

    echo "Installing micro-frontend dependencies"
    npm install &>>  "$LOG_OUTPUT"

    echo "Building micro-frontend code"
    npm run build &>> "$LOG_OUTPUT"

    echo "$MFE_NAME - $WIDGET_NAME built successfully"

    cd "$BASE_DIR"
}

export BASE_LOG_OUTPUT="/tmp/entando-blueprint/logs"

WIDGET_FOLDER="ui/widgets";
find "$WIDGET_FOLDER" -maxdepth 2 -mindepth 2 -type d -not -path "*utils*" > /dev/null 2>&1
HAS_WIDGETS=$?

if [ $HAS_WIDGETS -eq 1 ]; then
    echo "No micro-frontends found in $WIDGET_FOLDER, skipping this step"
    exit 0
else
    WIDGETS=$(find "$WIDGET_FOLDER" -maxdepth 2 -mindepth 2 -type d -not -path "*utils*")
    set -e
    for WIDGET_PATH in $WIDGETS; do
        MFE_NAME=$(echo "$WIDGET_PATH" | awk -F'/' '{print $3}')
        WIDGET_NAME=$(echo "$WIDGET_PATH" | awk -F'/' '{print $4}')

        processWidget "$WIDGET_PATH" "$MFE_NAME" "$WIDGET_NAME"
    done

    echo ""
    echo "SUCCESS: All micro-frontends have been built correctly"
    echo ""
fi
