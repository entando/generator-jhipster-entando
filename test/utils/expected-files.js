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
    `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/config/SpringFoxConfiguration.java`,
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
  },
};

module.exports = expectedFiles;
