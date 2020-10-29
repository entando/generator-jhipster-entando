const jhiConstants = require('generator-jhipster/generators/generator-constants');
const constants = require('../generator-constants');

const { SERVER_MAIN_SRC_DIR, SERVER_TEST_SRC_DIR } = jhiConstants;
const { MFE_MAIN_DIR } = constants;

const serverFiles = {
  schema: [
    {
      path: SERVER_MAIN_SRC_DIR,
      templates: [
        {
          file: 'package/web/rest/schema/EntitySchemaResource.java',
          renameTo: generator =>
            `${generator.packageFolder}/web/rest/schema/${generator.entityClass}SchemaResource.java`,
        },
      ],
    },
  ],
  entity: [
    {
      condition: generator => generator.databaseType === 'no',
      path: SERVER_MAIN_SRC_DIR,
      templates: [
        {
          file: 'package/domain/NoDbEntity.java',
          renameTo: generator => `${generator.packageFolder}/domain/${generator.entityClass}.java`,
        },
      ],
    },
  ],
  repository: [
    {
      condition: generator => generator.databaseType === 'no',
      path: SERVER_MAIN_SRC_DIR,
      templates: [
        {
          file: 'package/repository/NoDbEntityRepository.java',
          renameTo: generator =>
            `${generator.packageFolder}/repository/${generator.entityClass}Repository.java`,
          override: true,
        },
        {
          file: 'package/repository/impl/NoDbEntityRepositoryImpl.java',
          renameTo: generator =>
            `${generator.packageFolder}/repository/impl/${generator.entityClass}RepositoryImpl.java`,
          override: true,
        },
      ],
    },
  ],
  service: [
    {
      condition: generator => generator.databaseType === 'no' && generator.service === 'serviceImpl',
      path: SERVER_MAIN_SRC_DIR,
      templates: [
        {
          file: 'package/service/NoDbService.java',
          renameTo: generator => `${generator.packageFolder}/service/${generator.entityClass}Service.java`,
          override: true,
        },
        {
          file: 'package/service/impl/NoDbServiceImpl.java',
          renameTo: generator =>
            `${generator.packageFolder}/service/impl/${generator.entityClass}ServiceImpl.java`,
          override: true,
        },
      ],
    },
    {
      condition: generator => generator.databaseType === 'no' && generator.service === 'serviceClass',
      path: SERVER_MAIN_SRC_DIR,
      templates: [
        {
          file: 'package/service/impl/NoDbServiceImpl.java',
          renameTo: generator => `${generator.packageFolder}/service/${generator.entityClass}Service.java`,
          override: true,
        },
      ],
    },
  ],
  controller: [
    {
      condition: generator => generator.databaseType === 'no',
      path: SERVER_MAIN_SRC_DIR,
      templates: [
        {
          file: 'package/web/rest/NoDbEntityResource.java',
          renameTo: generator => `${generator.packageFolder}/web/rest/${generator.entityClass}Resource.java`,
          override: true,
        },
      ],
    },
  ],
  test: [
    {
      condition: generator => generator.databaseType === 'no',
      path: SERVER_TEST_SRC_DIR,
      templates: [
        {
          file: 'package/domain/NoDbEntityTest.java',
          renameTo: generator => `${generator.packageFolder}/domain/${generator.entityClass}Test.java`,
          override: true,
        },
        {
          file: 'package/web/rest/NoDbEntityResourceIT.java',
          path: SERVER_TEST_SRC_DIR,
          renameTo: generator =>
            `${generator.packageFolder}/web/rest/${generator.entityClass}ResourceIT.java`,
          override: true,
        },
      ],
    },
  ],
};

const microFrontendFiles = {
  common: [
    {
      path: MFE_MAIN_DIR,
      templates: [
        {
          file: `entity/detailsWidget/.env.local`,
          renameTo: generator => `${generator.entityFileName}/detailsWidget/.env.local`,
        },
        {
          file: `entity/detailsWidget/.env.production`,
          renameTo: generator => `${generator.entityFileName}/detailsWidget/.env.production`,
        },
        {
          file: `entity/detailsWidget/jsconfig.json`,
          renameTo: generator => `${generator.entityFileName}/detailsWidget/jsconfig.json`,
        },
        {
          file: `entity/detailsWidget/LICENSE`,
          renameTo: generator => `${generator.entityFileName}/detailsWidget/LICENSE`,
        },
        {
          file: `entity/detailsWidget/package.json`,
          renameTo: generator => `${generator.entityFileName}/detailsWidget/package.json`,
        },
        {
          file: `entity/detailsWidget/package-lock.json`,
          renameTo: generator => `${generator.entityFileName}/detailsWidget/package-lock.json`,
        },
        {
          file: `entity/detailsWidget/README.md`,
          renameTo: generator => `${generator.entityFileName}/detailsWidget/README.md`,
        },
      ],
    },
  ],
  bundle: [
    {
      path: MFE_MAIN_DIR,
      templates: [
        {
          file: `entity/detailsWidget/bundle/details-widget.ftl`,
          renameTo: generator =>
            `${generator.entityFileName}/detailsWidget/bundle/${generator.entityFileName}-details-widget.ftl`,
        },
        {
          file: `entity/detailsWidget/bundle/details-widget-descriptor.yaml`,
          renameTo: generator =>
            `${generator.entityFileName}/detailsWidget/bundle/${generator.entityFileName}-details-widget-descriptor.yaml`,
        },
      ],
    },
  ],
  public: [
    {
      path: MFE_MAIN_DIR,
      templates: [
        {
          file: `entity/detailsWidget/public/favicon.ico`,
          noEjs: true,
          method: 'copy',
          renameTo: generator => `${generator.entityFileName}/detailsWidget/public/favicon.ico`,
        },
        {
          file: `entity/detailsWidget/public/index.html`,
          renameTo: generator => `${generator.entityFileName}/detailsWidget/public/index.html`,
        },
        {
          file: `entity/detailsWidget/public/robots.txt`,
          renameTo: generator => `${generator.entityFileName}/detailsWidget/public/robots.txt`,
        },
      ],
    },
  ],
  scripts: [
    {
      path: MFE_MAIN_DIR,
      templates: [
        {
          file: `entity/detailsWidget/scripts/i18next-scanner.config.js`,
          renameTo: generator =>
            `${generator.entityFileName}/detailsWidget/scripts/i18next-scanner.config.js`,
        },
      ],
    },
  ],
  sourceApi: [
    {
      path: MFE_MAIN_DIR,
      templates: [
        {
          file: `entity/detailsWidget/src/api/entity.js`,
          renameTo: generator =>
            `${generator.entityFileName}/detailsWidget/src/api/${generator.entityFileName}.js`,
        },
      ],
    },
    {
      path: MFE_MAIN_DIR,
      templates: [
        {
          file: `entity/detailsWidget/src/api/helpers.js`,
          renameTo: generator => `${generator.entityFileName}/detailsWidget/src/api/helpers.js`,
        },
      ],
    },
  ],
  sourceAuth: [
    {
      path: MFE_MAIN_DIR,
      templates: [
        {
          file: `entity/detailsWidget/src/auth/KeycloakContext.js`,
          renameTo: generator => `${generator.entityFileName}/detailsWidget/src/auth/KeycloakContext.js`,
        },
      ],
    },
    {
      path: MFE_MAIN_DIR,
      templates: [
        {
          file: `entity/detailsWidget/src/auth/KeycloakViews.js`,
          renameTo: generator => `${generator.entityFileName}/detailsWidget/src/auth/KeycloakViews.js`,
        },
      ],
    },
    {
      path: MFE_MAIN_DIR,
      templates: [
        {
          file: `entity/detailsWidget/src/auth/withKeycloak.js`,
          renameTo: generator => `${generator.entityFileName}/detailsWidget/src/auth/withKeycloak.js`,
        },
      ],
    },
  ],
  sourceMockComponents: [
    {
      path: MFE_MAIN_DIR,
      templates: [
        {
          file: `entity/detailsWidget/src/components/__mocks__/entityMocks.js`,
          renameTo: generator =>
            `${generator.entityFileName}/detailsWidget/src/components/__mocks__/${generator.entityFileName}Mocks.js`,
        },
      ],
    },
    {
      path: MFE_MAIN_DIR,
      templates: [
        {
          file: `entity/detailsWidget/src/components/__mocks__/i18n.js`,
          renameTo: generator => `${generator.entityFileName}/detailsWidget/src/components/__mocks__/i18n.js`,
        },
      ],
    },
  ],
  sourceTestsComponents: [
    {
      path: MFE_MAIN_DIR,
      templates: [
        {
          file: `entity/detailsWidget/src/components/__tests__/EntityDetails.test.js`,
          renameTo: generator =>
            `${generator.entityFileName}/detailsWidget/src/components/__tests__/${generator.entityFileName}Details.test.js`,
        },
      ],
    },
    {
      path: MFE_MAIN_DIR,
      templates: [
        {
          file: `entity/detailsWidget/src/components/__tests__/EntityDetailsContainer.test.js`,
          renameTo: generator =>
            `${generator.entityFileName}/detailsWidget/src/components/__tests__/${generator.entityFileName}DetailsContainer.test.js`,
        },
      ],
    },
  ],
  sourceTypesComponents: [
    {
      path: MFE_MAIN_DIR,
      templates: [
        {
          file: `entity/detailsWidget/src/components/__types__/entity.js`,
          renameTo: generator =>
            `${generator.entityFileName}/detailsWidget/src/components/__types__/${generator.entityFileName}.js`,
        },
      ],
    },
    {
      path: MFE_MAIN_DIR,
      templates: [
        {
          file: `entity/detailsWidget/src/components/__types__/keycloak.js`,
          renameTo: generator =>
            `${generator.entityFileName}/detailsWidget/src/components/__types__/keycloak.js`,
        },
      ],
    },
    {
      path: MFE_MAIN_DIR,
      templates: [
        {
          file: `entity/detailsWidget/src/components/__types__/ref.js`,
          renameTo: generator => `${generator.entityFileName}/detailsWidget/src/components/__types__/ref.js`,
        },
      ],
    },
  ],
  sourceCommonComponents: [
    {
      path: MFE_MAIN_DIR,
      templates: [
        {
          file: `entity/detailsWidget/src/components/common/Notification.js`,
          renameTo: generator =>
            `${generator.entityFileName}/detailsWidget/src/components/common/Notification.js`,
        },
      ],
    },
  ],
  sourceFieldTableComponents: [
    {
      path: MFE_MAIN_DIR,
      templates: [
        {
          file: `entity/detailsWidget/src/components/entity-field-table/EntityFieldTable.js`,
          renameTo: generator =>
            `${generator.entityFileName}/detailsWidget/src/components/${generator.entityFileName}-field-table/${generator.entityFileName}FieldTable.js`,
        },
      ],
    },
  ],
  sourceComponents: [
    {
      path: MFE_MAIN_DIR,
      templates: [
        {
          file: `entity/detailsWidget/src/components/EntityDetails.js`,
          renameTo: generator =>
            `${generator.entityFileName}/detailsWidget/src/components/${generator.entityFileName}Details.js`,
        },
        {
          file: `entity/detailsWidget/src/components/EntityDetailsContainer.js`,
          renameTo: generator =>
            `${generator.entityFileName}/detailsWidget/src/components/${generator.entityFileName}DetailsContainer.js`,
        },
      ],
    },
  ],
  sourceCustomElements: [
    {
      path: MFE_MAIN_DIR,
      templates: [
        {
          file: `entity/detailsWidget/src/custom-elements/EntityDetailsElement.js`,
          renameTo: generator =>
            `${generator.entityFileName}/detailsWidget/src/custom-elements/${generator.entityFileName}DetailsElement.js`,
        },
        {
          file: `entity/detailsWidget/src/custom-elements/widgetEventTypes.js`,
          renameTo: generator =>
            `${generator.entityFileName}/detailsWidget/src/custom-elements/widgetEventTypes.js`,
        },
      ],
    },
  ],
  sourceHelpers: [
    {
      path: MFE_MAIN_DIR,
      templates: [
        {
          file: `entity/detailsWidget/src/helpers/widgetEvents.js`,
          renameTo: generator => `${generator.entityFileName}/detailsWidget/src/helpers/widgetEvents.js`,
        },
      ],
    },
  ],
  sourceI18n: [
    {
      path: MFE_MAIN_DIR,
      templates: [
        {
          file: `entity/detailsWidget/src/i18n/locales/en.json`,
          renameTo: generator => `${generator.entityFileName}/detailsWidget/src/i18n/locales/en.json`,
        },
        {
          file: `entity/detailsWidget/src/i18n/locales/index.js`,
          renameTo: generator => `${generator.entityFileName}/detailsWidget/src/i18n/locales/index.js`,
        },
        {
          file: `entity/detailsWidget/src/i18n/locales/en.json`,
          renameTo: generator => `${generator.entityFileName}/detailsWidget/src/i18n/locales/it.json`,
        },
        {
          file: `entity/detailsWidget/src/i18n/constants.js`,
          renameTo: generator => `${generator.entityFileName}/detailsWidget/src/i18n/constants.js`,
        },
        {
          file: `entity/detailsWidget/src/i18n/constants.js`,
          renameTo: generator => `${generator.entityFileName}/detailsWidget/src/i18n/i18n.js`,
        },
        {
          file: `entity/detailsWidget/src/i18n/constants.js`,
          renameTo: generator => `${generator.entityFileName}/detailsWidget/src/i18n/setLocale.js`,
        },
      ],
    },
  ],
  sourceRoot: [
    {
      path: MFE_MAIN_DIR,
      templates: [
        {
          file: `entity/detailsWidget/src/index.css`,
          renameTo: generator => `${generator.entityFileName}/detailsWidget/src/index.css`,
        },
        {
          file: `entity/detailsWidget/src/index.js`,
          renameTo: generator => `${generator.entityFileName}/detailsWidget/src/index.js`,
        },
      ],
    },
  ],
};

module.exports = {
  serverFiles,
  microFrontendFiles,
};
