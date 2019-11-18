const files = {
    path: 'ui/widgets',
    templates: [
        {
            file: '/detailsWidget/.env',
            renameTo: generator => `/${generator.entityInstance}/detailsWidget/.env`,
            method: 'copy',
        },
        {
            file: '/detailsWidget/README.md',
            renameTo: generator => `/${generator.entityInstance}/detailsWidget/README.md`,
            useBluePrint: true,
        },
        {
            file: '/detailsWidget/bundle/details-widget-descriptor.yaml',
            renameTo: generator => `/${generator.entityInstance}/detailsWidget/bundle/details-widget-descriptor.yaml`,
            method: 'copy',
        },
        {
            file: '/detailsWidget/bundle/details-widget.ftl',
            renameTo: generator => `/${generator.entityInstance}/detailsWidget/bundle/details-widget.ftl`,
            method: 'copy',
        },
        {
            file: '/detailsWidget/jsconfig.json',
            renameTo: generator => `/${generator.entityInstance}/detailsWidget/jsconfig.json`,
            method: 'copy',
        },
        {
            file: '/detailsWidget/package.json',
            renameTo: generator => `/${generator.entityInstance}/detailsWidget/package.json`,
            useBluePrint: true,
        },
        {
            file: '/detailsWidget/public/favicon.ico',
            renameTo: generator => `/${generator.entityInstance}/detailsWidget/public/favicon.ico`,
            method: 'copy',
        },
        {
            file: '/detailsWidget/public/index.html',
            renameTo: generator => `/${generator.entityInstance}/detailsWidget/public/index.html`,
            useBluePrint: true,
        },
        {
            file: '/detailsWidget/public/robots.txt',
            renameTo: generator => `/${generator.entityInstance}/detailsWidget/public/robots.txt`,
            method: 'copy',
        },
        {
            file: '/detailsWidget/src/api/constants.js',
            renameTo: generator => `/${generator.entityInstance}/detailsWidget/src/api/constants.js`,
            method: 'copy',
        },
        {
            file: '/detailsWidget/src/api/entity.js',
            renameTo: generator => `/${generator.entityInstance}/detailsWidget/src/api/${generator.entityInstance}.js`, // eslint-disable-line prettier/prettier
            useBluePrint: true,
        },
        {
            file: '/detailsWidget/src/components/EntityDetails.js',
            renameTo: generator => `/${generator.entityInstance}/detailsWidget/src/components/${generator.entityClass}Details.js`, // eslint-disable-line prettier/prettier
            useBluePrint: true,
        },
        {
            file: '/detailsWidget/src/components/EntityDetailsContainer.js',
            renameTo: generator => `/${generator.entityInstance}/detailsWidget/src/components/${generator.entityClass}DetailsContainer.js`, // eslint-disable-line prettier/prettier
            useBluePrint: true,
        },
        {
            file: '/detailsWidget/src/components/__mocks__/entityMocks.js',
            renameTo: generator => `/${generator.entityInstance}/detailsWidget/src/components/__mocks__/${generator.entityInstance}Mocks.js`, // eslint-disable-line prettier/prettier
            useBluePrint: true,
        },
        {
            file: '/detailsWidget/src/components/__mocks__/i18n.js',
            renameTo: generator => `/${generator.entityInstance}/detailsWidget/src/components/__mocks__/i18n.js`,
            method: 'copy',
        },
        {
            file: '/detailsWidget/src/components/__tests__/EntityDetails.test.js',
            renameTo: generator => `/${generator.entityInstance}/detailsWidget/src/components/__tests__/${generator.entityClass}Details.test.js`, // eslint-disable-line prettier/prettier
            useBluePrint: true,
        },
        {
            file: '/detailsWidget/src/components/__tests__/EntityDetailsContainer.test.js',
            renameTo: generator => `/${generator.entityInstance}/detailsWidget/src/components/__tests__/${generator.entityClass}DetailsContainer.test.js`, // eslint-disable-line prettier/prettier
            useBluePrint: true,
        },
        {
            file: '/detailsWidget/src/components/__types__/entity.js',
            renameTo: generator => `/${generator.entityInstance}/detailsWidget/src/components/__types__/${generator.entityInstance}.js`, // eslint-disable-line prettier/prettier
            useBluePrint: true,
        },
        {
            file: '/detailsWidget/src/components/common/Notification.js',
            renameTo: generator => `/${generator.entityInstance}/detailsWidget/src/components/common/Notification.js`,
            method: 'copy',
        },
        {
            file: '/detailsWidget/src/components/entity-field-table/EntityFieldTable.js',
            renameTo: generator => `/${generator.entityInstance}/detailsWidget/src/components/${generator.entityFileName}-field-table/${generator.entityClass}FieldTable.js`, // eslint-disable-line prettier/prettier
            useBluePrint: true,
        },
        {
            file: '/detailsWidget/src/custom-elements/EntityDetailsElement.js',
            renameTo: generator => `/${generator.entityInstance}/detailsWidget/src/custom-elements/${generator.entityClass}DetailsElement.js`, // eslint-disable-line prettier/prettier
            useBluePrint: true,
        },
        {
            file: '/detailsWidget/src/i18n/i18n.js',
            renameTo: generator => `/${generator.entityInstance}/detailsWidget/src/i18n/i18n.js`,
            method: 'copy',
        },
        {
            file: '/detailsWidget/src/i18n/locales/en.json',
            renameTo: generator => `/${generator.entityInstance}/detailsWidget/src/i18n/locales/en.json`,
            useBluePrint: true,
        },
        {
            file: '/detailsWidget/src/i18n/locales/index.js',
            renameTo: generator => `/${generator.entityInstance}/detailsWidget/src/i18n/locales/index.js`,
            method: 'copy',
        },
        {
            file: '/detailsWidget/src/index.css',
            renameTo: generator => `/${generator.entityInstance}/detailsWidget/src/index.css`,
            method: 'copy',
        },
        {
            file: '/detailsWidget/src/index.js',
            renameTo: generator => `/${generator.entityInstance}/detailsWidget/src/index.js`,
            useBluePrint: true,
        },
        {
            file: '/formWidget/.env',
            renameTo: generator => `/${generator.entityInstance}/formWidget/.env`,
            method: 'copy',
        },
        {
            file: '/formWidget/README.md',
            renameTo: generator => `/${generator.entityInstance}/formWidget/README.md`,
            useBluePrint: true,
        },
        {
            file: '/formWidget/bundle/form-widget-descriptor.yaml',
            renameTo: generator => `/${generator.entityInstance}/formWidget/bundle/form-widget-descriptor.yaml`,
            method: 'copy',
        },
        {
            file: '/formWidget/bundle/form-widget.ftl',
            renameTo: generator => `/${generator.entityInstance}/formWidget/bundle/form-widget.ftl`,
            method: 'copy',
        },
        {
            file: '/formWidget/deploy-widget.sh',
            renameTo: generator => `/${generator.entityInstance}/formWidget/deploy-widget.sh`,
            useBluePrint: true,
        },
        {
            file: '/formWidget/jsconfig.json',
            renameTo: generator => `/${generator.entityInstance}/formWidget/jsconfig.json`,
            method: 'copy',
        },
        {
            file: '/formWidget/package-lock.json',
            renameTo: generator => `/${generator.entityInstance}/formWidget/package-lock.json`,
            useBluePrint: true,
        },
        {
            file: '/formWidget/package.json',
            renameTo: generator => `/${generator.entityInstance}/formWidget/package.json`,
            useBluePrint: true,
        },
        {
            file: '/formWidget/public/favicon.ico',
            renameTo: generator => `/${generator.entityInstance}/formWidget/public/favicon.ico`,
            method: 'copy',
        },
        {
            file: '/formWidget/public/index.html',
            renameTo: generator => `/${generator.entityInstance}/formWidget/public/index.html`,
            useBluePrint: true,
        },
        {
            file: '/formWidget/public/robots.txt',
            renameTo: generator => `/${generator.entityInstance}/formWidget/public/robots.txt`,
            method: 'copy',
        },
        {
            file: '/formWidget/scripts/i18next-scanner.config.js',
            renameTo: generator => `/${generator.entityInstance}/formWidget/scripts/i18next-scanner.config.js`,
            method: 'copy',
        },
        {
            file: '/formWidget/src/api/constants.js',
            renameTo: generator => `/${generator.entityInstance}/formWidget/src/api/constants.js`,
            method: 'copy',
        },
        {
            file: '/formWidget/src/api/entities.js',
            renameTo: generator => `/${generator.entityInstance}/formWidget/src/api/${generator.entityInstancePlural}.js`, // eslint-disable-line prettier/prettier
            useBluePrint: true,
        },
        {
            file: '/formWidget/src/auth/KeycloakContext.js',
            renameTo: generator => `/${generator.entityInstance}/formWidget/src/auth/KeycloakContext.js`,
            method: 'copy',
        },
        {
            file: '/formWidget/src/auth/KeycloakViews.js',
            renameTo: generator => `/${generator.entityInstance}/formWidget/src/auth/KeycloakViews.js`,
            method: 'copy',
        },
        {
            file: '/formWidget/src/components/EntityAddFormContainer.js',
            renameTo: generator => `/${generator.entityInstance}/formWidget/src/components/${generator.entityClass}AddFormContainer.js`, // eslint-disable-line prettier/prettier
            useBluePrint: true,
        },
        {
            file: '/formWidget/src/components/EntityEditFormContainer.js',
            renameTo: generator => `/${generator.entityInstance}/formWidget/src/components/${generator.entityClass}EditFormContainer.js`, // eslint-disable-line prettier/prettier
            useBluePrint: true,
        },
        {
            file: '/formWidget/src/components/EntityForm.js',
            renameTo: generator => `/${generator.entityInstance}/formWidget/src/components/${generator.entityClass}Form.js`, // eslint-disable-line prettier/prettier
            useBluePrint: true,
        },
        {
            file: '/formWidget/src/components/__mocks__/entityMocks.js',
            renameTo: generator => `/${generator.entityInstance}/formWidget/src/components/__mocks__/${generator.entityInstance}Mocks.js`, // eslint-disable-line prettier/prettier
            useBluePrint: true,
        },
        /*
        {
            file: '/formWidget/src/components/__tests__/EntityAddFormContainer.test.js',
            renameTo: generator => `/${generator.entityInstance}/formWidget/src/components/__tests__/${generator.entityClass}AddFormContainer.test.js`, // eslint-disable-line prettier/prettier
        },
        */
        {
            file: '/formWidget/src/components/__tests__/EntityEditFormContainer.test.js',
            renameTo: generator => `/${generator.entityInstance}/formWidget/src/components/__tests__/${generator.entityClass}EditFormContainer.test.js`, // eslint-disable-line prettier/prettier
            useBluePrint: true,
        },
        {
            file: '/formWidget/src/components/__tests__/EntityForm.test.js',
            renameTo: generator => `/${generator.entityInstance}/formWidget/src/components/__tests__/${generator.entityClass}Form.test.js`, // eslint-disable-line prettier/prettier
            useBluePrint: true,
        },
        {
            file: '/formWidget/src/components/__types__/entity.js',
            renameTo: generator => `/${generator.entityInstance}/formWidget/src/components/__types__/${generator.entityInstance}.js`, // eslint-disable-line prettier/prettier
            useBluePrint: true,
        },
        {
            file: '/formWidget/src/components/__types__/keycloak.js',
            renameTo: generator => `/${generator.entityInstance}/formWidget/src/components/__types__/keycloak.js`,
            method: 'copy',
        },
        {
            file: '/formWidget/src/components/common/Notification.js',
            renameTo: generator => `/${generator.entityInstance}/formWidget/src/components/common/Notification.js`,
            method: 'copy',
        },
        {
            file: '/formWidget/src/custom-elements/EntityFormElement.js',
            renameTo: generator => `/${generator.entityInstance}/formWidget/src/custom-elements/${generator.entityClass}FormElement.js`, // eslint-disable-line prettier/prettier
            useBluePrint: true,
        },
        {
            file: '/formWidget/src/custom-elements/widgetEventTypes.js',
            renameTo: generator => `/${generator.entityInstance}/formWidget/src/custom-elements/widgetEventTypes.js`,
            useBluePrint: true,
        },
        {
            file: '/formWidget/src/helpers/widgetEvents.js',
            renameTo: generator => `/${generator.entityInstance}/formWidget/src/helpers/widgetEvents.js`,
            method: 'copy',
        },
        {
            file: '/formWidget/src/i18n/__mocks__/i18nMock.js',
            renameTo: generator => `/${generator.entityInstance}/formWidget/src/i18n/__mocks__/i18nMock.js`,
            method: 'copy',
        },
        {
            file: '/formWidget/src/i18n/constants.js',
            renameTo: generator => `/${generator.entityInstance}/formWidget/src/i18n/constants.js`,
            method: 'copy',
        },
        {
            file: '/formWidget/src/i18n/dateFnsLocales.js',
            renameTo: generator => `/${generator.entityInstance}/formWidget/src/i18n/dateFnsLocales.js`,
            method: 'copy',
        },
        {
            file: '/formWidget/src/i18n/i18next.js',
            renameTo: generator => `/${generator.entityInstance}/formWidget/src/i18n/i18next.js`,
            method: 'copy',
        },
        {
            file: '/formWidget/src/i18n/locales/en.json',
            renameTo: generator => `/${generator.entityInstance}/formWidget/src/i18n/locales/en.json`,
            useBluePrint: true,
        },
        {
            file: '/formWidget/src/i18n/locales/index.js',
            renameTo: generator => `/${generator.entityInstance}/formWidget/src/i18n/locales/index.js`,
            method: 'copy',
        },
        {
            file: '/formWidget/src/i18n/setLocale.js',
            renameTo: generator => `/${generator.entityInstance}/formWidget/src/i18n/setLocale.js`,
            method: 'copy',
        },
        {
            file: '/formWidget/src/i18n/yup.js',
            renameTo: generator => `/${generator.entityInstance}/formWidget/src/i18n/yup.js`,
            useBluePrint: true,
        },
        {
            file: '/formWidget/src/index.js',
            renameTo: generator => `/${generator.entityInstance}/formWidget/src/index.js`,
            useBluePrint: true,
        },
        {
            file: '/tableWidget/.gitignore',
            renameTo: generator => `/${generator.entityInstance}/tableWidget/.gitignore`,
            method: 'copy',
        },
        {
            file: '/tableWidget/README.md',
            renameTo: generator => `/${generator.entityInstance}/tableWidget/README.md`,
            useBluePrint: true,
        },
        {
            file: '/tableWidget/bundle/table-widget-descriptor.yaml',
            renameTo: generator => `/${generator.entityInstance}/tableWidget/bundle/table-widget-descriptor.yaml`,
            useBluePrint: true,
        },
        {
            file: '/tableWidget/bundle/table-widget.ftl',
            renameTo: generator => `/${generator.entityInstance}/tableWidget/bundle/table-widget.ftl`,
            useBluePrint: true,
        },
        {
            file: '/tableWidget/deploy-widget.sh',
            renameTo: generator => `/${generator.entityInstance}/tableWidget/deploy-widget.sh`,
            useBluePrint: true,
        },
        {
            file: '/tableWidget/jsconfig.json',
            renameTo: generator => `/${generator.entityInstance}/tableWidget/jsconfig.json`,
            method: 'copy',
        },
        {
            file: '/tableWidget/package.json',
            renameTo: generator => `/${generator.entityInstance}/tableWidget/package.json`,
            useBluePrint: true,
        },
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
        {
            file: '/tableWidget/scripts/i18next-scanner.config.js',
            renameTo: generator => `/${generator.entityInstance}/tableWidget/scripts/i18next-scanner.config.js`,
            method: 'copy',
        },
        {
            file: '/tableWidget/src/api/constants.js',
            renameTo: generator => `/${generator.entityInstance}/tableWidget/src/api/constants.js`,
            method: 'copy',
        },
        {
            file: '/tableWidget/src/api/entities.js',
            renameTo: generator => `/${generator.entityInstance}/tableWidget/src/api/${generator.entityInstancePlural}.js`, // eslint-disable-line prettier/prettier
            useBluePrint: true,
        },
        {
            file: '/tableWidget/src/auth/KeycloakContext.js',
            renameTo: generator => `/${generator.entityInstance}/tableWidget/src/auth/KeycloakContext.js`,
            method: 'copy',
        },
        {
            file: '/tableWidget/src/auth/KeycloakViews.js',
            renameTo: generator => `/${generator.entityInstance}/tableWidget/src/auth/KeycloakViews.js`,
            method: 'copy',
        },
        {
            file: '/tableWidget/src/components/__mocks__/entityMocks.js',
            renameTo: generator => `/${generator.entityInstance}/tableWidget/src/components/__mocks__/${generator.entityInstance}Mocks.js`, // eslint-disable-line prettier/prettier
            useBluePrint: true,
        },
        {
            file: '/tableWidget/src/components/__tests__/entityTable.test.js',
            renameTo: generator => `/${generator.entityInstance}/tableWidget/src/components/__tests__/${generator.entityClass}Table.test.js`, // eslint-disable-line prettier/prettier
            useBluePrint: true,
        },
        {
            file: '/tableWidget/src/components/__tests__/entityTableContainer.test.js',
            renameTo: generator => `/${generator.entityInstance}/tableWidget/src/components/__tests__/${generator.entityClass}TableContainer.test.js`, // eslint-disable-line prettier/prettier
            useBluePrint: true,
        },
        {
            file: '/tableWidget/src/components/__types__/entity.js',
            renameTo: generator => `/${generator.entityInstance}/tableWidget/src/components/__types__/${generator.entityInstance}.js`, // eslint-disable-line prettier/prettier
            useBluePrint: true,
        },
        {
            file: '/tableWidget/src/components/__types__/filter.js',
            renameTo: generator => `/${generator.entityInstance}/tableWidget/src/components/__types__/filter.js`,
            method: 'copy',
        },
        {
            file: '/tableWidget/src/components/__types__/keycloak.js',
            renameTo: generator => `/${generator.entityInstance}/tableWidget/src/components/__types__/keycloak.js`,
            method: 'copy',
        },
        {
            file: '/tableWidget/src/components/common/Notification.js',
            renameTo: generator => `/${generator.entityInstance}/tableWidget/src/components/common/Notification.js`,
            method: 'copy',
        },
        {
            file: '/tableWidget/src/components/entityTable.js',
            renameTo: generator => `/${generator.entityInstance}/tableWidget/src/components/${generator.entityClass}Table.js`, // eslint-disable-line prettier/prettier
            useBluePrint: true,
        },
        {
            file: '/tableWidget/src/components/entityTableContainer.js',
            renameTo: generator => `/${generator.entityInstance}/tableWidget/src/components/${generator.entityClass}TableContainer.js`, // eslint-disable-line prettier/prettier
            useBluePrint: true,
        },
        {
            file: '/tableWidget/src/components/filters/Filter.js',
            renameTo: generator => `/${generator.entityInstance}/tableWidget/src/components/filters/Filter.js`, // eslint-disable-line prettier/prettier
            useBluePrint: true,
        },
        {
            file: '/tableWidget/src/components/filters/FiltersContainer.js',
            renameTo: generator => `/${generator.entityInstance}/tableWidget/src/components/filters/FiltersContainer.js`,
            method: 'copy',
        },
        {
            file: '/tableWidget/src/components/filters/utils.js',
            renameTo: generator => `/${generator.entityInstance}/tableWidget/src/components/filters/utils.js`,
            useBluePrint: true,
        },
        {
            file: '/tableWidget/src/custom-elements/entityTableElement.js',
            renameTo: generator => `/${generator.entityInstance}/tableWidget/src/custom-elements/${generator.entityClass}TableElement.js`, // eslint-disable-line prettier/prettier
            useBluePrint: true,
        },
        {
            file: '/tableWidget/src/custom-elements/widgetEventTypes.js',
            renameTo: generator => `/${generator.entityInstance}/tableWidget/src/custom-elements/widgetEventTypes.js`, // eslint-disable-line prettier/prettier
            useBluePrint: true,
        },
        {
            file: '/tableWidget/src/helpers/widgetEvents.js',
            renameTo: generator => `/${generator.entityInstance}/tableWidget/src/helpers/widgetEvents.js`,
            method: 'copy',
        },
        {
            file: '/tableWidget/src/i18n/__mocks__/i18nMock.js',
            renameTo: generator => `/${generator.entityInstance}/tableWidget/src/i18n/__mocks__/i18nMock.js`,
            method: 'copy',
        },
        {
            file: '/tableWidget/src/i18n/constants.js',
            renameTo: generator => `/${generator.entityInstance}/tableWidget/src/i18n/constants.js`,
            method: 'copy',
        },
        {
            file: '/tableWidget/src/i18n/i18next.js',
            renameTo: generator => `/${generator.entityInstance}/tableWidget/src/i18n/i18next.js`,
            method: 'copy',
        },
        {
            file: '/tableWidget/src/i18n/locales/en.json',
            renameTo: generator => `/${generator.entityInstance}/tableWidget/src/i18n/locales/en.json`,
            useBluePrint: true,
        },
        {
            file: '/tableWidget/src/i18n/locales/index.js',
            renameTo: generator => `/${generator.entityInstance}/tableWidget/src/i18n/locales/index.js`,
            method: 'copy',
        },
        {
            file: '/tableWidget/src/i18n/setLocale.js',
            renameTo: generator => `/${generator.entityInstance}/tableWidget/src/i18n/setLocale.js`,
            method: 'copy',
        },
        {
            file: '/tableWidget/src/index.js',
            renameTo: generator => `/${generator.entityInstance}/tableWidget/src/index.js`,
            useBluePrint: true,
        },
        {
            file: '/tableWidget/src/state/entity.reducer.js',
            renameTo: generator => `/${generator.entityInstance}/tableWidget/src/state/${generator.entityInstance}.reducer.js`, // eslint-disable-line prettier/prettier
            useBluePrint: true,
        },
        {
            file: '/tableWidget/src/state/entity.types.js',
            renameTo: generator => `/${generator.entityInstance}/tableWidget/src/state/${generator.entityInstance}.types.js`, // eslint-disable-line prettier/prettier
        },
        /*
        {
            file: '/utils/import-mui',
            renameTo: generator => `/${generator.entityInstance}/utils/import-mui`,
        },
        */
        /*
        {
            file: '/utils/jhipster',
            renameTo: generator => `/${generator.entityInstance}/utils/jhipster`,
        },
        */
        /*
        {
            file: '/utils/mui',
            renameTo: generator => `/${generator.entityInstance}/utils/mui`,
        },
        */
        /*
        {
            file: '/utils/prop-types',
            renameTo: generator => `/${generator.entityInstance}/utils/prop-types`,
        },
        */
        /*
        {
            file: '/utils/yup',
            renameTo: generator => `/${generator.entityInstance}/utils/yup`,
        },
        */
    ],
};

module.exports = files;
