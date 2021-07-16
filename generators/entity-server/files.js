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
const { CASSANDRA, COUCHBASE, MONGODB, NEO4J, SQL } = require('generator-jhipster/jdl/jhipster/database-types');
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
  dbChangelog: [
    {
      condition: generator => generator.databaseType === CASSANDRA && !generator.skipDbChangelog,
      path: SERVER_MAIN_RES_DIR,
      templates: [
        {
          file: 'config/cql/changelog/added_entity.cql',
          renameTo: generator =>
            `config/cql/changelog/${generator.changelogDate}_added_entity_${generator.entityClass}.cql`,
        },
      ],
    },
    {
      condition: generator => generator.searchEngine === COUCHBASE && !generator.skipDbChangelog,
      path: SERVER_MAIN_RES_DIR,
      templates: [
        {
          file: 'config/couchmove/changelog/entity.fts',
          renameTo: generator =>
            `config/couchmove/changelog/V${
              generator.changelogDate
            }__${generator.entityInstance.toLowerCase()}.fts`,
        },
      ],
    },
  ],
  server: [
    {
      path: SERVER_MAIN_SRC_DIR,
      templates: [
        {
          file: 'package/domain/Entity.java',
          renameTo: generator =>
            `${generator.packageFolder}/domain/${generator.asEntity(generator.entityClass)}.java`,
        },
      ],
    },
    {
      condition: generator => !generator.embedded,
      path: SERVER_MAIN_SRC_DIR,
      templates: [
        {
          file: 'package/web/rest/EntityResource.java',
          renameTo: generator => `${generator.packageFolder}/web/rest/${generator.entityClass}Resource.java`,
        },
      ],
    },
    {
      condition: generator => generator.jpaMetamodelFiltering,
      path: SERVER_MAIN_SRC_DIR,
      templates: [
        {
          file: 'package/service/criteria/EntityCriteria.java',
          renameTo: generator =>
            `${generator.packageFolder}/service/criteria/${generator.entityClass}Criteria.java`,
        },
        {
          file: 'package/service/EntityQueryService.java',
          renameTo: generator =>
            `${generator.packageFolder}/service/${generator.entityClass}QueryService.java`,
        },
      ],
    },
    {
      condition: generator => generator.searchEngine === ELASTICSEARCH && !generator.embedded,
      path: SERVER_MAIN_SRC_DIR,
      templates: [
        {
          file: 'package/repository/search/EntitySearchRepository.java',
          renameTo: generator =>
            `${generator.packageFolder}/repository/search/${generator.entityClass}SearchRepository.java`,
        },
      ],
    },
    {
      condition: generator => !generator.reactive && !generator.embedded,
      path: SERVER_MAIN_SRC_DIR,
      templates: [
        {
          file: 'package/repository/EntityRepository.java',
          renameTo: generator =>
            `${generator.packageFolder}/repository/${generator.entityClass}Repository.java`,
        },
      ],
    },
    {
      condition: generator => generator.reactive && !generator.embedded,
      path: SERVER_MAIN_SRC_DIR,
      templates: [
        {
          file: 'package/repository/EntityRepository_reactive.java',
          renameTo: generator =>
            `${generator.packageFolder}/repository/${generator.entityClass}Repository.java`,
        },
      ],
    },
    {
      condition: generator => generator.reactive && generator.databaseType === SQL && !generator.embedded,
      path: SERVER_MAIN_SRC_DIR,
      templates: [
        {
          file: 'package/repository/EntityRepositoryInternalImpl_reactive.java',
          renameTo: generator =>
            `${generator.packageFolder}/repository/${generator.entityClass}RepositoryInternalImpl.java`,
        },
        {
          file: 'package/repository/rowmapper/EntityRowMapper.java',
          renameTo: generator =>
            `${generator.packageFolder}/repository/rowmapper/${generator.entityClass}RowMapper.java`,
        },
      ],
    },
    {
      condition: generator => generator.service === SERVICE_IMPL && !generator.embedded,
      path: SERVER_MAIN_SRC_DIR,
      templates: [
        {
          file: 'package/service/EntityService.java',
          renameTo: generator => `${generator.packageFolder}/service/${generator.entityClass}Service.java`,
        },
        {
          file: 'package/service/impl/EntityServiceImpl.java',
          renameTo: generator =>
            `${generator.packageFolder}/service/impl/${generator.entityClass}ServiceImpl.java`,
        },
      ],
    },
    {
      condition: generator => generator.service === SERVICE_CLASS && !generator.embedded,
      path: SERVER_MAIN_SRC_DIR,
      templates: [
        {
          file: 'package/service/impl/EntityServiceImpl.java',
          renameTo: generator => `${generator.packageFolder}/service/${generator.entityClass}Service.java`,
        },
      ],
    },
    {
      condition: generator => generator.dto === MAPSTRUCT,
      path: SERVER_MAIN_SRC_DIR,
      templates: [
        {
          file: 'package/service/dto/EntityDTO.java',
          renameTo: generator =>
            `${generator.packageFolder}/service/dto/${generator.asDto(generator.entityClass)}.java`,
        },
        {
          file: 'package/service/mapper/BaseEntityMapper.java',
          renameTo: generator => `${generator.packageFolder}/service/mapper/EntityMapper.java`,
        },
        {
          file: 'package/service/mapper/EntityMapper.java',
          renameTo: generator =>
            `${generator.packageFolder}/service/mapper/${generator.entityClass}Mapper.java`,
        },
      ],
    },
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
    {
      condition: generator => generator.searchEngine === ELASTICSEARCH && !generator.embedded,
      path: SERVER_TEST_SRC_DIR,
      templates: [
        {
          file: 'package/repository/search/EntitySearchRepositoryMockConfiguration.java',
          renameTo: generator =>
            `${generator.packageFolder}/repository/search/${generator.entityClass}SearchRepositoryMockConfiguration.java`,
        },
      ],
    },
    {
      condition: generator => generator.gatlingTests,
      path: TEST_DIR,
      templates: [
        {
          file: 'gatling/user-files/simulations/EntityGatlingTest.scala',
          options: { interpolate: INTERPOLATE_REGEX },
          renameTo: generator => `gatling/user-files/simulations/${generator.entityClass}GatlingTest.scala`,
        },
      ],
    },
    {
      path: SERVER_TEST_SRC_DIR,
      templates: [
        {
          file: 'package/domain/EntityTest.java',
          renameTo: generator =>
            `${generator.packageFolder}/domain/${generator.asEntity(generator.entityClass)}Test.java`,
        },
      ],
    },
    {
      condition: generator => generator.dto === MAPSTRUCT,
      path: SERVER_TEST_SRC_DIR,
      templates: [
        {
          file: 'package/service/dto/EntityDTOTest.java',
          renameTo: generator =>
            `${generator.packageFolder}/service/dto/${generator.asDto(generator.entityClass)}Test.java`,
        },
      ],
    },
    {
      condition: generator =>
        generator.dto === MAPSTRUCT && [SQL, MONGODB, COUCHBASE, NEO4J].includes(generator.databaseType),
      path: SERVER_TEST_SRC_DIR,
      templates: [
        {
          file: 'package/service/mapper/EntityMapperTest.java',
          renameTo: generator =>
            `${generator.packageFolder}/service/mapper/${generator.entityClass}MapperTest.java`,
        },
      ],
    },
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
/*
function writeFiles() {
  return {
    writeEntandoFiles() {
      this.writeFilesToDisk(serverFiles, this, false, null);
    },
  };
}

module.exports = {
  serverFiles,
  writeFiles,
};
*/

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
