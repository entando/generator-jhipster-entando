const chalk = require('chalk');
const EntityGenerator = require('generator-jhipster/generators/entity');
const prompts = require('./prompts');

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
  }

  get initializing() {
    const jhipsterInitializingPhase = super._initializing();

    if (!this.jhipsterConfig.databaseType || this.jhipsterConfig.databaseType === 'no') {
      return {
        ...jhipsterInitializingPhase,
        validateDbExistence() {
          this.info('Skipping default JHipster validateDbExistence step');
        },
        validateTableName() {
          this.info('Skipping default JHipster validateTableName');
        },
      };
    }

    return jhipsterInitializingPhase;
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
    const jhipsterComposingPhase = super._composing();
    const { context } = this;

    return {
      ...jhipsterComposingPhase,
      ...{
        composeMicrofrontend() {
          this.composeWith(require.resolve('../entity-microfrontend'), true, {
            context,
          });
        },
      },
    };
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
    return super._writing();
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
