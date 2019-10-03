/* eslint-disable no-console */
/* eslint-disable consistent-return */
const chalk = require('chalk');
const EntityServerGenerator = require('generator-jhipster/generators/entity-server');
const serverFiles = require('./files').serverFiles;
const microFrontEndFiles = require('./files').microFrontEndFiles;

console.log('entity-server/index.js');

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

    get initializing() {
        // initializing - Your initialization methods (checking current project state, getting configs, etc)
        console.log('entity-server/index.js initializing()}');

        return super._initializing();
    }

    async prompting() {
        // prompting - Where you prompt users for options (where you’d call this.prompt())
        console.log('entity-server/index.js prompting()');
        // this.answers = await this.prompt([
        //     {
        //         type: 'confirm',
        //         name: 'optimize',
        //         message: 'Would you like optimized code?',
        //         default: true
        //     }
        // ]);

        // this.log('Optimize', this.answers.cool);

        return super._prompting();
    }

    get configuring() {
        // configuring - Saving configurations and configure the project (creating .editorconfig files and other metadata files)
        console.log('entity-server/index.js configuring()');

        return super._configuring();
    }

    get default() {
        // default - If the method name doesn’t match a priority, it will be pushed to this group.
        console.log('entity-server/index.js default()');

        return super._default();
    }

    get writing() {
        // writing - Where you write the generator specific files (routes, controllers, etc)
        console.log('entity-server/index.js writing()');

        const jhipsterPhase = super._writing();
        const myCustomSteps = {
            writeEntityServerFiles() {
                this.writeFilesToDisk(serverFiles, this, false, null);
                this.writeFilesToDisk(microFrontEndFiles, this, false, null);
            },
        };
        return { ...jhipsterPhase, ...myCustomSteps };
    }

    get conflicts() {
        // conflicts - Where conflicts are handled (used internally), no super._conflicts
        console.log('entity-server/index.js conflicts()');
        return null;
    }

    get install() {
        // install - Where installations are run (npm, bower)
        console.log('entity-server/index.js install()');

        return super._install();
    }

    get end() {
        // end - Called last, cleanup, say good bye, etc
        console.log('entity-server/index.js eng()');

        // Here we are not overriding this phase and hence its being handled by JHipster
        return super._end();
    }
};
