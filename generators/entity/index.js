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

    this.configOptions = jhContext.configOptions || {};

    // TODO JHipster v7 use getJhipsterConfig instead https://github.com/jhipster/generator-jhipster/pull/12022
    const configuration = this.getAllJhipsterConfig();
    this.databaseType = configuration.databaseType;
  }

  get initializing() {
    const jhipsterInitializingPhase = super._initializing();

    if (!this.databaseType || this.databaseType === 'no') {
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

  _prompting() {
    // prompting - Where you prompt users for options (where you’d call this.prompt())
    const jhipsterPromptingPhase = super._prompting();

    return { ...jhipsterPromptingPhase, ...prompts };
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
    const jhipsterWritingPhase = super._writing();
    const { context, configOptions } = this;

    return {
      ...jhipsterWritingPhase,
      ...{
        composeMicrofrontend() {
          this.composeWith(require.resolve('../entity-microfrontend'), {
            context,
            configOptions,
          });
        },
      },
    };
  }

  get install() {
    // Here we are not overriding this phase and hence its being handled by JHipster
    return super._install();
  }
};
