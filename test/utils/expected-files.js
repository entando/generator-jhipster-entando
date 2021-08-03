const constants = require('generator-jhipster/generators/generator-constants');

const { SERVER_MAIN_RES_DIR, SERVER_MAIN_SRC_DIR, SERVER_TEST_SRC_DIR } = constants;

const expectedFiles = {
  microservices: [`${SERVER_MAIN_RES_DIR}static/favicon.png`],
  server: [
    'bundle/descriptor.yaml',
    'prepareMicrofrontends.sh',
    'prepareBundle.sh',
    'prepareDockerImage.sh',
    'buildBundle.sh',
    `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/config/OpenApiConfiguration.java`,
  ],
  entity: {
    server: {
      common: [`${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/web/rest/schema/FooSchemaResource.java`],
      noDb: [
        `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/domain/Foo.java`,
        `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/repository/FooRepository.java`,
        `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/repository/impl/FooRepositoryImpl.java`,
        `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/web/rest/FooResource.java`,
        `${SERVER_TEST_SRC_DIR}com/mycompany/myapp/domain/FooTest.java`,
        `${SERVER_TEST_SRC_DIR}com/mycompany/myapp/web/rest/FooResourceIT.java`,
      ],
      serviceClass: [`${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/service/FooService.java`],
      serviceImpl: [`${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/service/impl/FooServiceImpl.java`],
    },
    widget: {
      detailsWidget: [
        'ui/widgets/foo/detailsWidget/bundle/foo-details-widget.ftl',
        'ui/widgets/foo/detailsWidget/bundle/foo-details-widget-descriptor.yaml',
        'ui/widgets/foo/detailsWidget/public/favicon.ico',
        'ui/widgets/foo/detailsWidget/public/index.html',
        'ui/widgets/foo/detailsWidget/public/robots.txt',
        'ui/widgets/foo/detailsWidget/scripts/i18next-scanner.config.js',
        'ui/widgets/foo/detailsWidget/src/api/foo.js',
        'ui/widgets/foo/detailsWidget/src/api/helpers.js',
        'ui/widgets/foo/detailsWidget/src/auth/KeycloakContext.js',
        'ui/widgets/foo/detailsWidget/src/auth/KeycloakViews.js',
        'ui/widgets/foo/detailsWidget/src/auth/withKeycloak.js',
        'ui/widgets/foo/detailsWidget/src/components/__mocks__/fooMocks.js',
        'ui/widgets/foo/detailsWidget/src/components/__mocks__/i18n.js',
        'ui/widgets/foo/detailsWidget/src/components/__tests__/FooDetails.test.js',
        'ui/widgets/foo/detailsWidget/src/components/__tests__/FooDetailsContainer.test.js',
        'ui/widgets/foo/detailsWidget/src/components/__types__/foo.js',
        'ui/widgets/foo/detailsWidget/src/components/__types__/keycloak.js',
        'ui/widgets/foo/detailsWidget/src/components/__types__/ref.js',
        'ui/widgets/foo/detailsWidget/src/components/common/Notification.js',
        'ui/widgets/foo/detailsWidget/src/components/foo-field-table/FooFieldTable.js',
        'ui/widgets/foo/detailsWidget/src/components/FooDetails.js',
        'ui/widgets/foo/detailsWidget/src/components/FooDetailsContainer.js',
        'ui/widgets/foo/detailsWidget/src/custom-elements/FooDetailsElement.js',
        'ui/widgets/foo/detailsWidget/src/custom-elements/widgetEventTypes.js',
        'ui/widgets/foo/detailsWidget/src/helpers/widgetEvents.js',
        'ui/widgets/foo/detailsWidget/src/i18n/locales/en.json',
        'ui/widgets/foo/detailsWidget/src/i18n/locales/index.js',
        'ui/widgets/foo/detailsWidget/src/i18n/locales/it.json',
        'ui/widgets/foo/detailsWidget/src/i18n/constants.js',
        'ui/widgets/foo/detailsWidget/src/i18n/i18n.js',
        'ui/widgets/foo/detailsWidget/src/i18n/setLocale.js',
        'ui/widgets/foo/detailsWidget/src/test/cypress/fixtures/users/user.json',
        'ui/widgets/foo/detailsWidget/src/test/cypress/integration/main.spec.js',
        'ui/widgets/foo/detailsWidget/src/test/cypress/plugins/index.js',
        'ui/widgets/foo/detailsWidget/src/test/cypress/support/index.js',
        'ui/widgets/foo/detailsWidget/src/test/cypress/support/keycloak-oauth2.js',
        'ui/widgets/foo/detailsWidget/src/test/cypress/support/selectors.js',
        'ui/widgets/foo/detailsWidget/src/index.js',
        'ui/widgets/foo/detailsWidget/.env.local',
        'ui/widgets/foo/detailsWidget/.env.production',
        'ui/widgets/foo/detailsWidget/.gitignore',
        'ui/widgets/foo/detailsWidget/cypress.json',
        'ui/widgets/foo/detailsWidget/jsconfig.json',
        'ui/widgets/foo/detailsWidget/LICENSE',
        'ui/widgets/foo/detailsWidget/package.json',
        'ui/widgets/foo/detailsWidget/package-lock.json',
        'ui/widgets/foo/detailsWidget/README.md',
      ],
      formWidget: [
        'ui/widgets/foo/formWidget/bundle/foo-form-widget.ftl',
        'ui/widgets/foo/formWidget/bundle/foo-form-widget-descriptor.yaml',
        'ui/widgets/foo/formWidget/public/favicon.ico',
        'ui/widgets/foo/formWidget/public/index.html',
        'ui/widgets/foo/formWidget/public/robots.txt',
        'ui/widgets/foo/formWidget/scripts/i18next-scanner.config.js',
        'ui/widgets/foo/formWidget/src/api/foos.js',
        'ui/widgets/foo/formWidget/src/api/helpers.js',
        'ui/widgets/foo/formWidget/src/auth/KeycloakContext.js',
        'ui/widgets/foo/formWidget/src/auth/KeycloakViews.js',
        'ui/widgets/foo/formWidget/src/auth/withKeycloak.js',
        'ui/widgets/foo/formWidget/src/components/__mocks__/fooMocks.js',
        'ui/widgets/foo/formWidget/src/components/__tests__/FooAddFormContainer.test.js',
        'ui/widgets/foo/formWidget/src/components/__tests__/FooEditFormContainer.test.js',
        'ui/widgets/foo/formWidget/src/components/__tests__/FooForm.test.js',
        'ui/widgets/foo/formWidget/src/components/__types__/foo.js',
        'ui/widgets/foo/formWidget/src/components/__types__/keycloak.js',
        'ui/widgets/foo/formWidget/src/components/__types__/ref.js',
        'ui/widgets/foo/formWidget/src/components/common/ConfirmationDialogTrigger.js',
        'ui/widgets/foo/formWidget/src/components/common/Notification.js',
        'ui/widgets/foo/formWidget/src/components/FooAddFormContainer.js',
        'ui/widgets/foo/formWidget/src/components/FooEditFormContainer.js',
        'ui/widgets/foo/formWidget/src/components/FooForm.js',
        'ui/widgets/foo/formWidget/src/custom-elements/FooFormElement.js',
        'ui/widgets/foo/formWidget/src/custom-elements/widgetEventTypes.js',
        'ui/widgets/foo/formWidget/src/helpers/widgetEvents.js',
        'ui/widgets/foo/formWidget/src/i18n/__mocks__/i18nMock.js',
        'ui/widgets/foo/formWidget/src/i18n/locales/en.json',
        'ui/widgets/foo/formWidget/src/i18n/locales/index.js',
        'ui/widgets/foo/formWidget/src/i18n/locales/it.json',
        'ui/widgets/foo/formWidget/src/i18n/constants.js',
        'ui/widgets/foo/formWidget/src/i18n/dateFnsLocales.js',
        'ui/widgets/foo/formWidget/src/i18n/i18next.js',
        'ui/widgets/foo/formWidget/src/i18n/setLocale.js',
        'ui/widgets/foo/formWidget/src/test/cypress/fixtures/users/user.json',
        'ui/widgets/foo/formWidget/src/test/cypress/integration/main.spec.js',
        'ui/widgets/foo/formWidget/src/test/cypress/plugins/index.js',
        'ui/widgets/foo/formWidget/src/test/cypress/support/index.js',
        'ui/widgets/foo/formWidget/src/test/cypress/support/keycloak-oauth2.js',
        'ui/widgets/foo/detailsWidget/src/test/cypress/support/selectors.js',
        'ui/widgets/foo/formWidget/src/i18n/yup.js',
        'ui/widgets/foo/formWidget/src/index.js',
        'ui/widgets/foo/formWidget/.env.local',
        'ui/widgets/foo/formWidget/.env.production',
        'ui/widgets/foo/formWidget/.gitignore',
        'ui/widgets/foo/formWidget/cypress.json',
        'ui/widgets/foo/formWidget/deploy-widget.sh',
        'ui/widgets/foo/formWidget/jsconfig.json',
        'ui/widgets/foo/formWidget/LICENSE',
        'ui/widgets/foo/formWidget/package.json',
        'ui/widgets/foo/formWidget/package-lock.json',
        'ui/widgets/foo/formWidget/README.md',
      ],
      tableWidget: [
        'ui/widgets/foo/tableWidget/bundle/foo-table-widget.ftl',
        'ui/widgets/foo/tableWidget/bundle/foo-table-widget-descriptor.yaml',
        'ui/widgets/foo/tableWidget/public/favicon.ico',
        'ui/widgets/foo/tableWidget/public/index.html',
        'ui/widgets/foo/tableWidget/public/robots.txt',
        'ui/widgets/foo/tableWidget/scripts/i18next-scanner.config.js',
        'ui/widgets/foo/tableWidget/src/api/foos.js',
        'ui/widgets/foo/tableWidget/src/api/helpers.js',
        'ui/widgets/foo/tableWidget/src/auth/KeycloakContext.js',
        'ui/widgets/foo/tableWidget/src/auth/KeycloakViews.js',
        'ui/widgets/foo/tableWidget/src/auth/withKeycloak.js',
        'ui/widgets/foo/tableWidget/src/components/__mocks__/fooMocks.js',
        'ui/widgets/foo/tableWidget/src/components/__mocks__/i18n.js',
        'ui/widgets/foo/tableWidget/src/components/__tests__/FooTable.test.js',
        'ui/widgets/foo/tableWidget/src/components/__tests__/FooTableContainer.test.js',
        'ui/widgets/foo/tableWidget/src/components/__types__/filter.js',
        'ui/widgets/foo/tableWidget/src/components/__types__/foo.js',
        'ui/widgets/foo/tableWidget/src/components/__types__/keycloak.js',
        'ui/widgets/foo/tableWidget/src/components/__types__/ref.js',
        'ui/widgets/foo/tableWidget/src/components/common/ConfirmationDialogTrigger.js',
        'ui/widgets/foo/tableWidget/src/components/common/Notification.js',
        'ui/widgets/foo/tableWidget/src/components/filters/Filter.js',
        'ui/widgets/foo/tableWidget/src/components/filters/FiltersContainer.js',
        'ui/widgets/foo/tableWidget/src/components/filters/utils.js',
        'ui/widgets/foo/tableWidget/src/components/pagination/PaginationContext.js',
        'ui/widgets/foo/tableWidget/src/components/pagination/PaginationWrapper.js',
        'ui/widgets/foo/tableWidget/src/components/pagination/TablePaginationActions.js',
        'ui/widgets/foo/tableWidget/src/components/pagination/withPagination.js',
        'ui/widgets/foo/tableWidget/src/components/FooTable.js',
        'ui/widgets/foo/tableWidget/src/components/FooTableContainer.js',
        'ui/widgets/foo/tableWidget/src/custom-elements/FooTableElement.js',
        'ui/widgets/foo/tableWidget/src/custom-elements/widgetEventTypes.js',
        'ui/widgets/foo/tableWidget/src/helpers/widgetEvents.js',
        'ui/widgets/foo/tableWidget/src/i18n/__mocks__/i18nMock.js',
        'ui/widgets/foo/tableWidget/src/i18n/locales/en.json',
        'ui/widgets/foo/tableWidget/src/i18n/locales/index.js',
        'ui/widgets/foo/tableWidget/src/i18n/locales/it.json',
        'ui/widgets/foo/tableWidget/src/i18n/constants.js',
        'ui/widgets/foo/tableWidget/src/i18n/i18next.js',
        'ui/widgets/foo/tableWidget/src/i18n/setLocale.js',
        'ui/widgets/foo/formWidget/src/test/cypress/fixtures/users/user.json',
        'ui/widgets/foo/formWidget/src/test/cypress/integration/main.spec.js',
        'ui/widgets/foo/formWidget/src/test/cypress/plugins/index.js',
        'ui/widgets/foo/formWidget/src/test/cypress/support/index.js',
        'ui/widgets/foo/formWidget/src/test/cypress/support/keycloak-oauth2.js',
        'ui/widgets/foo/detailsWidget/src/test/cypress/support/selectors.js',
        'ui/widgets/foo/tableWidget/src/state/filter.types.js',
        'ui/widgets/foo/tableWidget/src/state/foo.reducer.js',
        'ui/widgets/foo/tableWidget/src/state/foo.types.js',
        'ui/widgets/foo/tableWidget/src/index.js',
        'ui/widgets/foo/tableWidget/.env.local',
        'ui/widgets/foo/tableWidget/.env.production',
        'ui/widgets/foo/tableWidget/.gitignore',
        'ui/widgets/foo/tableWidget/cypress.json',
        'ui/widgets/foo/tableWidget/deploy-widget.sh',
        'ui/widgets/foo/tableWidget/jsconfig.json',
        'ui/widgets/foo/tableWidget/LICENSE',
        'ui/widgets/foo/tableWidget/package.json',
        'ui/widgets/foo/tableWidget/README.md',
      ],
    },
  },
  userManagement: [
    `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/domain/Authority.java`,
    `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/domain/User.java`,
    `${SERVER_MAIN_RES_DIR}config/liquibase/data/user.csv`,
    `${SERVER_MAIN_RES_DIR}config/liquibase/data/user_authority.csv`,
    `${SERVER_MAIN_RES_DIR}config/liquibase/data/authority.csv`,
    `${SERVER_MAIN_SRC_DIR}/com/mycompany/myapp/service/UserService.java`,
    `${SERVER_MAIN_SRC_DIR}/com/mycompany/myapp/service/dto/UserDTO.java`,
    `${SERVER_MAIN_SRC_DIR}/com/mycompany/myapp/domain/User.java`,
    `${SERVER_MAIN_SRC_DIR}/com/mycompany/myapp/domain/Authority.java`,
    `${SERVER_MAIN_SRC_DIR}/com/mycompany/myapp/service/mapper/UserMapper.java`,
    `${SERVER_MAIN_SRC_DIR}/com/mycompany/myapp/repository/UserRepository.java`,
    `${SERVER_MAIN_SRC_DIR}/com/mycompany/myapp/repository/AuthorityRepository.java`,
    `${SERVER_MAIN_SRC_DIR}/com/mycompany/myapp/web/rest/UserResource.java`,
    `${SERVER_MAIN_SRC_DIR}/com/mycompany/myapp/web/rest/vm/ManagedUserVM.java`,
    `${SERVER_MAIN_RES_DIR}com/mycompany/myapp/service/UserServiceIT.java`,
    `${SERVER_MAIN_RES_DIR}com/mycompany/myapp/service/mapper/UserMapperTest.java`,
    `${SERVER_MAIN_RES_DIR}com/mycompany/myapp/web/rest/UserResourceIT.java`,
    `${SERVER_MAIN_SRC_DIR}/com/mycompany/myapp/repository/AuthorityRepository.java`,
    `${SERVER_MAIN_SRC_DIR}/com/mycompany/myapp/repository/PersistenceAuditEventRepository.java`,
    `${SERVER_MAIN_SRC_DIR}/com/mycompany/myapp/service/AuditEventService.java`,
    `${SERVER_MAIN_SRC_DIR}/com/mycompany/myapp/web/rest/AuditResource.java`,
    `${SERVER_MAIN_SRC_DIR}/com/mycompany/myapp/repository/CustomAuditEventRepository.java`,
    `${SERVER_MAIN_RES_DIR}com/mycompany/myapp/web/rest/AuditResourceIT.java`,
    `${SERVER_MAIN_RES_DIR}com/mycompany/myapp/repository/CustomAuditEventRepositoryIT.java`,
  ],
};

module.exports = expectedFiles;
