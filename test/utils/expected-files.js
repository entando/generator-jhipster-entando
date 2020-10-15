const constants = require('generator-jhipster/generators/generator-constants');

const { SERVER_MAIN_RES_DIR, SERVER_MAIN_SRC_DIR } = constants;

const expectedFiles = {
  microservices: [`${SERVER_MAIN_RES_DIR}static/favicon.png`],
  server: [
    'bundle/descriptor.yaml',
    'prepareMicrofrontends.sh',
    'prepareBundle.sh',
    'prepareDockerImage.sh',
    'buildBundle.sh',
    `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/config/SpringFoxConfiguration.java`,
  ],
};

module.exports = expectedFiles;
