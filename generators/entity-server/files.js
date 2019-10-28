const _ = require('lodash'); // eslint-disable-line no-unused-vars
const constants = require('generator-jhipster/generators/generator-constants');

const widgetFiles = require('./mfe-files.js');

const SERVER_MAIN_SRC_DIR = constants.SERVER_MAIN_SRC_DIR;

const serverFiles = {
    server: [
        {
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                {
                    file: 'package/web/rest/schema/EntitySchemaResource.java',
                    renameTo: generator => `${generator.packageFolder}/web/rest/schema/${generator.entityClass}SchemaResource.java`,
                    useBluePrint: true,
                },
            ],
        },
    ],
};

const microFrontEndFiles = {
    server: [
        widgetFiles,
        // ADD CUSTOM MAPPINGS UNDER THIS COMMENT
    ],
};

module.exports = {
    serverFiles,
    microFrontEndFiles,
};
