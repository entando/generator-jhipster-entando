/**
 * Copyright 2013-2019 the original author or authors from the JHipster project.
 *
 * This file is part of the JHipster project, see https://www.jhipster.tech/
 * for more information.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const _ = require('lodash');
const randexp = require('randexp');
const chalk = require('chalk');
const fs = require('fs');
const utils = require('generator-jhipster/generators/utils');
const constants = require('generator-jhipster/generators/generator-constants');

/* Constants use throughout */
const INTERPOLATE_REGEX = constants.INTERPOLATE_REGEX;
const SERVER_MAIN_SRC_DIR = constants.SERVER_MAIN_SRC_DIR;
const SERVER_MAIN_RES_DIR = constants.SERVER_MAIN_RES_DIR;
const TEST_DIR = constants.TEST_DIR;
const SERVER_TEST_SRC_DIR = constants.SERVER_TEST_SRC_DIR;

/**
 * The default is to use a file path string. It implies use of the template method.
 * For any other config an object { file:.., method:.., template:.. } can be used
 */
const serverFiles = {
    db: [
        {
            useBluePrint: true,
            condition: generator => generator.databaseType === 'sql',
            path: SERVER_MAIN_RES_DIR,
            templates: [
                {
                    file: 'config/liquibase/changelog/added_entity.xml',
                    options: { interpolate: INTERPOLATE_REGEX },
                    renameTo: generator => `config/liquibase/changelog/${generator.changelogDate}_added_entity_${generator.entityClass}.xml`
                }
            ]
        },
        {
            useBluePrint: true,
            condition: generator =>
                generator.databaseType === 'sql' &&
                (generator.fieldsContainOwnerManyToMany || generator.fieldsContainOwnerOneToOne || generator.fieldsContainManyToOne),
            path: SERVER_MAIN_RES_DIR,
            templates: [
                {
                    file: 'config/liquibase/changelog/added_entity_constraints.xml',
                    options: { interpolate: INTERPOLATE_REGEX },
                    renameTo: generator =>
                        `config/liquibase/changelog/${generator.changelogDate}_added_entity_constraints_${generator.entityClass}.xml`
                }
            ]
        },
        {
            useBluePrint: true,
            condition: generator => generator.databaseType === 'cassandra',
            path: SERVER_MAIN_RES_DIR,
            templates: [
                {
                    file: 'config/cql/changelog/added_entity.cql',
                    renameTo: generator => `config/cql/changelog/${generator.changelogDate}_added_entity_${generator.entityClass}.cql`
                }
            ]
        }
    ],
    server: [
        {
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                {
                    useBluePrint: true,
                    file: 'package/domain/Entity.java',
                    renameTo: generator => `${generator.packageFolder}/domain/${generator.asEntity(generator.entityClass)}.java`
                }
            ]
        },
        {
            condition: generator => !generator.getAllJhipsterConfig().useSpringDataRest,
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                {
                    useBluePrint: true,
                    condition: generator => !generator.getAllJhipsterConfig().useSpringDataRest,
                    file: 'package/repository/EntityRepository.java',
                    renameTo: generator => `${generator.packageFolder}/repository/${generator.entityClass}Repository.java`
                },
                {
                    useBluePrint: true,
                    condition: generator => !generator.getAllJhipsterConfig().useSpringDataRest,
                    file: 'package/web/rest/EntityResource.java',
                    renameTo: generator => `${generator.packageFolder}/web/rest/${generator.entityClass}Resource.java`
                },
                {
                    useBluePrint: true,
                    file: 'package/web/rest/EntityConfigFormResource.java',
                    renameTo: generator =>
                        `${generator.packageFolder}/web/rest/${generator.entityClass.toLowerCase()}/${
                            generator.entityClass
                        }ConfigFormResource.java`
                }
            ]
        },
        {
            condition: generator => generator.getAllJhipsterConfig().useSpringDataRest,
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                {
                    useBluePrint: true,
                    file: 'package/repository/RestEntityRepository.java',
                    renameTo: generator => `${generator.packageFolder}/repository/Rest${generator.entityClass}Repository.java`
                }
            ]
        },
        {
            condition: generator => generator.jpaMetamodelFiltering,
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                {
                    useBluePrint: true,
                    file: 'package/service/dto/EntityCriteria.java',
                    renameTo: generator => `${generator.packageFolder}/service/dto/${generator.entityClass}Criteria.java`
                },
                {
                    useBluePrint: true,
                    file: 'package/service/EntityQueryService.java',
                    renameTo: generator => `${generator.packageFolder}/service/${generator.entityClass}QueryService.java`
                }
            ]
        },
        {
            condition: generator => generator.searchEngine === 'elasticsearch',
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                {
                    useBluePrint: true,
                    file: 'package/repository/search/EntitySearchRepository.java',
                    renameTo: generator => `${generator.packageFolder}/repository/search/${generator.entityClass}SearchRepository.java`
                }
            ]
        },
        {
            condition: generator => generator.reactive && ['mongodb', 'cassandra', 'couchbase'].includes(generator.databaseType),
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                {
                    useBluePrint: true,
                    file: 'package/repository/reactive/EntityReactiveRepository.java',
                    renameTo: generator => `${generator.packageFolder}/repository/reactive/${generator.entityClass}ReactiveRepository.java`
                }
            ]
        },
        {
            condition: generator => generator.service === 'serviceImpl',
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                {
                    useBluePrint: true,
                    file: 'package/service/EntityService.java',
                    renameTo: generator => `${generator.packageFolder}/service/${generator.entityClass}Service.java`
                },
                {
                    useBluePrint: true,
                    file: 'package/service/impl/EntityServiceImpl.java',
                    renameTo: generator => `${generator.packageFolder}/service/impl/${generator.entityClass}ServiceImpl.java`
                }
            ]
        },
        {
            condition: generator => generator.service === 'serviceClass',
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                {
                    useBluePrint: true,
                    file: 'package/service/impl/EntityServiceImpl.java',
                    renameTo: generator => `${generator.packageFolder}/service/${generator.entityClass}Service.java`
                }
            ]
        },
        {
            condition: generator => generator.dto === 'mapstruct',
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                {
                    useBluePrint: true,
                    file: 'package/service/dto/EntityDTO.java',
                    renameTo: generator => `${generator.packageFolder}/service/dto/${generator.asDto(generator.entityClass)}.java`
                },
                {
                    useBluePrint: true,
                    file: 'package/service/mapper/BaseEntityMapper.java',
                    renameTo: generator => `${generator.packageFolder}/service/mapper/EntityMapper.java`
                },
                {
                    useBluePrint: true,
                    file: 'package/service/mapper/EntityMapper.java',
                    renameTo: generator => `${generator.packageFolder}/service/mapper/${generator.entityClass}Mapper.java`
                }
            ]
        }
    ],
    test: [
        {
            // TODO: add test for reactive
            condition: generator => !generator.reactive && !generator.getAllJhipsterConfig().useSpringDataRest,
            path: SERVER_TEST_SRC_DIR,
            templates: [
                {
                    useBluePrint: true,
                    file: 'package/web/rest/EntityResourceIntTest.java',
                    options: {
                        context: {
                            randexp,
                            _,
                            chalkRed: chalk.red,
                            fs,
                            SERVER_TEST_SRC_DIR
                        }
                    },
                    renameTo: generator => `${generator.packageFolder}/web/rest/${generator.entityClass}ResourceIntTest.java`
                }
            ]
        },
        {
            condition: generator => generator.searchEngine === 'elasticsearch',
            path: SERVER_TEST_SRC_DIR,
            templates: [
                {
                    useBluePrint: true,
                    file: 'package/repository/search/EntitySearchRepositoryMockConfiguration.java',
                    renameTo: generator =>
                        `${generator.packageFolder}/repository/search/${generator.entityClass}SearchRepositoryMockConfiguration.java`
                }
            ]
        },
        {
            condition: generator => generator.gatlingTests,
            path: TEST_DIR,
            templates: [
                {
                    useBluePrint: true,
                    file: 'gatling/user-files/simulations/EntityGatlingTest.scala',
                    options: { interpolate: INTERPOLATE_REGEX },
                    renameTo: generator => `gatling/user-files/simulations/${generator.entityClass}GatlingTest.scala`
                }
            ]
        }
    ]
};

module.exports = {
    writeFiles,
    serverFiles,
    writeFilesToDisk
};

function writeFiles() {
    return {
        saveRemoteEntityPath() {
            if (_.isUndefined(this.microservicePath)) {
                return;
            }
            this.copy(
                `${this.microservicePath}/${this.jhipsterConfigDirectory}/${this.entityNameCapitalized}.json`,
                this.destinationPath(`${this.jhipsterConfigDirectory}/${this.entityNameCapitalized}.json`)
            );
        },

        writeServerFiles() {
            if (this.skipServer) return;

            // write server side files
            writeFilesToDisk(serverFiles, this, false, this.fetchFromInstalledJHipster('entity-server/templates'));

            if (this.databaseType === 'sql') {
                if (this.fieldsContainOwnerManyToMany || this.fieldsContainOwnerOneToOne || this.fieldsContainManyToOne) {
                    this.addConstraintsChangelogToLiquibase(`${this.changelogDate}_added_entity_constraints_${this.entityClass}`);
                }
                this.addChangelogToLiquibase(`${this.changelogDate}_added_entity_${this.entityClass}`);

                if (['ehcache', 'infinispan'].includes(this.cacheProvider) && this.enableHibernateCache) {
                    this.addEntityToCache(
                        this.asEntity(this.entityClass),
                        this.relationships,
                        this.packageName,
                        this.packageFolder,
                        this.cacheProvider
                    );
                }
            }
        },

        writeEnumFiles() {
            this.fields.forEach(field => {
                if (field.fieldIsEnum === true) {
                    const fieldType = field.fieldType;
                    const enumInfo = utils.buildEnumInfo(field, this.angularAppName, this.packageName, this.clientRootFolder);
                    if (!this.skipServer) {
                        this.template(
                            `${this.fetchFromInstalledJHipster(
                                'entity-server/templates'
                            )}/${SERVER_MAIN_SRC_DIR}package/domain/enumeration/Enum.java.ejs`,
                            `${SERVER_MAIN_SRC_DIR}${this.packageFolder}/domain/enumeration/${fieldType}.java`,
                            this,
                            {},
                            enumInfo
                        );
                    }
                }
            });
        }
    };
}

/**
 * write the given files using provided config.
 *
 * @param {object} files - files to write
 * @param {object} generator - the generator instance to use
 * @param {boolean} returnFiles - weather to return the generated file list or to write them
 * @param {string} prefix - prefix to add in the path
 */
function writeFilesToDisk(files, generator, returnFiles, prefix) {
    const _this = generator || this;
    const filesOut = [];
    const startTime = new Date();
    // using the fastest method for iterations
    for (let i = 0, blocks = Object.keys(files); i < blocks.length; i++) {
        for (let j = 0, blockTemplates = files[blocks[i]]; j < blockTemplates.length; j++) {
            const blockTemplate = blockTemplates[j];
            if (!blockTemplate.condition || blockTemplate.condition(_this)) {
                const path = blockTemplate.path || '';
                blockTemplate.templates.forEach(templateObj => {
                    let templatePath = path;
                    let method = 'template';
                    let useTemplate = false;
                    let options = {};
                    let templatePathTo;
                    if (typeof templateObj === 'string') {
                        templatePath += templateObj;
                    } else {
                        if (typeof templateObj.file === 'string') {
                            templatePath += templateObj.file;
                        } else if (typeof templateObj.file === 'function') {
                            templatePath += templateObj.file(_this);
                        }
                        method = templateObj.method ? templateObj.method : method;
                        useTemplate = templateObj.template ? templateObj.template : useTemplate;
                        options = templateObj.options ? templateObj.options : options;
                    }
                    if (templateObj && templateObj.renameTo) {
                        templatePathTo = path + templateObj.renameTo(_this);
                    } else {
                        // remove the .ejs suffix
                        templatePathTo = templatePath.replace('.ejs', '');
                    }
                    filesOut.push(templatePathTo);
                    if (!returnFiles) {
                        let templatePathFrom = prefix ? `${prefix}/${templatePath}` : templatePath;

                        if (templateObj.useBluePrint) {
                            templatePathFrom = templatePath;
                        }
                        if (
                            !templateObj.noEjs &&
                            !templatePathFrom.endsWith('.png') &&
                            !templatePathFrom.endsWith('.jpg') &&
                            !templatePathFrom.endsWith('.gif') &&
                            !templatePathFrom.endsWith('.svg') &&
                            !templatePathFrom.endsWith('.ico')
                        ) {
                            templatePathFrom = `${templatePathFrom}.ejs`;
                        }
                        // if (method === 'template')
                        _this[method](templatePathFrom, templatePathTo, _this, options, useTemplate);
                    }
                });
            }
        }
    }
    _this.debug(`Time taken to write files: ${new Date() - startTime}ms`);
    return filesOut;
}
