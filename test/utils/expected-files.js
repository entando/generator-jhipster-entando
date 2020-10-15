const constants = require('generator-jhipster/generators/generator-constants');

const { SERVER_MAIN_RES_DIR } = constants;

const expectedFiles = {
  microservices: [`${SERVER_MAIN_RES_DIR}static/favicon.png`],
  server: [
    'bundle/descriptor.yaml',
    'prepareMicrofrontends.sh',
    'prepareBundle.sh',
    'prepareDockerImage.sh',
    'buildBundle.sh',
  ],
};

module.exports = expectedFiles;
