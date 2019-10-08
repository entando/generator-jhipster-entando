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
        widgetFiles,
        // {
        //     path: 'ui/widgets',
        //     templates: [
        //         {
        //             file: '/common/jsconfig.json',
        //             renameTo: generator => `/${generator.entityInstance}/detailsWidget/jsconfig.json`,
        //             method: 'copy',
        //         },
        //         {
        //             file: '/common/jsconfig.json',
        //             renameTo: generator => `/${generator.entityInstance}/tableWidget/jsconfig.json`,
        //             method: 'copy',
        //         },
        //     ],
        // },
    ],
};

module.exports = {
    serverFiles,
    microFrontEndFiles,
};
