const dynamic = {
    path: 'ui/widgets',
    templates: [
        {
            file: '/detailsWidget/package.json',
            renameTo: generator => `/${generator.entityInstance}/detailsWidget/package.json`,
            useBluePrint: true,
        },
        {
            file: '/detailsWidget/public/index.html',
            renameTo: generator => `/${generator.entityInstance}/detailsWidget/public/index.html`,
            useBluePrint: true,
        },
        {
            file: '/detailsWidget/src/index.js',
            renameTo: generator => `/${generator.entityInstance}/detailsWidget/src/index.js`,
            useBluePrint: true,
        },
        {
            file: '/detailsWidget/src/api/entityApi.js',
            renameTo: generator => `/${generator.entityInstance}/detailsWidget/src/api/${generator.entityInstance}Api.js`,
            useBluePrint: true,
        },
        {
            file: '/detailsWidget/src/components/__mocks__/entityMocks.js',
            renameTo: generator =>
                `/${generator.entityInstance}/detailsWidget/src/components/__mocks__/${generator.entityInstance}Mocks.js`,
            useBluePrint: true,
        },
        {
            file: '/detailsWidget/src/components/__tests__/EntityDetails.test.js',
            renameTo: generator =>
                `/${generator.entityInstance}/detailsWidget/src/components/__tests__/${generator.entityClass}Details.test.js`,
            useBluePrint: true,
        },
        {
            file: '/detailsWidget/src/components/__tests__/EntityDetailsContainer.test.js',
            renameTo: generator =>
                `/${generator.entityInstance}/detailsWidget/src/components/__tests__/${generator.entityClass}DetailsContainer.test.js`,
            useBluePrint: true,
        },
        {
            file: '/detailsWidget/src/components/__types__/entity.js',
            renameTo: generator => `/${generator.entityInstance}/detailsWidget/src/components/__types__/${generator.entityInstance}.js`,
            useBluePrint: true,
        },
        {
            file: '/detailsWidget/src/components/entity-field-table/EntityFieldTable.js',
            renameTo: generator =>
                `/${generator.entityInstance}/detailsWidget/src/components/${generator.entityFileName}-field-table/${
                    generator.entityClass
                }FieldTable.js`,
            useBluePrint: true,
        },
        {
            file: '/detailsWidget/src/components/EntityDetails.js',
            renameTo: generator => `/${generator.entityInstance}/detailsWidget/src/components/${generator.entityClass}Details.js`,
            useBluePrint: true,
        },
        {
            file: '/detailsWidget/src/components/EntityDetailsContainer.js',
            renameTo: generator => `/${generator.entityInstance}/detailsWidget/src/components/${generator.entityClass}DetailsContainer.js`,
            useBluePrint: true,
        },
        {
            file: '/detailsWidget/src/custom-elements/EntityDetailsElement.js',
            renameTo: generator =>
                `/${generator.entityInstance}/detailsWidget/src/custom-elements/${generator.entityClass}DetailsElement.js`,
            useBluePrint: true,
        },
        {
            file: '/detailsWidget/src/i18n/locales/en.json',
            renameTo: generator => `/${generator.entityInstance}/detailsWidget/src/i18n/locales/en.json`,
            useBluePrint: true,
        },
    ],
};

const copy = {
    path: 'ui/widgets',
    templates: [
        {
            file: '/detailsWidget/.env',
            renameTo: generator => `/${generator.entityInstance}/detailsWidget/.env`,
            method: 'copy',
        },
        {
            file: '/detailsWidget/public/favicon.ico',
            renameTo: generator => `/${generator.entityInstance}/detailsWidget/public/favicon.ico`,
            method: 'copy',
        },
        {
            file: '/detailsWidget/public/robots.txt',
            renameTo: generator => `/${generator.entityInstance}/detailsWidget/public/robots.txt`,
            method: 'copy',
        },
        {
            file: '/detailsWidget/src/index.css',
            renameTo: generator => `/${generator.entityInstance}/detailsWidget/src/index.css`,
            method: 'copy',
        },
        {
            file: '/detailsWidget/src/api/constants.js',
            renameTo: generator => `/${generator.entityInstance}/detailsWidget/src/api/constants.js`,
            method: 'copy',
        },
        {
            file: '/detailsWidget/src/components/__mocks__/i18n.js',
            renameTo: generator => `/${generator.entityInstance}/detailsWidget/src/components/__mocks__/i18n.js`,
            method: 'copy',
        },
        {
            file: '/detailsWidget/src/components/common/ErrorNotification.js',
            renameTo: generator => `/${generator.entityInstance}/detailsWidget/src/components/common/ErrorNotification.js`,
            method: 'copy',
        },
        {
            file: '/detailsWidget/src/i18n/i18n.js',
            renameTo: generator => `/${generator.entityInstance}/detailsWidget/src/i18n/i18n.js`,
            method: 'copy',
        },
        {
            file: '/detailsWidget/src/i18n/locales/index.js',
            renameTo: generator => `/${generator.entityInstance}/detailsWidget/src/i18n/locales/index.js`,
            method: 'copy',
        },
    ],
};

function generateRenameTo(file) {
    return generator => 'test.json';
}

function createTemplateTree({ path, templates }) {
    return {
        path,
        templates: templates.map(({ file, ...options }) => ({
            file,
            renameTo: generateRenameTo(file),
            ...options,
        })),
    };
}

const files = createTemplateTree({
    path: 'ui/widgets',
    templates: [
        { file: '/detailsWidget/package.json', useBluePrint: true },
        { file: '/detailsWidget/public/favicon.ico', method: 'copy' },
        { file: '/detailsWidget/src/index.css', method: 'copy' },
        { file: '/detailsWidget/src/index.js', useBluePrint: true },
    ],
});

module.exports = {
    dynamic,
    copy,
};
