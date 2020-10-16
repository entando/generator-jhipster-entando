const chalk = require('chalk');
const CommonGenerator = require('generator-jhipster/generators/common');

const entandoBlueprintWritingPhase = require('./phases/writing');

module.exports = class extends CommonGenerator {
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

  get default() {
    // default - If the method name doesn’t match a priority, it will be pushed to this group.
    return super._default();
  }

  get writing() {
    // writing - Where you write the generator specific files (routes, controllers, etc)
    const jhipsterWritingPhase = super._writing();

    // return entandoBlueprintWritingPhase;
    return { ...jhipsterWritingPhase, ...entandoBlueprintWritingPhase };
  }
};
