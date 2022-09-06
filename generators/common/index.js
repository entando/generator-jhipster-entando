const chalk = require('chalk');
const CommonGenerator = require('generator-jhipster/generators/common');
const { writeFiles } = require('./files');

module.exports = class extends CommonGenerator {
  constructor(args, options, features) {
    super(args, options, features);

    if (this.options.help) return;

    if (!this.options.jhipsterContext) {
      throw new Error(
        `This is a JHipster blueprint and should be used only like ${chalk.yellow(
          'jhipster --blueprints entando',
        )}`,
      );
    }

    // this.sbsBlueprint = true;
  }

  get initializing() {
    // initializing - Your initialization methods (checking current project state, getting configs, etc)
    return super._initializing();
  }

  get prompting() {
    // configuring - Saving configurations and configure the project (creating .editorconfig files and other metadata files)
    return super._prompting();
  }

  get configuring() {
    // configuring - Saving configurations and configure the project (creating .editorconfig files and other metadata files)
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
    // Here we are not overriding this phase and hence its being handled by JHipster
    return super._default();
  }

  get writing() {
    // writing - Where you write the generator specific files (routes, controllers, etc)
    const jhipsterPhase = super._writing();
    const entandoPhase = writeFiles();

    return { ...jhipsterPhase, ...entandoPhase };
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
