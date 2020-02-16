#!/bin/bash
function createFolderTree() {
    local widgetFolder="$1"

    echo "- Creating folder structure for $widgetFolder"
    mkdir -p bundle/"$widgetFolder"/resources/static/{js,css}

    # Copy bundle metadata and template
    cp "$widgetFolder"/bundle/* bundle/"$widgetFolder"/

    # Copying resources for widgets
    cp "$widgetFolder"/build/static/js/*.js bundle/"$widgetFolder"/resources/static/js

    local jsExitStatus=$?
    if [ $jsExitStatus -ne 0 ]; then
        echo " > no js found for $widgetFolder"
    fi

    cp "$widgetFolder"/build/static/css/*.css bundle/"$widgetFolder"/resources/static/css 2>/dev/null

    local cssExitStatus=$?
    if [ $cssExitStatus -ne 0 ]; then
        echo " > no css found for $widgetFolder"
    fi

}

function injectResource() {
    local resource="$1"
    local destFile="$2"

    echo "- Injecting resource $resource in $destFile"
    sed -i 's|'"$INJECTION_POINT"'|'"$resource"'\n'"$INJECTION_POINT"'|g' "$destFile"
}

function updateFTLTemplate() {
    shopt -s nullglob # Set the results of globs in forloop to emptylist if no file is found
    local dir="$1"
    local bundleCode="$2"

    widgetName=$(basename "$dir")
    echo "> Updating ${widgetName} micro-frontend resources for $dir"

    for ftlName in "$dir"/*.ftl;
    do
        [ -e "$ftlName" ] || continue
        #For every JS file add a script reference in the widget FTL
        for jspath in "$dir"/resources/static/js/*;
        do
            # This moves the referenced file to the top level bundle/resources/static dir for correct processing when loaded
            jsfile=$(basename "$jspath")


            cp "$dir/resources/static/js/$jsfile" bundle/resources/static/js/
            resource="<script src=\"<@wp.resourceURL />${bundleCode}/static/js/${jsfile}\"></script>"
            injectResource "$resource" "$ftlName"
        done

        # For every CSS file add a script reference in the widget FTL
        for csspath in "$dir"/resources/static/css/*;
        do

          # This moves the referenced file to the top level bundle/resources/static dir for correct processing when loaded
          cssfile=$(basename "$csspath")

          cp "$dir/resources/static/css/$cssfile" bundle/resources/static/css/
          resource="<link href=\"<@wp.resourceURL />${bundleCode}/static/css/${cssfile}\" rel=\"stylesheet\">"
          injectResource "$resource" "$ftlName"
        done
    done

    #Cleanup the resources that were copied into the widget folders specifically. They are now copied into the main bundle folder
    rm -rf "$dir/resources"
    shopt -u nullglob

}

export -f createFolderTree
export -f injectResource
export -f updateFTLTemplate
export INJECTION_POINT="<#-- entando_resource_injection_point -->"

BUNDLE_NAME=$(awk -F':' 'NR==1 {gsub(/ /, "", $2); print $2}' ./bundle/descriptor.yaml)
WIDGET_FOLDER="ui/widgets"

find "$WIDGET_FOLDER" -maxdepth 2 -mindepth 2 -type d -not -path "*utils*" > /dev/null 2>&1
HAS_WIDGETS=$?

if [ $HAS_WIDGETS -eq 0 ]; then
    # This command assumes that the widgets are all under ui/widgets/<entity>/<widget>. The command finds all of the micro-frontends in those folders and
    # copies the result of the build into the bundle resources folder so that the bundle can be deployed to a digital exchange instance (or imported on an existing page).
    # The command also copies css optionally with this structure since some widgets will be js only 2>/dev/null || :
    echo "---"
    echo "Generating the bundle folder tree for the micro-frontends"
    echo ""
    find "$WIDGET_FOLDER" -maxdepth 2 -mindepth 2 -type d -not -path "*utils*" -exec bash -c 'createFolderTree "$@"' bash {} \;
    mkdir -p bundle/resources/static/{js,css}
    echo ""

    # #Fetch the top level service name from the pom and use this as the context directory for the publishing of assets specific to the project when building the bundle
    # artifactId=$(awk -F'[><]' '/<artifactId>.*<\/artifactId>/ {print $3; exit}' pom.xml)
    # echo "---"
    # echo "Updating bundle for service ${artifactId}"

    # For each widget under the structure ui/widgets/<entity>/<widget> generate an FTL file that imports the css and js that goes with that widget.
    # The FTL file from the widget itself is preserved and the imports are added at the top of the widget
    echo "---"
    echo "Updating micro-frontend templates to include static resources"
    echo ""
    find bundle/ui/widgets -maxdepth 2 -mindepth 2 -type d -not -path "*utils*" -exec bash -c 'updateFTLTemplate "$@"' bash {} "$BUNDLE_NAME" \;
    
    echo ""
else
    echo "No micro-frontend has been found in the $WIDGET_FOLDER, skipping this step"
fi