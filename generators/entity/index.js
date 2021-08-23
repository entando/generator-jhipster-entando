const chalk = require('chalk');
const EntityGenerator = require('generator-jhipster/generators/entity');
const prompts = require('./prompts');

module.exports = class extends EntityGenerator {
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
  }

  get initializing() {
    return super._initializing();
  }

  get prompting() {
    // Here we are not overriding this phase and hence its being handled by JHipster
    const jhipsterPromptingPhase = super._prompting();

    return { ...jhipsterPromptingPhase, ...prompts };
  }

  get configuring() {
    // Here we are not overriding this phase and hence its being handled by JHipster
    return super._configuring();
  }

  get composing() {
    return super._composing();
  }

  get loading() {
    // Here we are not overriding this phase and hence its being handled by JHipster
    return super._loading();
  }

  get preparingFields() {
    return super._preparingFields();
  }

  get preparing() {
    // Here we are not overriding this phase and hence its being handled by JHipster
    return super._preparing();
  }

  get preparingRelationships() {
    // Here we are not overriding this phase and hence its being handled by JHipster
    return super._preparingRelationships();
  }

  get default() {
    // Here we are not overriding this phase and hence its being handled by JHipster
    return super._default();
  }

  get writing() {
    /*
     * Please note we can't compose in the Composing() priority because we need
     * preparingFields() and preparingRelationships() to be called before launching the entity-microfrontend.
     * Composing() is called before these ones.
     */
    const jhipsterWritingPhase = super._writing();
    const { context } = this;

    return {
      ...jhipsterWritingPhase,
      ...{
        composeMicrofrontend() {
          this.composeWith(require.resolve('../entity-microfrontend'), true, {
            context,
          });
        },
      },
    };
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
