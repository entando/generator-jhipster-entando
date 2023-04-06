const chalk = require('chalk');

const EntityServerGenerator = require('generator-jhipster/generators/entity-server');

const { writeFiles } = require('./files');

module.exports = class extends EntityServerGenerator {
  constructor(args, options, features) {
    super(args, options, features);

    if (this.options.help) return;

    if (!this.options.jhipsterContext) {
      throw new Error(`This is a JHipster blueprint and should be used only like ${chalk.yellow('jhipster --blueprints entando')}`);
    }
  }

  get initializing() {
    return super._initializing();
  }

  get prompting() {
    // prompting - Where you prompt users for options (where you’d call this.prompt())
    return super._prompting();
  }

  get configuring() {
    // Here we are not overriding this phase and hence its being handled by JHipster
    return super._configuring();
  }

  get composing() {
    // Here we are not overriding this phase and hence its being handled by JHipster
    return super._composing();
  }

  get loading() {
    // Here we are not overriding this phase and hence its being handled by JHipster
    return super._loading();
  }

  get preparing() {
    // Here we are not overriding this phase and hence its being handled by JHipster
    return super._preparing();
  }

  get preparingFields() {
    return super._preparingFields();
  }

  get default() {
    // default - If the method name doesn’t match a priority, it will be pushed to this group.
    return super._default();
  }

  get writing() {
    // writing - Where you write the generator specific files (routes, controllers, etc)
    const jhipsterWritingPhase = super._writing();
    const entandoWritingPhase = writeFiles();

    return { ...jhipsterWritingPhase, ...entandoWritingPhase };
  }

  get postWriting() {
    // Here we are not overriding this phase and hence its being handled by JHipster
    return super._postWriting();
  }

  get install() {
    // install - Where installations are run (npm, bower)
    return super._install();
  }

  get end() {
    // end - Called last, cleanup, say good bye, etc
    return super._end();
  }
};
