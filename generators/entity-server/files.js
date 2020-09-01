const constants = require('generator-jhipster/generators/generator-constants');
const chalk = require('chalk');
const fs = require('fs');

const { SERVER_MAIN_SRC_DIR, SERVER_TEST_SRC_DIR } = constants;

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
        },
        {
          file: 'package/web/rest/NoDbEntityResourceIT.java',
          options: {
            context: {
              _,
              chalkRed: chalk.red,
              fs,
              SERVER_TEST_SRC_DIR,
            },
          },
          renameTo: generator =>
            `${generator.packageFolder}/web/rest/NoDb${generator.entityClass}ResourceIT.java`,
        },
      ],
    },
  ],
};

module.exports = {
  serverFiles,
};
