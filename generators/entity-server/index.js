const fs = require('fs');
const chalk = require('chalk');

const EntityServerGenerator = require('generator-jhipster/generators/entity-server');

const entandoBlueprintPromptingPhase = require('./phases/prompting');
const entandoBlueprintConfiguringPhase = require('./phases/configuring');
const entandoBlueprintWritingPhase = require('./phases/writing');
const entandoBlueprintInstallPhase = require('./phases/install');
const entandoBlueprintEndPhase = require('./phases/end');

module.exports = class extends EntityServerGenerator {
    constructor(args, opts) {
        super(args, Object.assign({ fromBlueprint: true }, opts)); // fromBlueprint variable is important

        const jhContext = (this.jhipsterContext = this.options.jhipsterContext);

        if (!jhContext) {
            this.error(`This is a JHipster blueprint and should be used only like ${chalk.yellow('jhipster --blueprints entando')}`);
        }

        this.configOptions = jhContext.configOptions || {};
        // This sets up options for this sub generator and is being reused from JHipster
        jhContext.setupClientOptions(this, jhContext);

        if (jhContext.databaseType === 'cassandra') {
            this.pkType = 'UUID';
        }
        const jhipsterConfig = this.getAllJhipsterConfig();
        this.serverPort = jhipsterConfig.serverPort;
    }


    get initializing() {
        // initializing - Your initialization methods (checking current project state, getting configs, etc)

        return super._initializing();
    }

    get prompting() {
        // prompting - Where you prompt users for options (where you’d call this.prompt())
        const jhipsterPromptingPhase = super._prompting();

        return { ...jhipsterPromptingPhase, ...entandoBlueprintPromptingPhase };
    }

    get configuring() {
        // configuring - Saving configurations and configure the project (creating .editorconfig files and other metadata files)
        const jhipsterConfiguringPhase = super._configuring();

        return { ...jhipsterConfiguringPhase, ...entandoBlueprintConfiguringPhase };
    }

    get default() {
        // default - If the method name doesn’t match a priority, it will be pushed to this group.
        return super._default();
    }

    get writing() {
        // writing - Where you write the generator specific files (routes, controllers, etc)
        const jhipsterWritingPhase = super._writing();

        return { ...jhipsterWritingPhase, ...entandoBlueprintWritingPhase };
    }

    get conflicts() {
        // conflicts - Where conflicts are handled (used internally), no super._conflicts
        return null;
    }

    get install() {
        // install - Where installations are run (npm, bower)
        const jhipsterInstallPhase = super._install();

        return { ...jhipsterInstallPhase, ...entandoBlueprintInstallPhase };
    }

    get end() {
        // end - Called last, cleanup, say good bye, etc
        const jhipsterEndPhase = super._end();

        return { ...jhipsterEndPhase, ...entandoBlueprintEndPhase };
    }

    log(msg) {
        console.log(msg); // eslint-disable-line no-console
    }

    fs() {
        return fs;
    }
};
