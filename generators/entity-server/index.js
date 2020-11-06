const chalk = require('chalk');

const EntityServerGenerator = require('generator-jhipster/generators/entity-server');

const { writeFiles } = require('./files');

module.exports = class extends EntityServerGenerator {
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
  }

  get initializing() {
    return super._initializing();
  }

  get prompting() {
    // prompting - Where you prompt users for options (where you’d call this.prompt())
    return super._prompting();
  }

  get configuring() {
    // selectedWidgets can be used to select widgets we want to generate. For the moment all will be generated.
    return super._configuring();
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
};
