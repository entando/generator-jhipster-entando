const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const EntityServerGenerator = require('generator-jhipster/generators/entity-server');

const { askForMfeGeneration } = require('./phases/prompting/prompts');
const { getMockData } = require('./phases/writing/mfe-test-tools');

const EntandoNeedle = require('./needle-api/needle-server-bundle');
const { serverFiles } = require('./files');
const mfeFileGeneration = require('./lib/create-mfe-template-map.js').generateFiles;

module.exports = class extends EntityServerGenerator {
    constructor(args, opts) {
        super(args, Object.assign({ fromBlueprint: true }, opts)); // fromBlueprint variable is important

        const jhContext = (this.jhipsterContext = this.options.jhipsterContext);

        if (!jhContext) {
            this.error(`This is a JHipster blueprint and should be used only like ${chalk.yellow('jhipster --blueprint entando')}`);
        }

        this.configOptions = jhContext.configOptions || {};
        // This sets up options for this sub generator and is being reused from JHipster
        jhContext.setupClientOptions(this, jhContext);

        if (jhContext.databaseType === 'cassandra') {
            this.pkType = 'UUID';
        }
        const jhipsterConfig = this.getAllJhipsterConfig();
        this.serverPort = jhipsterConfig.serverPort;
        this.generateMicroFrontends = jhipsterConfig.generateMicroFrontends;
    }

    get initializing() {
        // initializing - Your initialization methods (checking current project state, getting configs, etc)
        this.lastMockDataId = 0;
        return super._initializing();
    }

    get prompting() {
        // prompting - Where you prompt users for options (where you’d call this.prompt())
        const jhipsterPromptingPhase = super._prompting();

        const entandoBlueprintPromptingPhase = {
            askForMfeGeneration,
        };

        return { ...jhipsterPromptingPhase, ...entandoBlueprintPromptingPhase };
    }

    get configuring() {
        // configuring - Saving configurations and configure the project (creating .editorconfig files and other metadata files)

        const jhipsterConfiguringPhase = super._configuring();
        const entandoBlueprintConfiguringPhase = {
            addPrettier() {
                if (this.configOptions.generateMfeForEntity) {
                    this.addNpmDevDependency('prettier', '1.19.1');
                    this.addNpmScript('prettier', 'prettier --write "ui/**/*.js"');
                }
            },
        };

        return { ...jhipsterConfiguringPhase, ...entandoBlueprintConfiguringPhase };
    }

    get default() {
        // default - If the method name doesn’t match a priority, it will be pushed to this group.
        return super._default();
    }

    _updateBundleDescriptor() {
        this.entandoNeedleApi = new EntandoNeedle(this);
        this.entandoNeedleApi.addWidgetToDescriptor(this.entityFileName);
        this.entandoNeedleApi.addRolesToDescriptor(this.baseName.toLowerCase(), this.entityFileName);
    }

    get writing() {
        // writing - Where you write the generator specific files (routes, controllers, etc)
        const jhipsterWritingPhase = super._writing();

        const mfeTemplates = path.join(__dirname, 'templates', 'ui', 'widgets');
        const microFrontEndFiles = mfeFileGeneration(mfeTemplates);
        const entandoBlueprintWritingPhase = {
            init() {
                if (this.configOptions.generateMfeForEntity) {
                    this.utils = {
                        getMockEntityData: getMockData,
                    };
                    this.mockData = [getMockData(this.fields), getMockData(this.fields)];
                }
            },
            writeEntityServerFiles() {
                this.writeFilesToDisk(serverFiles, this, false, null);
                if (this.configOptions.generateMfeForEntity) {
                    this.writeFilesToDisk(microFrontEndFiles, this, false, null);
                }
                this._updateBundleDescriptor();
            },
        };
        return { ...jhipsterWritingPhase, ...entandoBlueprintWritingPhase };
    }

    get conflicts() {
        // conflicts - Where conflicts are handled (used internally), no super._conflicts
        return null;
    }

    get install() {
        // install - Where installations are run (npm, bower)

        const jhipsterInstallPhase = super._install();
        const entandoBlueprintInstallPhase = {
            installRootNpmPackages() {
                this.npmInstall();
            },
        };

        return { ...jhipsterInstallPhase, ...entandoBlueprintInstallPhase };
    }

    get end() {
        // end - Called last, cleanup, say good bye, etc
        const jhipsterEndPhase = super._end();
        const entandoBlueprintEndPhase = {
            runPrettier() {
                if (this.configOptions.generateMfeForEntity) {
                    this.spawnCommandSync('npm', ['run', 'prettier']);
                }
            },
        };

        return { ...jhipsterEndPhase, ...entandoBlueprintEndPhase };
    }

    log(msg) {
        console.log(msg); // eslint-disable-line no-console
    }

    fs() {
        return fs;
    }
};
