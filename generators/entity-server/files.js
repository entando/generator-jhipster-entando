const constants = require('generator-jhipster/generators/generator-constants');

const { SERVER_MAIN_SRC_DIR } = constants;

const serverFiles = {
  server: [
    {
      path: SERVER_MAIN_SRC_DIR,
      templates: [
        {
          file: 'package/web/rest/schema/EntitySchemaResource.java',
          renameTo: generator =>
            `${generator.packageFolder}/web/rest/schema/${generator.entityClass}SchemaResource.java`,
          useBluePrint: true,
        },
      ],
    },
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
};

module.exports = {
  serverFiles,
};
