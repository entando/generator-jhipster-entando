#!/bin/bash

INJECTION_POINT="<#-- entando_resource_injection_point -->"

function injectResource() {
    local resource="$1"
    local destFile="$2"

    echo "Injecting resource $resource in $destFile"
    sed -i 's,'"$INJECTION_POINT"','"$resource"'\n'"$INJECTION_POINT"',g' "$destFile"
}

# This command assumes that the widgets are all under ui/widgets/<entity>/<widget>. The command finds all of the micro-frontends in those folders and
# copies the result of the build into the bundle resources folder so that the bundle can be deployed to a digital exchange instance (or imported on an existing page).
# The command also copies css optionally with this structure since some widgets will be js only 2>/dev/null || :

find ui/widgets -maxdepth 2 -mindepth 2 -type d -not -path "*utils*" -exec bash -c "mkdir -p bundle/'{}'/resources/static/{js,css} && cp '{}'/build/static/js/*.js bundle/'{}'/resources/static/js && cp '{}'/build/static/css/*.css bundle/'{}'/resources/static/css 2>/dev/null || : && mkdir -p bundle/{} && cp '{}'/bundle/* bundle/{}/" \;

#Fetch the top level service name from the pom and use this as the context directory for the publishing of assets specific to the project when building the bundle
artifactId=$(cat pom.xml | grep "^    <artifactId>.*</artifactId>$" | awk -F'[><]' '{print $3}')

echo "Generating bundle for service ${artifactId}"

mkdir -p bundle/resources/static/{js,css}

# For each widget under the structure ui/widgets/<entity>/<widget> generate an FTL file that imports the css and js that goes with that widget.
# The FTL file from the widget itself is preserved and the imports are added at the top of the widget
for dir in `find bundle/ui/widgets -maxdepth 2 -mindepth 2 -type d -not -path "*utils*" -exec bash -c "cd {} && pwd" \;`;
do
    widgetName=$(basename $dir)
    echo "Generating bundle ${widgetName} for $dir"
    for ftlName in "$dir"/*.ftl;
    do
        [ -e "$ftlName" ] || continue
        #For every JS file add a script reference in the widget FTL
        for jspath in "$dir"/resources/static/js/*;
        do
            # This moves the referenced file to the top level bundle/resources/static dir for correct processing when loaded
            [ -e "$jspath" ] || continue
            jsfile=$(basename "$jspath")

            cp "$dir/resources/static/js/$jsfile" bundle/resources/static/js/
            resource="<script src=\"<@wp.resourceURL />${artifactId}/static/js/${jsfile}\"></script>"
            injectResource "$resource" "$ftlName"
        done

        # For every CSS file add a script reference in the widget FTL
        for csspath in "$dir"/resources/static/css/*;
        do
          # This moves the referenced file to the top level bundle/resources/static dir for correct processing when loaded
          [ -e "$csspath" ] || continue
          cssfile=$(basename "$csspath")
          cp "$dir/resources/static/css/$cssfile" bundle/resources/static/css/
          resource="<link href=\"<@wp.resourceURL />${artifactId}/static/css/${cssfile}\" rel=\"stylesheet\">"
          injectResource "$resource" "$ftlName"
        done
    done

    #Cleanup the resources that were copied into the widget folders specifically. They are now copied into the main bundle folder
    rm -rf "$dir/resources"
done
