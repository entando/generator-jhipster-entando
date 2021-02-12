const constants = require('../generator-constants');
const EntandoNeedle = require('./needle-api/needle-server-bundle');
const { getMockData } = require('./lib/mfe-test-tools');

const { MFE_MAIN_DIR, DETAILS_WIDGET, FORM_WIDGET, TABLE_WIDGET } = constants;

const microFrontendFiles = {
  common: [
    {
      path: MFE_MAIN_DIR,
      condition: generator => generator.selectedWidgets.includes(DETAILS_WIDGET),
      templates: [
        {
          file: 'entity/detailsWidget/.env.local',
          renameTo: generator => `${generator.entityFileName}/detailsWidget/.env.local`,
        },
        {
          file: 'entity/detailsWidget/.env.production',
          renameTo: generator => `${generator.entityFileName}/detailsWidget/.env.production`,
        },
        {
          file: 'entity/detailsWidget/.gitignore',
          renameTo: generator => `${generator.entityFileName}/detailsWidget/.gitignore`,
        },
        {
          file: 'entity/detailsWidget/jsconfig.json',
          renameTo: generator => `${generator.entityFileName}/detailsWidget/jsconfig.json`,
        },
        {
          file: 'entity/detailsWidget/LICENSE',
          renameTo: generator => `${generator.entityFileName}/detailsWidget/LICENSE`,
        },
        {
          file: 'entity/detailsWidget/package.json',
          renameTo: generator => `${generator.entityFileName}/detailsWidget/package.json`,
        },
        {
          file: 'entity/detailsWidget/package-lock.json',
          renameTo: generator => `${generator.entityFileName}/detailsWidget/package-lock.json`,
        },
        {
          file: 'entity/detailsWidget/README.md',
          renameTo: generator => `${generator.entityFileName}/detailsWidget/README.md`,
        },
      ],
    },
    {
      path: MFE_MAIN_DIR,
      condition: generator => generator.selectedWidgets.includes(FORM_WIDGET),
      templates: [
        {
          file: 'entity/formWidget/.env.local',
          renameTo: generator => `${generator.entityFileName}/formWidget/.env.local`,
        },
        {
          file: 'entity/formWidget/.env.production',
          renameTo: generator => `${generator.entityFileName}/formWidget/.env.production`,
        },
        {
          file: 'entity/formWidget/.gitignore',
          renameTo: generator => `${generator.entityFileName}/formWidget/.gitignore`,
        },
        {
          file: 'entity/formWidget/deploy-widget.sh',
          renameTo: generator => `${generator.entityFileName}/formWidget/deploy-widget.sh`,
        },
        {
          file: 'entity/formWidget/jsconfig.json',
          renameTo: generator => `${generator.entityFileName}/formWidget/jsconfig.json`,
        },
        {
          file: 'entity/formWidget/LICENSE',
          renameTo: generator => `${generator.entityFileName}/formWidget/LICENSE`,
        },
        {
          file: 'entity/formWidget/package.json',
          renameTo: generator => `${generator.entityFileName}/formWidget/package.json`,
        },
        {
          file: 'entity/formWidget/package-lock.json',
          renameTo: generator => `${generator.entityFileName}/formWidget/package-lock.json`,
        },
        {
          file: 'entity/formWidget/README.md',
          renameTo: generator => `${generator.entityFileName}/formWidget/README.md`,
        },
      ],
    },
    {
      path: MFE_MAIN_DIR,
      condition: generator => generator.selectedWidgets.includes(TABLE_WIDGET),
      templates: [
        {
          file: 'entity/tableWidget/.env.local',
          renameTo: generator => `${generator.entityFileName}/tableWidget/.env.local`,
        },
        {
          file: 'entity/tableWidget/.env.production',
          renameTo: generator => `${generator.entityFileName}/tableWidget/.env.production`,
        },
        {
          file: 'entity/tableWidget/.gitignore',
          renameTo: generator => `${generator.entityFileName}/tableWidget/.gitignore`,
        },
        {
          file: 'entity/tableWidget/deploy-widget.sh',
          renameTo: generator => `${generator.entityFileName}/tableWidget/deploy-widget.sh`,
        },
        {
          file: 'entity/tableWidget/jsconfig.json',
          renameTo: generator => `${generator.entityFileName}/tableWidget/jsconfig.json`,
        },
        {
          file: 'entity/tableWidget/LICENSE',
          renameTo: generator => `${generator.entityFileName}/tableWidget/LICENSE`,
        },
        {
          file: 'entity/tableWidget/package.json',
          renameTo: generator => `${generator.entityFileName}/tableWidget/package.json`,
        },
        {
          file: 'entity/tableWidget/README.md',
          renameTo: generator => `${generator.entityFileName}/tableWidget/README.md`,
        },
      ],
    },
  ],
  bundle: [
    {
      path: MFE_MAIN_DIR,
      condition: generator => generator.selectedWidgets.includes(DETAILS_WIDGET),
      templates: [
        {
          file: 'entity/detailsWidget/bundle/details-widget.ftl',
          renameTo: generator =>
            `${generator.entityFileName}/detailsWidget/bundle/${generator.entityFileName}-details-widget.ftl`,
        },
        {
          file: 'entity/detailsWidget/bundle/details-widget-descriptor.yaml',
          renameTo: generator =>
            `${generator.entityFileName}/detailsWidget/bundle/${generator.entityFileName}-details-widget-descriptor.yaml`,
        },
      ],
    },
    {
      path: MFE_MAIN_DIR,
      condition: generator => generator.selectedWidgets.includes(FORM_WIDGET),
      templates: [
        {
          file: 'entity/formWidget/bundle/form-widget.ftl',
          renameTo: generator =>
            `${generator.entityFileName}/formWidget/bundle/${generator.entityFileName}-form-widget.ftl`,
        },
        {
          file: 'entity/formWidget/bundle/form-widget-descriptor.yaml',
          renameTo: generator =>
            `${generator.entityFileName}/formWidget/bundle/${generator.entityFileName}-form-widget-descriptor.yaml`,
        },
      ],
    },
    {
      path: MFE_MAIN_DIR,
      condition: generator => generator.selectedWidgets.includes(TABLE_WIDGET),
      templates: [
        {
          file: 'entity/tableWidget/bundle/table-widget.ftl',
          renameTo: generator =>
            `${generator.entityFileName}/tableWidget/bundle/${generator.entityFileName}-table-widget.ftl`,
        },
        {
          file: 'entity/tableWidget/bundle/table-widget-descriptor.yaml',
          renameTo: generator =>
            `${generator.entityFileName}/tableWidget/bundle/${generator.entityFileName}-table-widget-descriptor.yaml`,
        },
      ],
    },
  ],
  public: [
    {
      path: MFE_MAIN_DIR,
      condition: generator => generator.selectedWidgets.includes(DETAILS_WIDGET),
      templates: [
        {
          file: 'entity/detailsWidget/public/favicon.ico',
          noEjs: true,
          method: 'copy',
          renameTo: generator => `${generator.entityFileName}/detailsWidget/public/favicon.ico`,
        },
        {
          file: 'entity/detailsWidget/public/index.html',
          renameTo: generator => `${generator.entityFileName}/detailsWidget/public/index.html`,
        },
        {
          file: 'entity/detailsWidget/public/robots.txt',
          renameTo: generator => `${generator.entityFileName}/detailsWidget/public/robots.txt`,
        },
      ],
    },
    {
      path: MFE_MAIN_DIR,
      condition: generator => generator.selectedWidgets.includes(FORM_WIDGET),
      templates: [
        {
          file: 'entity/formWidget/public/favicon.ico',
          noEjs: true,
          method: 'copy',
          renameTo: generator => `${generator.entityFileName}/formWidget/public/favicon.ico`,
        },
        {
          file: 'entity/formWidget/public/index.html',
          renameTo: generator => `${generator.entityFileName}/formWidget/public/index.html`,
        },
        {
          file: 'entity/formWidget/public/robots.txt',
          renameTo: generator => `${generator.entityFileName}/formWidget/public/robots.txt`,
        },
      ],
    },
    {
      path: MFE_MAIN_DIR,
      condition: generator => generator.selectedWidgets.includes(TABLE_WIDGET),
      templates: [
        {
          file: 'entity/tableWidget/public/favicon.ico',
          noEjs: true,
          method: 'copy',
          renameTo: generator => `${generator.entityFileName}/tableWidget/public/favicon.ico`,
        },
        {
          file: 'entity/tableWidget/public/index.html',
          renameTo: generator => `${generator.entityFileName}/tableWidget/public/index.html`,
        },
        {
          file: 'entity/tableWidget/public/robots.txt',
          renameTo: generator => `${generator.entityFileName}/tableWidget/public/robots.txt`,
        },
      ],
    },
  ],
  scripts: [
    {
      path: MFE_MAIN_DIR,
      condition: generator => generator.selectedWidgets.includes(DETAILS_WIDGET),
      templates: [
        {
          file: 'entity/detailsWidget/scripts/i18next-scanner.config.js',
          renameTo: generator =>
            `${generator.entityFileName}/detailsWidget/scripts/i18next-scanner.config.js`,
        },
      ],
    },
    {
      path: MFE_MAIN_DIR,
      condition: generator => generator.selectedWidgets.includes(FORM_WIDGET),
      templates: [
        {
          file: 'entity/formWidget/scripts/i18next-scanner.config.js',
          renameTo: generator => `${generator.entityFileName}/formWidget/scripts/i18next-scanner.config.js`,
        },
      ],
    },
    {
      path: MFE_MAIN_DIR,
      condition: generator => generator.selectedWidgets.includes(TABLE_WIDGET),
      templates: [
        {
          file: 'entity/tableWidget/scripts/i18next-scanner.config.js',
          renameTo: generator => `${generator.entityFileName}/tableWidget/scripts/i18next-scanner.config.js`,
        },
      ],
    },
  ],
  sourceApi: [
    {
      path: MFE_MAIN_DIR,
      condition: generator => generator.selectedWidgets.includes(DETAILS_WIDGET),
      templates: [
        {
          file: 'entity/detailsWidget/src/api/entity.js',
          renameTo: generator =>
            `${generator.entityFileName}/detailsWidget/src/api/${generator.entityInstance}.js`,
        },
        {
          file: 'entity/detailsWidget/src/api/helpers.js',
          renameTo: generator => `${generator.entityFileName}/detailsWidget/src/api/helpers.js`,
        },
      ],
    },
    {
      path: MFE_MAIN_DIR,
      condition: generator => generator.selectedWidgets.includes(FORM_WIDGET),
      templates: [
        {
          file: 'entity/formWidget/src/api/entities.js',
          renameTo: generator =>
            `${generator.entityFileName}/formWidget/src/api/${generator.entityInstancePlural}.js`,
        },
        {
          file: 'entity/formWidget/src/api/helpers.js',
          renameTo: generator => `${generator.entityFileName}/formWidget/src/api/helpers.js`,
        },
      ],
    },
    {
      path: MFE_MAIN_DIR,
      condition: generator => generator.selectedWidgets.includes(TABLE_WIDGET),
      templates: [
        {
          file: 'entity/tableWidget/src/api/entities.js',
          renameTo: generator =>
            `${generator.entityFileName}/tableWidget/src/api/${generator.entityInstancePlural}.js`,
        },
        {
          file: 'entity/tableWidget/src/api/helpers.js',
          renameTo: generator => `${generator.entityFileName}/tableWidget/src/api/helpers.js`,
        },
      ],
    },
  ],
  sourceAuth: [
    {
      path: MFE_MAIN_DIR,
      condition: generator => generator.selectedWidgets.includes(DETAILS_WIDGET),
      templates: [
        {
          file: 'entity/detailsWidget/src/auth/KeycloakContext.js',
          renameTo: generator => `${generator.entityFileName}/detailsWidget/src/auth/KeycloakContext.js`,
        },
        {
          file: 'entity/detailsWidget/src/auth/KeycloakViews.js',
          renameTo: generator => `${generator.entityFileName}/detailsWidget/src/auth/KeycloakViews.js`,
        },
        {
          file: 'entity/detailsWidget/src/auth/withKeycloak.js',
          renameTo: generator => `${generator.entityFileName}/detailsWidget/src/auth/withKeycloak.js`,
        },
      ],
    },
    {
      path: MFE_MAIN_DIR,
      condition: generator => generator.selectedWidgets.includes(FORM_WIDGET),
      templates: [
        {
          file: 'entity/formWidget/src/auth/KeycloakContext.js',
          renameTo: generator => `${generator.entityFileName}/formWidget/src/auth/KeycloakContext.js`,
        },
        {
          file: 'entity/formWidget/src/auth/KeycloakViews.js',
          renameTo: generator => `${generator.entityFileName}/formWidget/src/auth/KeycloakViews.js`,
        },
        {
          file: 'entity/formWidget/src/auth/withKeycloak.js',
          renameTo: generator => `${generator.entityFileName}/formWidget/src/auth/withKeycloak.js`,
        },
      ],
    },
    {
      path: MFE_MAIN_DIR,
      condition: generator => generator.selectedWidgets.includes(TABLE_WIDGET),
      templates: [
        {
          file: 'entity/tableWidget/src/auth/KeycloakContext.js',
          renameTo: generator => `${generator.entityFileName}/tableWidget/src/auth/KeycloakContext.js`,
        },
        {
          file: 'entity/tableWidget/src/auth/KeycloakViews.js',
          renameTo: generator => `${generator.entityFileName}/tableWidget/src/auth/KeycloakViews.js`,
        },
        {
          file: 'entity/tableWidget/src/auth/withKeycloak.js',
          renameTo: generator => `${generator.entityFileName}/tableWidget/src/auth/withKeycloak.js`,
        },
      ],
    },
  ],
  sourceMockComponents: [
    {
      path: MFE_MAIN_DIR,
      condition: generator => generator.selectedWidgets.includes(DETAILS_WIDGET),
      templates: [
        {
          file: 'entity/detailsWidget/src/components/__mocks__/entityMocks.js',
          renameTo: generator =>
            `${generator.entityFileName}/detailsWidget/src/components/__mocks__/${generator.entityInstance}Mocks.js`,
        },
        {
          file: 'entity/detailsWidget/src/components/__mocks__/i18n.js',
          renameTo: generator => `${generator.entityFileName}/detailsWidget/src/components/__mocks__/i18n.js`,
        },
      ],
    },
    {
      path: MFE_MAIN_DIR,
      condition: generator => generator.selectedWidgets.includes(FORM_WIDGET),
      templates: [
        {
          file: 'entity/formWidget/src/components/__mocks__/entityMocks.js',
          renameTo: generator =>
            `${generator.entityFileName}/formWidget/src/components/__mocks__/${generator.entityInstance}Mocks.js`,
        },
      ],
    },
    {
      path: MFE_MAIN_DIR,
      condition: generator => generator.selectedWidgets.includes(TABLE_WIDGET),
      templates: [
        {
          file: 'entity/tableWidget/src/components/__mocks__/entityMocks.js',
          renameTo: generator =>
            `${generator.entityFileName}/tableWidget/src/components/__mocks__/${generator.entityInstance}Mocks.js`,
        },
        {
          file: 'entity/tableWidget/src/components/__mocks__/i18n.js',
          renameTo: generator => `${generator.entityFileName}/tableWidget/src/components/__mocks__/i18n.js`,
        },
      ],
    },
  ],
  sourceTestsComponents: [
    {
      path: MFE_MAIN_DIR,
      condition: generator => generator.selectedWidgets.includes(DETAILS_WIDGET),
      templates: [
        {
          file: 'entity/detailsWidget/src/components/__tests__/EntityDetails.test.js',
          renameTo: generator =>
            `${generator.entityFileName}/detailsWidget/src/components/__tests__/${generator.entityClass}Details.test.js`,
        },
        {
          file: 'entity/detailsWidget/src/components/__tests__/EntityDetailsContainer.test.js',
          renameTo: generator =>
            `${generator.entityFileName}/detailsWidget/src/components/__tests__/${generator.entityClass}DetailsContainer.test.js`,
        },
      ],
    },
    {
      path: MFE_MAIN_DIR,
      condition: generator => generator.selectedWidgets.includes(FORM_WIDGET),
      templates: [
        {
          file: 'entity/formWidget/src/components/__tests__/EntityAddFormContainer.test.js',
          renameTo: generator =>
            `${generator.entityFileName}/formWidget/src/components/__tests__/${generator.entityClass}AddFormContainer.test.js`,
        },
        {
          file: 'entity/formWidget/src/components/__tests__/EntityEditFormContainer.test.js',
          renameTo: generator =>
            `${generator.entityFileName}/formWidget/src/components/__tests__/${generator.entityClass}EditFormContainer.test.js`,
        },
        {
          file: 'entity/formWidget/src/components/__tests__/EntityForm.test.js',
          renameTo: generator =>
            `${generator.entityFileName}/formWidget/src/components/__tests__/${generator.entityClass}Form.test.js`,
        },
      ],
    },
    {
      path: MFE_MAIN_DIR,
      condition: generator => generator.selectedWidgets.includes(TABLE_WIDGET),
      templates: [
        {
          file: 'entity/tableWidget/src/components/__tests__/EntityTable.test.js',
          renameTo: generator =>
            `${generator.entityFileName}/tableWidget/src/components/__tests__/${generator.entityClass}Table.test.js`,
        },
        {
          file: 'entity/tableWidget/src/components/__tests__/EntityTableContainer.test.js',
          renameTo: generator =>
            `${generator.entityFileName}/tableWidget/src/components/__tests__/${generator.entityClass}TableContainer.test.js`,
        },
      ],
    },
  ],
  sourceTypesComponents: [
    {
      path: MFE_MAIN_DIR,
      condition: generator => generator.selectedWidgets.includes(DETAILS_WIDGET),
      templates: [
        {
          file: 'entity/detailsWidget/src/components/__types__/entity.js',
          renameTo: generator =>
            `${generator.entityFileName}/detailsWidget/src/components/__types__/${generator.entityInstance}.js`,
        },
        {
          file: 'entity/detailsWidget/src/components/__types__/keycloak.js',
          renameTo: generator =>
            `${generator.entityFileName}/detailsWidget/src/components/__types__/keycloak.js`,
        },
        {
          file: 'entity/detailsWidget/src/components/__types__/ref.js',
          renameTo: generator => `${generator.entityFileName}/detailsWidget/src/components/__types__/ref.js`,
        },
      ],
    },
    {
      path: MFE_MAIN_DIR,
      condition: generator => generator.selectedWidgets.includes(FORM_WIDGET),
      templates: [
        {
          file: 'entity/formWidget/src/components/__types__/entity.js',
          renameTo: generator =>
            `${generator.entityFileName}/formWidget/src/components/__types__/${generator.entityInstance}.js`,
        },
        {
          file: 'entity/formWidget/src/components/__types__/keycloak.js',
          renameTo: generator =>
            `${generator.entityFileName}/formWidget/src/components/__types__/keycloak.js`,
        },
        {
          file: 'entity/formWidget/src/components/__types__/ref.js',
          renameTo: generator => `${generator.entityFileName}/formWidget/src/components/__types__/ref.js`,
        },
      ],
    },
    {
      path: MFE_MAIN_DIR,
      condition: generator => generator.selectedWidgets.includes(TABLE_WIDGET),
      templates: [
        {
          file: 'entity/tableWidget/src/components/__types__/filter.js',
          renameTo: generator => `${generator.entityFileName}/tableWidget/src/components/__types__/filter.js`,
        },
        {
          file: 'entity/tableWidget/src/components/__types__/entity.js',
          renameTo: generator =>
            `${generator.entityFileName}/tableWidget/src/components/__types__/${generator.entityInstance}.js`,
        },
        {
          file: 'entity/tableWidget/src/components/__types__/keycloak.js',
          renameTo: generator =>
            `${generator.entityFileName}/tableWidget/src/components/__types__/keycloak.js`,
        },
        {
          file: 'entity/tableWidget/src/components/__types__/ref.js',
          renameTo: generator => `${generator.entityFileName}/tableWidget/src/components/__types__/ref.js`,
        },
      ],
    },
  ],
  sourceCommonComponents: [
    {
      path: MFE_MAIN_DIR,
      condition: generator => generator.selectedWidgets.includes(DETAILS_WIDGET),
      templates: [
        {
          file: 'entity/detailsWidget/src/components/common/Notification.js',
          renameTo: generator =>
            `${generator.entityFileName}/detailsWidget/src/components/common/Notification.js`,
        },
      ],
    },
    {
      path: MFE_MAIN_DIR,
      condition: generator => generator.selectedWidgets.includes(FORM_WIDGET),
      templates: [
        {
          file: 'entity/formWidget/src/components/common/ConfirmationDialogTrigger.js',
          renameTo: generator =>
            `${generator.entityFileName}/formWidget/src/components/common/ConfirmationDialogTrigger.js`,
        },
        {
          file: 'entity/formWidget/src/components/common/Notification.js',
          renameTo: generator =>
            `${generator.entityFileName}/formWidget/src/components/common/Notification.js`,
        },
      ],
    },
    {
      path: MFE_MAIN_DIR,
      condition: generator => generator.selectedWidgets.includes(TABLE_WIDGET),
      templates: [
        {
          file: 'entity/tableWidget/src/components/common/ConfirmationDialogTrigger.js',
          renameTo: generator =>
            `${generator.entityFileName}/tableWidget/src/components/common/ConfirmationDialogTrigger.js`,
        },
        {
          file: 'entity/tableWidget/src/components/common/Notification.js',
          renameTo: generator =>
            `${generator.entityFileName}/tableWidget/src/components/common/Notification.js`,
        },
      ],
    },
  ],
  sourceFieldTableComponents: [
    {
      path: MFE_MAIN_DIR,
      condition: generator => generator.selectedWidgets.includes(DETAILS_WIDGET),
      templates: [
        {
          file: 'entity/detailsWidget/src/components/entity-field-table/EntityFieldTable.js',
          renameTo: generator =>
            `${generator.entityFileName}/detailsWidget/src/components/${generator.entityFileName}-field-table/${generator.entityClass}FieldTable.js`,
        },
      ],
    },
  ],
  sourceComponents: [
    {
      path: MFE_MAIN_DIR,
      condition: generator => generator.selectedWidgets.includes(DETAILS_WIDGET),
      templates: [
        {
          file: 'entity/detailsWidget/src/components/EntityDetails.js',
          renameTo: generator =>
            `${generator.entityFileName}/detailsWidget/src/components/${generator.entityClass}Details.js`,
        },
        {
          file: 'entity/detailsWidget/src/components/EntityDetailsContainer.js',
          renameTo: generator =>
            `${generator.entityFileName}/detailsWidget/src/components/${generator.entityClass}DetailsContainer.js`,
        },
      ],
    },
    {
      path: MFE_MAIN_DIR,
      condition: generator => generator.selectedWidgets.includes(FORM_WIDGET),
      templates: [
        {
          file: 'entity/formWidget/src/components/EntityAddFormContainer.js',
          renameTo: generator =>
            `${generator.entityFileName}/formWidget/src/components/${generator.entityClass}AddFormContainer.js`,
        },
        {
          file: 'entity/formWidget/src/components/EntityEditFormContainer.js',
          renameTo: generator =>
            `${generator.entityFileName}/formWidget/src/components/${generator.entityClass}EditFormContainer.js`,
        },
        {
          file: 'entity/formWidget/src/components/EntityForm.js',
          renameTo: generator =>
            `${generator.entityFileName}/formWidget/src/components/${generator.entityClass}Form.js`,
        },
      ],
    },
    {
      path: MFE_MAIN_DIR,
      condition: generator => generator.selectedWidgets.includes(TABLE_WIDGET),
      templates: [
        {
          file: 'entity/tableWidget/src/components/EntityTable.js',
          renameTo: generator =>
            `${generator.entityFileName}/tableWidget/src/components/${generator.entityClass}Table.js`,
        },
        {
          file: 'entity/tableWidget/src/components/EntityTableContainer.js',
          renameTo: generator =>
            `${generator.entityFileName}/tableWidget/src/components/${generator.entityClass}TableContainer.js`,
        },
      ],
    },
  ],
  sourceFilterComponents: [
    {
      path: MFE_MAIN_DIR,
      condition: generator => generator.selectedWidgets.includes(TABLE_WIDGET),
      templates: [
        {
          file: 'entity/tableWidget/src/components/filters/Filter.js',
          renameTo: generator => `${generator.entityFileName}/tableWidget/src/components/filters/Filter.js`,
        },
        {
          file: 'entity/tableWidget/src/components/filters/FiltersContainer.js',
          renameTo: generator =>
            `${generator.entityFileName}/tableWidget/src/components/filters/FiltersContainer.js`,
        },
        {
          file: 'entity/tableWidget/src/components/filters/utils.js',
          renameTo: generator => `${generator.entityFileName}/tableWidget/src/components/filters/utils.js`,
        },
      ],
    },
  ],
  sourcePaginationComponents: [
    {
      path: MFE_MAIN_DIR,
      condition: generator => generator.selectedWidgets.includes(TABLE_WIDGET),
      templates: [
        {
          file: 'entity/tableWidget/src/components/pagination/PaginationContext.js',
          renameTo: generator =>
            `${generator.entityFileName}/tableWidget/src/components/pagination/PaginationContext.js`,
        },
        {
          file: 'entity/tableWidget/src/components/pagination/PaginationWrapper.js',
          renameTo: generator =>
            `${generator.entityFileName}/tableWidget/src/components/pagination/PaginationWrapper.js`,
        },
        {
          file: 'entity/tableWidget/src/components/pagination/TablePaginationActions.js',
          renameTo: generator =>
            `${generator.entityFileName}/tableWidget/src/components/pagination/TablePaginationActions.js`,
        },
        {
          file: 'entity/tableWidget/src/components/pagination/withPagination.js',
          renameTo: generator =>
            `${generator.entityFileName}/tableWidget/src/components/pagination/withPagination.js`,
        },
      ],
    },
  ],
  sourceCustomElements: [
    {
      path: MFE_MAIN_DIR,
      condition: generator => generator.selectedWidgets.includes(DETAILS_WIDGET),
      templates: [
        {
          file: 'entity/detailsWidget/src/custom-elements/EntityDetailsElement.js',
          renameTo: generator =>
            `${generator.entityFileName}/detailsWidget/src/custom-elements/${generator.entityClass}DetailsElement.js`,
        },
        {
          file: 'entity/detailsWidget/src/custom-elements/widgetEventTypes.js',
          renameTo: generator =>
            `${generator.entityFileName}/detailsWidget/src/custom-elements/widgetEventTypes.js`,
        },
      ],
    },
    {
      path: MFE_MAIN_DIR,
      condition: generator => generator.selectedWidgets.includes(FORM_WIDGET),
      templates: [
        {
          file: 'entity/formWidget/src/custom-elements/EntityFormElement.js',
          renameTo: generator =>
            `${generator.entityFileName}/formWidget/src/custom-elements/${generator.entityClass}FormElement.js`,
        },
        {
          file: 'entity/formWidget/src/custom-elements/widgetEventTypes.js',
          renameTo: generator =>
            `${generator.entityFileName}/formWidget/src/custom-elements/widgetEventTypes.js`,
        },
      ],
    },
    {
      path: MFE_MAIN_DIR,
      condition: generator => generator.selectedWidgets.includes(TABLE_WIDGET),
      templates: [
        {
          file: 'entity/tableWidget/src/custom-elements/EntityTableElement.js',
          renameTo: generator =>
            `${generator.entityFileName}/tableWidget/src/custom-elements/${generator.entityClass}TableElement.js`,
        },
        {
          file: 'entity/tableWidget/src/custom-elements/widgetEventTypes.js',
          renameTo: generator =>
            `${generator.entityFileName}/tableWidget/src/custom-elements/widgetEventTypes.js`,
        },
      ],
    },
  ],
  sourceHelpers: [
    {
      path: MFE_MAIN_DIR,
      condition: generator => generator.selectedWidgets.includes(DETAILS_WIDGET),
      templates: [
        {
          file: 'entity/detailsWidget/src/helpers/widgetEvents.js',
          renameTo: generator => `${generator.entityFileName}/detailsWidget/src/helpers/widgetEvents.js`,
        },
      ],
    },
    {
      path: MFE_MAIN_DIR,
      condition: generator => generator.selectedWidgets.includes(FORM_WIDGET),
      templates: [
        {
          file: 'entity/formWidget/src/helpers/widgetEvents.js',
          renameTo: generator => `${generator.entityFileName}/formWidget/src/helpers/widgetEvents.js`,
        },
      ],
    },
    {
      path: MFE_MAIN_DIR,
      condition: generator => generator.selectedWidgets.includes(TABLE_WIDGET),
      templates: [
        {
          file: 'entity/tableWidget/src/helpers/widgetEvents.js',
          renameTo: generator => `${generator.entityFileName}/tableWidget/src/helpers/widgetEvents.js`,
        },
      ],
    },
  ],
  sourceI18n: [
    {
      path: MFE_MAIN_DIR,
      condition: generator => generator.selectedWidgets.includes(DETAILS_WIDGET),
      templates: [
        {
          file: 'entity/detailsWidget/src/i18n/locales/en.json',
          renameTo: generator => `${generator.entityFileName}/detailsWidget/src/i18n/locales/en.json`,
        },
        {
          file: 'entity/detailsWidget/src/i18n/locales/index.js',
          renameTo: generator => `${generator.entityFileName}/detailsWidget/src/i18n/locales/index.js`,
        },
        {
          file: 'entity/detailsWidget/src/i18n/locales/it.json',
          renameTo: generator => `${generator.entityFileName}/detailsWidget/src/i18n/locales/it.json`,
        },
        {
          file: 'entity/detailsWidget/src/i18n/constants.js',
          renameTo: generator => `${generator.entityFileName}/detailsWidget/src/i18n/constants.js`,
        },
        {
          file: 'entity/detailsWidget/src/i18n/i18n.js',
          renameTo: generator => `${generator.entityFileName}/detailsWidget/src/i18n/i18n.js`,
        },
        {
          file: 'entity/detailsWidget/src/i18n/setLocale.js',
          renameTo: generator => `${generator.entityFileName}/detailsWidget/src/i18n/setLocale.js`,
        },
      ],
    },
    {
      path: MFE_MAIN_DIR,
      condition: generator => generator.selectedWidgets.includes(FORM_WIDGET),
      templates: [
        {
          file: 'entity/formWidget/src/i18n/__mocks__/i18nMock.js',
          renameTo: generator => `${generator.entityFileName}/formWidget/src/i18n/__mocks__/i18nMock.js`,
        },
        {
          file: 'entity/formWidget/src/i18n/locales/en.json',
          renameTo: generator => `${generator.entityFileName}/formWidget/src/i18n/locales/en.json`,
        },
        {
          file: 'entity/formWidget/src/i18n/locales/index.js',
          renameTo: generator => `${generator.entityFileName}/formWidget/src/i18n/locales/index.js`,
        },
        {
          file: 'entity/formWidget/src/i18n/locales/it.json',
          renameTo: generator => `${generator.entityFileName}/formWidget/src/i18n/locales/it.json`,
        },
        {
          file: 'entity/formWidget/src/i18n/constants.js',
          renameTo: generator => `${generator.entityFileName}/formWidget/src/i18n/constants.js`,
        },
        {
          file: 'entity/formWidget/src/i18n/dateFnsLocales.js',
          renameTo: generator => `${generator.entityFileName}/formWidget/src/i18n/dateFnsLocales.js`,
        },
        {
          file: 'entity/formWidget/src/i18n/i18next.js',
          renameTo: generator => `${generator.entityFileName}/formWidget/src/i18n/i18next.js`,
        },
        {
          file: 'entity/formWidget/src/i18n/setLocale.js',
          renameTo: generator => `${generator.entityFileName}/formWidget/src/i18n/setLocale.js`,
        },
        {
          file: 'entity/formWidget/src/i18n/yup.js',
          renameTo: generator => `${generator.entityFileName}/formWidget/src/i18n/yup.js`,
        },
      ],
    },
    {
      path: MFE_MAIN_DIR,
      condition: generator => generator.selectedWidgets.includes(TABLE_WIDGET),
      templates: [
        {
          file: 'entity/tableWidget/src/i18n/__mocks__/i18nMock.js',
          renameTo: generator => `${generator.entityFileName}/tableWidget/src/i18n/__mocks__/i18nMock.js`,
        },
        {
          file: 'entity/tableWidget/src/i18n/locales/en.json',
          renameTo: generator => `${generator.entityFileName}/tableWidget/src/i18n/locales/en.json`,
        },
        {
          file: 'entity/tableWidget/src/i18n/locales/index.js',
          renameTo: generator => `${generator.entityFileName}/tableWidget/src/i18n/locales/index.js`,
        },
        {
          file: 'entity/tableWidget/src/i18n/locales/it.json',
          renameTo: generator => `${generator.entityFileName}/tableWidget/src/i18n/locales/it.json`,
        },
        {
          file: 'entity/tableWidget/src/i18n/constants.js',
          renameTo: generator => `${generator.entityFileName}/tableWidget/src/i18n/constants.js`,
        },
        {
          file: 'entity/tableWidget/src/i18n/i18next.js',
          renameTo: generator => `${generator.entityFileName}/tableWidget/src/i18n/i18next.js`,
        },
        {
          file: 'entity/tableWidget/src/i18n/setLocale.js',
          renameTo: generator => `${generator.entityFileName}/tableWidget/src/i18n/setLocale.js`,
        },
      ],
    },
  ],
  sourceState: [
    {
      path: MFE_MAIN_DIR,
      condition: generator => generator.selectedWidgets.includes(TABLE_WIDGET),
      templates: [
        {
          file: 'entity/tableWidget/src/state/filter.types.js',
          renameTo: generator => `${generator.entityFileName}/tableWidget/src/state/filter.types.js`,
        },
        {
          file: 'entity/tableWidget/src/state/entity.reducer.js',
          renameTo: generator =>
            `${generator.entityFileName}/tableWidget/src/state/${generator.entityInstance}.reducer.js`,
        },
        {
          file: 'entity/tableWidget/src/state/entity.types.js',
          renameTo: generator =>
            `${generator.entityFileName}/tableWidget/src/state/${generator.entityInstance}.types.js`,
        },
      ],
    },
  ],
  sourceRoot: [
    {
      path: MFE_MAIN_DIR,
      condition: generator => generator.selectedWidgets.includes(DETAILS_WIDGET),
      templates: [
        {
          file: 'entity/detailsWidget/src/index.css',
          renameTo: generator => `${generator.entityFileName}/detailsWidget/src/index.css`,
        },
        {
          file: 'entity/detailsWidget/src/index.js',
          renameTo: generator => `${generator.entityFileName}/detailsWidget/src/index.js`,
        },
      ],
    },
    {
      path: MFE_MAIN_DIR,
      condition: generator => generator.selectedWidgets.includes(FORM_WIDGET),
      templates: [
        {
          file: 'entity/formWidget/src/index.js',
          renameTo: generator => `${generator.entityFileName}/formWidget/src/index.js`,
        },
      ],
    },
    {
      path: MFE_MAIN_DIR,
      condition: generator => generator.selectedWidgets.includes(TABLE_WIDGET),
      templates: [
        {
          file: 'entity/tableWidget/src/index.js',
          renameTo: generator => `${generator.entityFileName}/tableWidget/src/index.js`,
        },
      ],
    },
  ],
};

function writeFiles() {
  return {
    writingInit() {
      if (this.configOptions.generateMfeForEntity) {
        this.mockData = getMockData(this.fields, 2);
      }
    },

    writeMicroFrontendFiles() {
      if (this.configOptions.generateMfeForEntity) {
        this.writeFilesToDisk(microFrontendFiles, this, false, null);
      }
    },

    updateBundleDescriptor() {
      this.entandoNeedleApi = new EntandoNeedle(this);
      this.entandoNeedleApi.addWidgetToDescriptor(this.entityFileName);
      this.entandoNeedleApi.addRolesToDescriptor(this.baseName.toLowerCase(), this.entityFileName);
    },

    addPrettier() {
      if (this.configOptions.generateMfeForEntity) {
        this.addNpmDevDependency('prettier', '2.0.5');
        this.addNpmScript('prettier', 'prettier --write "ui/**/*.js"');
      }
    },
  };
}

module.exports = {
  microFrontendFiles,
  writeFiles,
};
