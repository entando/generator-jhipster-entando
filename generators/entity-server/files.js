/**
 * Copyright 2013-2021 the original author or authors from the JHipster project.
 *
 * This file is part of the JHipster project, see https://www.jhipster.tech/
 * for more information.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const _ = require('lodash');
const chalk = require('chalk');
const fs = require('fs');
const utils = require('generator-jhipster/utils');
const constants = require('generator-jhipster/generators/generator-constants');
const {
  CASSANDRA,
  COUCHBASE,
  MONGODB,
  NEO4J,
  SQL,
} = require('generator-jhipster/jdl/jhipster/database-types');
const { ELASTICSEARCH } = require('generator-jhipster/jdl/jhipster/search-engine-types');
const { MapperTypes, ServiceTypes } = require('generator-jhipster/jdl/jhipster/entity-options');
const { EHCACHE, CAFFEINE, INFINISPAN, REDIS } = require('generator-jhipster/jdl/jhipster/cache-types');

const { MAPSTRUCT } = MapperTypes;
const { SERVICE_CLASS, SERVICE_IMPL } = ServiceTypes;

/* Constants use throughout */
const { INTERPOLATE_REGEX } = constants;
const { SERVER_MAIN_SRC_DIR } = constants;
const { SERVER_MAIN_RES_DIR } = constants;
const { TEST_DIR } = constants;
const { SERVER_TEST_SRC_DIR } = constants;

/**
 * The default is to use a file path string. It implies use of the template method.
 * For any other config an object { file:.., method:.., template:.. } can be used
 */
const serverFiles = {
  server: [
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
      condition: generator => !generator.embedded,
      path: SERVER_TEST_SRC_DIR,
      templates: [
        {
          file: 'package/web/rest/EntityResourceIT.java',
          options: {
            context: {
              _,
              chalkRed: chalk.red,
              fs,
              SERVER_TEST_SRC_DIR,
            },
          },
          renameTo: generator =>
            `${generator.packageFolder}/web/rest/${generator.entityClass}ResourceIT.java`,
        },
      ],
    },
  ],
};

function writeFiles() {
  return {
    writeEntandoFiles() {
      if (this.skipServer) return undefined;

      // write server side files
      if (this.reactive) {
        return this.writeFilesToDisk(serverFiles, ['reactive', '']);
      }
      return this.writeFilesToDisk(serverFiles);
    },

    writeEnumFiles() {
      this.fields.forEach(field => {
        if (!field.fieldIsEnum) {
          return;
        }
        const { fieldType } = field;
        const enumInfo = {
          ...utils.getEnumInfo(field, this.clientRootFolder),
          frontendAppName: this.frontendAppName,
          packageName: this.packageName,
        };
        // eslint-disable-next-line no-console
        if (!this.skipServer) {
          const pathToTemplateFile = `${this.fetchFromInstalledJHipster(
            'entity-server/templates',
          )}/${SERVER_MAIN_SRC_DIR}package/domain/enumeration/Enum.java.ejs`;
          this.template(
            pathToTemplateFile,
            `${SERVER_MAIN_SRC_DIR}${this.packageFolder}/domain/enumeration/${fieldType}.java`,
            this,
            {},
            enumInfo,
          );
        }
      });
    },
  };
}

function customizeFiles() {
  if (this.databaseType === SQL) {
    if ([EHCACHE, CAFFEINE, INFINISPAN, REDIS].includes(this.cacheProvider) && this.enableHibernateCache) {
      this.addEntityToCache(
        this.asEntity(this.entityClass),
        this.relationships,
        this.packageName,
        this.packageFolder,
        this.cacheProvider,
      );
    }
  }
}

module.exports = {
  writeFiles,
  serverFiles,
  customizeFiles,
};
