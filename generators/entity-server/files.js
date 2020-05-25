const _ = require('lodash');
const constants = require('generator-jhipster/generators/generator-constants');

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

module.exports = {
    serverFiles,
};
