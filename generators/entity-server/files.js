/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const _ = require('lodash');
const constants = require('generator-jhipster/generators/generator-constants');

const detailsWidgetFiles = require('./files/widgets/details/files');
const tableWidgetFiles = require('./files/widgets/table/files');

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
                {
                    file: 'package/config/SecurityConfiguration.java',
                    renameTo: generator => `${generator.packageFolder}/config/SecurityConfiguration.java`,
                    useBluePrint: true,
                },
            ],
        },
    ],
};

const microFrontEndFiles = {
    server: [
        // eslint-disable prettier/prettier
        detailsWidgetFiles.dynamic,
        detailsWidgetFiles.copy,
        // tableWidgetFiles,
    ],
};

module.exports = {
    serverFiles,
    microFrontEndFiles,
};
