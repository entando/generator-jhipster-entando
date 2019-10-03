const tableFiles = {
    path: 'ui/widgets',
    templates: [
        {
            file: '/tableWidget/src/types/entityType.js',
            renameTo: generator => `/${generator.entityInstance}/tableWidget/src/types/${generator.entityInstance}Type.js`,
            useBluePrint: true,
        },
        {
            file: '/tableWidget/package.json',
            renameTo: generator => `/${generator.entityInstance}/tableWidget/package.json`,
            method: 'copy',
        },
        {
            file: '/common/jsconfig.json',
            renameTo: generator => `/${generator.entityInstance}/tableWidget/jsconfig.json`,
            method: 'copy',
        },
        {
            file: '/tableWidget/src/index.js',
            renameTo: generator => `/${generator.entityInstance}/tableWidget/src/index.js`,
            useBluePrint: true,
        },
        {
            file: '/tableWidget/src/index.css',
            renameTo: generator => `/${generator.entityInstance}/tableWidget/src/index.css`,
            method: 'copy',
        },
        // mocks
        {
            file: '/tableWidget/src/mocks/entityMocks.js',
            renameTo: generator => `/${generator.entityInstance}/tableWidget/src/mocks/${generator.entityInstance}Mocks.js`,
            useBluePrint: true,
        },
        {
            file: '/tableWidget/src/mocks/entityi18nMock.js',
            renameTo: generator => `/${generator.entityInstance}/tableWidget/src/mocks/${generator.entityInstance}i18nMock.js`,
            useBluePrint: true,
        },

        // i18n

        {
            file: '/tableWidget/src/i18n/locales.js',
            renameTo: generator => `/${generator.entityInstance}/tableWidget/src/i18n/locales.js`,
            method: 'copy',
        },
        {
            file: '/tableWidget/src/i18n/index.js',
            renameTo: generator => `/${generator.entityInstance}/tableWidget/src/i18n/index.js`,
            method: 'copy',
        },
        {
            file: '/tableWidget/src/i18n/i18nextOptions.js',
            renameTo: generator => `/${generator.entityInstance}/tableWidget/src/i18n/i18nextOptions.js`,
            method: 'copy',
        },
        {
            file: '/tableWidget/src/i18n/locales/it.json',
            renameTo: generator => `/${generator.entityInstance}/tableWidget/src/i18n/locales/it.json`,
            useBluePrint: true,
        },
        {
            file: '/tableWidget/src/i18n/locales/en.json',
            renameTo: generator => `/${generator.entityInstance}/tableWidget/src/i18n/locales/en.json`,
            useBluePrint: true,
        },

        // custom elements
        {
            file: '/tableWidget/src/custom-elements/entityTableElement.js',
            renameTo: generator => `/${generator.entityInstance}/tableWidget/src/custom-elements/${generator.entityClass}TableElement.js`,
            useBluePrint: true,
        },

        // components
        {
            file: '/tableWidget/src/components/entityTableContainer.js',
            renameTo: generator => `/${generator.entityInstance}/tableWidget/src/components/${generator.entityClass}TableContainer.js`,
            useBluePrint: true,
        },
        {
            file: '/tableWidget/src/components/entityTable.js',
            renameTo: generator => `/${generator.entityInstance}/tableWidget/src/components/${generator.entityClass}Table.js`,
            useBluePrint: true,
        },
        {
            file: '/tableWidget/src/components/common/ErrorNotification.js',
            renameTo: generator => `/${generator.entityInstance}/tableWidget/src/components/common/ErrorNotification.js`,
            useBluePrint: true,
        },

        // TODO Fix test assertion generation
        // //components/Tests
        // {
        //     file: '/tableWidget/src/components/__tests__/entityTableContainer.test.js',
        //     renameTo: generator => `/tableWidget/src/components/__tests__//${generator.entityClass}TableContainer.test.js`,
        //     useBluePrint: true,
        // },
        // {
        //     file: '/tableWidget/src/components/__tests__/entityTable.test.js',
        //     renameTo: generator => `/tableWidget/src/components/__tests__//${generator.entityClass}Table.test.js`,
        //     useBluePrint: true,
        // },

        // api
        {
            file: '/tableWidget/src/api/entityApi.js',
            renameTo: generator => `/${generator.entityInstance}/tableWidget/src/api/${generator.entityInstancePlural}.js`,
            useBluePrint: true,
        },
        {
            file: '/tableWidget/src/api/constants.js',
            renameTo: generator => `/${generator.entityInstance}/tableWidget/src/api/constants.js`,
            method: 'copy',
        },

        // public
        {
            file: '/tableWidget/public/favicon.ico',
            renameTo: generator => `/${generator.entityInstance}/tableWidget/public/favicon.ico`,
            method: 'copy',
        },
        {
            file: '/tableWidget/public/index.html',
            renameTo: generator => `/${generator.entityInstance}/tableWidget/public/index.html`,
            useBluePrint: true,
        },
        {
            file: '/tableWidget/public/robots.txt',
            renameTo: generator => `/${generator.entityInstance}/tableWidget/public/robots.txt`,
            method: 'copy',
        },
    ],
};

module.exports = tableFiles;
