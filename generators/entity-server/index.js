/* eslint-disable no-console */
/* eslint-disable consistent-return */
const fs = require('fs');
const chalk = require('chalk');
const casual = require('casual');
const EntityServerGenerator = require('generator-jhipster/generators/entity-server');
const EntandoNeedle = require('./needle-api/needle-server-bundle');
const serverFiles = require('./files').serverFiles;
const microFrontEndFiles = require('./files').microFrontEndFiles;

module.exports = class extends EntityServerGenerator {
    constructor(args, opts) {
        super(args, Object.assign({ fromBlueprint: true }, opts)); // fromBlueprint variable is important

        this.jhContext = this.jhipsterContext = this.options.jhipsterContext;

        if (!this.jhContext) {
            this.error(`This is a JHipster blueprint and should be used only like ${chalk.yellow('jhipster --blueprint entando')}`);
        }

        this.configOptions = this.jhContext.configOptions || {};
        if (this.jhContext.databaseType === 'cassandra') {
            this.pkType = 'UUID';
        }
    }

    get initializing() {
        // initializing - Your initialization methods (checking current project state, getting configs, etc)
        this.lastMockDataId = 0;
        return super._initializing();
    }

    async prompting() {
        // prompting - Where you prompt users for options (where you’d call this.prompt())
        return super._prompting();
    }

    get configuring() {
        // configuring - Saving configurations and configure the project (creating .editorconfig files and other metadata files)
        return super._configuring();
    }

    get default() {
        // default - If the method name doesn’t match a priority, it will be pushed to this group.
        return super._default();
    }

    _getMockData(fields) {
        function getFieldType({ fieldType, fieldIsEnum, fieldTypeBlobContent }) {
            if (
                ['String', 'Integer', 'Long', 'Float', 'Double', 'BigDecimal', 'LocalDate', 'Instant', 'ZonedDateTime', 'Boolean'].includes(
                    fieldType
                )
            ) {
                return fieldType;
            }

            // Eunmerations
            if (fieldIsEnum) {
                return 'Enum';
            }

            // Blobs
            if (fieldType === 'byte[]' && fieldTypeBlobContent) {
                if (fieldTypeBlobContent === 'image') {
                    return 'ImageBlob';
                }
                if (fieldTypeBlobContent === 'any') {
                    return 'BinaryFileBlob';
                }
                if (fieldTypeBlobContent === 'text') {
                    return 'TextBlob';
                }
            }
        }

        function getGeneratedValue(fieldType, { fieldValues }) {
            switch (fieldType) {
                case 'String':
                    return casual.text;
                case 'Integer':
                    return casual.integer();
                case 'Long':
                    return casual.integer();
                case 'Float':
                    return casual.random;
                case 'Double':
                    return casual.double();
                case 'BigDecimal':
                    return casual.integer();
                case 'LocalDate':
                    return casual.date('YYYY-MM-DD');
                case 'Instant':
                case 'ZonedDateTime':
                    return casual.moment.format();
                case 'Boolean':
                    return casual.coin_flip;
                case 'Enum': {
                    const enumValues = fieldValues.split(',');
                    return enumValues[Math.floor(Math.random() * enumValues.length)];
                }
                case 'ImageBlob':
                case 'BinaryFileBlob':
                case 'TextBlob':
                    return 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=';
                default:
                    return casual.text;
            }
        }

        const generatedData = fields.reduce(
            (acc, field) => {
                const fieldType = getFieldType(field);
                const fieldValue = getGeneratedValue(fieldType, field);
                return { ...acc, [field.fieldName]: fieldValue };
            },
            { id: this.lastMockDataId }
        );
        this.lastMockDataId = this.lastMockDataId + 1;
        return generatedData;
    }

    updateBundleDescriptor() {
        this.entandoNeedleApi = new EntandoNeedle(this);
        this.entandoNeedleApi.addWidgetToDescriptor(this.entityFileName);
        this.entandoNeedleApi.addRolesToDescriptor(this.entityFileName);
    }

    get writing() {
        // writing - Where you write the generator specific files (routes, controllers, etc)
        const jhipsterPhase = super._writing();
        const myCustomSteps = {
            init() {
                this.utils = {
                    getMockEntityData: this._getMockData,
                };
                this.mockData = [
                    this._getMockData(this.fields),
                    this._getMockData(this.fields),
                ];
            },
            writeEntityServerFiles() {
                this.writeFilesToDisk(serverFiles, this, false, null);
                this.writeFilesToDisk(microFrontEndFiles, this, false, null);
                this.updateBundleDescriptor();
            },
        };
        return { ...jhipsterPhase, ...myCustomSteps };
    }

    get conflicts() {
        // conflicts - Where conflicts are handled (used internally), no super._conflicts
        return null;
    }

    get install() {
        // install - Where installations are run (npm, bower)
        return super._install();
    }

    get end() {
        // end - Called last, cleanup, say good bye, etc
        return super._end();
    }

    log(msg) {
        console.log(msg)
    }

    fs() {
        return fs;
    }
};
