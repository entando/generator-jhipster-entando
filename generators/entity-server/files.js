/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const _ = require('lodash');
const constants = require('generator-jhipster/generators/generator-constants');

const SERVER_MAIN_SRC_DIR = constants.SERVER_MAIN_SRC_DIR;
const UI_SRC_DIR = constants.SERVER_MAIN_SRC_DIR;

const serverFiles = {
    server: [
        {
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                {
                    file: 'package/web/rest/schema/EntitySchemaResource.java',
                    renameTo: generator => `${generator.packageFolder}/web/rest/schema/${generator.entityClass}SchemaResource.java`,
                    useBluePrint: true
                },
                {
                    file: 'package/config/SecurityConfiguration.java',
                    renameTo: generator => `${generator.packageFolder}/config/SecurityConfiguration.java`,
                    useBluePrint: true
                }
            ]
        }
    ]
};


const microFrontEndFiles = {
    server: [
        {
            path: 'ui/widgets',
            templates: [
                {
                    file: '/tableWidget/src/types/entityType.js',
                    renameTo: generator => `/tableWidget/src/types/${generator.entityClass.charAt(0).toLowerCase() + generator.entityClass.slice(1)}Type.js`,
                    useBluePrint: true
                },
                {
                    file: '/tableWidget/package.json',
                    method: 'copy'
                },
                {
                    file: '/common/jsconfig.json',
                    renameTo: generator => `/tableWidget/jsconfig.json`,
                    method: 'copy'
                },
                {
                    file: '/tableWidget/src/index.js',
                    renameTo: generator => `/tableWidget/src/index.js`,
                    useBluePrint: true
                },
                {
                    file: '/tableWidget/src/index.css',
                    method: 'copy'
                },
                //Mocks
                {
                    file: '/tableWidget/src/mocks/entityMocks.js',
                    renameTo: generator => `/tableWidget/src/mocks/${generator.entityClass.charAt(0).toLowerCase() + generator.entityClass.slice(1)}Mocks.js`,
                    useBluePrint: true
                },
                {
                    file: '/tableWidget/src/mocks/entityi18nMock.js',
                    renameTo: generator => `/tableWidget/src/mocks/${generator.entityClass.charAt(0).toLowerCase() + generator.entityClass.slice(1)}i18nMock.js`,
                    useBluePrint: true
                },

                //i18n

                {
                    file: '/tableWidget/src/i18n/locales.js',
                    renameTo: generator => `/tableWidget/src/i18n/locales.js`,
                    method: 'copy'
                },
                {
                    file: '/tableWidget/src/i18n/index.js',
                    renameTo: generator => `/tableWidget/src/i18n/index.js`,
                    method: 'copy'
                },
                {
                    file: '/tableWidget/src/i18n/i18nextOptions.js',
                    renameTo: generator => `/tableWidget/src/i18n/i18nextOptions.js`,
                    method: 'copy'
                },
                {
                    file: '/tableWidget/src/i18n/locales/it.json',
                    renameTo: generator => `/tableWidget/src/i18n/locales/it.json`,
                    useBluePrint: true
                },
                {
                    file: '/tableWidget/src/i18n/locales/en.json',
                    renameTo: generator => `/tableWidget/src/i18n/locales/en.json`,
                    useBluePrint: true
                },

                //custom elements
                {
                    file: '/tableWidget/src/custom-elements/entityTableElement.js',
                    renameTo: generator => `/tableWidget/src/custom-elements/${generator.entityClass}TableElement.js`,
                    useBluePrint: true
                },

                //components
                {
                    file: '/tableWidget/src/components/entityTableContainer.js',
                    renameTo: generator => `/tableWidget/src/components/${generator.entityClass}TableContainer.js`,
                    useBluePrint: true
                },
                {
                    file: '/tableWidget/src/components/entityTable.js',
                    renameTo: generator => `/tableWidget/src/components/${generator.entityClass}Table.js`,
                    useBluePrint: true
                },
                {
                    file: '/tableWidget/src/components/common/ErrorNotification.js',
                    renameTo: generator => `/tableWidget/src/components/common/ErrorNotification.js`,
                    useBluePrint: true
                },

                //TODO Fix test assertion generation
                // //components/Tests
                // {
                //     file: '/tableWidget/src/components/__tests__/entityTableContainer.test.js',
                //     renameTo: generator => `/tableWidget/src/components/__tests__//${generator.entityClass}TableContainer.test.js`,
                //     useBluePrint: true
                // },
                // {
                //     file: '/tableWidget/src/components/__tests__/entityTable.test.js',
                //     renameTo: generator => `/tableWidget/src/components/__tests__//${generator.entityClass}Table.test.js`,
                //     useBluePrint: true
                // },

                //api
                {
                    file: '/tableWidget/src/api/entityApi.js',
                    renameTo: generator => `/tableWidget/src/api/${generator.entityClass.charAt(0).toLowerCase() + generator.entityClass.slice(1)}s.js`,
                    useBluePrint: true
                },
                {
                    file: '/tableWidget/src/api/constants.js',
                    method: 'copy'
                },

                //public
                {
                    file: '/tableWidget/public/favicon.ico',
                    method: 'copy'
                },
                {
                    file: '/tableWidget/public/index.html',
                    useBluePrint: true
                },
                {
                    file: '/tableWidget/public/robots.txt',
                    method: 'copy'
                },

            ]

        }
    ]
};

module.exports = {
    serverFiles,
    microFrontEndFiles
};
