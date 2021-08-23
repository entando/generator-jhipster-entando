const chalk = require('chalk');
const CommonGenerator = require('generator-jhipster/generators/common');

module.exports = class extends CommonGenerator {
  constructor(args, options, features) {
    super(args, options, features);

    const { help, jhipsterContext } = this.options;

    if (help) return;

    if (!jhipsterContext) {
      throw new Error(
        `This is a JHipster blueprint and should be used only like ${chalk.yellow(
          'jhipster --blueprints entando',
        )}`,
      );
    }
  }

  get initializing() {
    // initializing - Your initialization methods (checking current project state, getting configs, etc)

    return super._initializing();
  }

  get prompting() {
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
    // Here we are not overriding this phase and hence its being handled by JHipster
    return super._install();
  }

  get end() {
    // Here we are not overriding this phase and hence its being handled by JHipster
    return super._end();
  }
};
