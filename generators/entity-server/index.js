/* eslint-disable no-console */
/* eslint-disable consistent-return */
const _ = require('lodash');
const util = require('util');
const chalk = require('chalk');
const constants = require('generator-jhipster/generators/generator-constants');
const EntityServerGenerator = require('generator-jhipster/generators/entity-server');
const baseServerFiles = require('generator-jhipster/generators/entity-server/files').serverFiles;

const SERVER_MAIN_SRC_DIR = constants.SERVER_MAIN_SRC_DIR;

const serverFiles = {
    ...baseServerFiles,
    server: [
        ...baseServerFiles.server,
        {
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                {
                    file: 'package/web/rest/EntityConfigFormResource.java',
                    renameTo: generator => `${generator.packageFolder}/web/rest/${generator.entityClass}ConfigFormResource.java`,
                    useBluePrint: true
                }
            ]
        }
    ]
};

function consoleFull(obj) {
    console.log(util.inspect(obj, true, null, true));
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

module.exports = class extends EntityServerGenerator {
    constructor(args, opts) {
        super(args, Object.assign({ fromBlueprint: true }, opts)); // fromBlueprint variable is important

        const jhContext = (this.jhipsterContext = this.options.jhipsterContext);

        if (!jhContext) {
            this.error(`This is a JHipster blueprint and should be used only like ${chalk.yellow('jhipster --blueprint entando')}`);
        }

        this.configOptions = jhContext.configOptions || {};
        if (jhContext.databaseType === 'cassandra') {
            this.pkType = 'UUID';
        }
    }

    _writing() {
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
                // consoleFull(serverFiles);
                const returnFiles = false;
                const returnedFiles = writeFilesToDisk(
                    serverFiles,
                    this,
                    returnFiles,
                    this.fetchFromInstalledJHipster('entity-server/templates')
                );

                if (this.databaseType === 'sql') {
                    if (this.fieldsContainOwnerManyToMany || this.fieldsContainOwnerOneToOne || this.fieldsContainManyToOne) {
                        this.addConstraintsChangelogToLiquibase(`${this.changelogDate}_added_entity_constraints_${this.entityClass}`);
                    }
                    this.addChangelogToLiquibase(`${this.changelogDate}_added_entity_${this.entityClass}`);
                }
            }
        };
    }

    get writing() {
        return this._writing();
    }
};
