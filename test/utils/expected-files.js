const constants = require('generator-jhipster/generators/generator-constants');

const { SERVER_MAIN_SRC_RES, SERVER_MAIN_SRC_DIR } = constants;

const expectedFiles = {
  server: [
    `${SERVER_MAIN_SRC_RES}config/application.yml`,
    `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/client/EntandoAuthClient.java`,
    `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/config/EntandoPluginConfig.java`,
    `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/config/EntandoPluginConfigManager.java`,
    `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/config/ConfigServiceConfiguration.java`,
    `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/config/EntandoProperties.java`,
    `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/EntandoPluginApp.java`,
    `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/web/rest/schema/EntandoPluginConfigSchemaResource.java`,
  ],
};

module.exports = expectedFiles;
