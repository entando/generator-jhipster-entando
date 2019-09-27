/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const constants = require('generator-jhipster/generators/generator-constants');

const { SERVER_MAIN_SRC_DIR, SERVER_MAIN_RES_DIR } = constants;

const widgetFiles = {
    widgets: [
        {
            path: SERVER_MAIN_RES_DIR,
            templates: [
                {
                    useBluePrint: true,
                    file: 'widgets/hello_world.html',
                    renameTo: generator => `wigets/${generator.entityFileName}/${generator.entityFileName}-hello_world.html/`
                }
            ]
        }
    ]
};

const serverFiles = {
    server: [
        {
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                {
                    file: 'package/web/rest/schema/EntitySchemaResource.java',
                    renameTo: generator => `${generator.packageFolder}/web/rest/schema/${generator.entityClass}SchemaResource.java`,
                    useBluePrint: true
                }
            ]
        }
    ]
};

module.exports = {
    serverFiles,
    widgetFiles
};
