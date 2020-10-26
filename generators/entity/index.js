const chalk = require('chalk');
const EntityGenerator = require('generator-jhipster/generators/entity');
const customPrompts = require('./phases/prompting');
const customInitializing = require('./phases/initializing');

module.exports = class extends EntityGenerator {
  constructor(args, opts) {
    super(args, { fromBlueprint: true, ...opts }); // fromBlueprint variable is important

    this.jhipsterContext = this.options.jhipsterContext;
    const jhContext = this.jhipsterContext;

    if (!jhContext) {
      this.error(
        `This is a JHipster blueprint and should be used only like ${chalk.yellow(
          'jhipster --blueprints entando',
        )}`,
      );
    }

    this.configOptions = jhContext.configOptions || {};
    // This sets up options for this sub generator and is being reused from JHipster
    jhContext.setupEntityOptions(this, jhContext, this);
  }

  get initializing() {
    const { context } = this;
    const jhipsterInitializing = super._initializing();
    let initializingSteps = jhipsterInitializing;

    if (!context.databaseType || context.databaseType === 'no') {
      initializingSteps = { ...initializingSteps, ...customInitializing };
    }

    return initializingSteps;
  }

  _prompting() {
    return customPrompts;
  }

  get prompting() {
    // Here we are not overriding this phase and hence its being handled by JHipster
    return this._prompting();
  }

  get configuring() {
    // Here we are not overriding this phase and hence its being handled by JHipster
    return super._configuring();
  }

  get writing() {
    // Here we are not overriding this phase and hence its being handled by JHipster
    return super._writing();
  }

  get install() {
    // Here we are not overriding this phase and hence its being handled by JHipster
    return super._install();
  }
};
