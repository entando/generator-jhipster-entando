const _ = require('lodash');
const GeneratorBaseBlueprint = require('generator-jhipster/generators/generator-base-blueprint');
const { prepareEntityForTemplates } = require('generator-jhipster/utils/entity');

const constants = require('../generator-constants');
const prompts = require('./prompts');
const { writeFiles } = require('./files');
const lib = require('./lib');

const { DETAILS_WIDGET, FORM_WIDGET, TABLE_WIDGET } = constants;

module.exports = class extends GeneratorBaseBlueprint {
  constructor(args, opts) {
    super(args, { fromBlueprint: true, ...opts }); // fromBlueprint variable is important
    this.context = opts.context;
  }

  get initializing() {
    const jhipsterPhase = super._initializing();
    const entandoPhase = {
      setupEntandoLib() {
        this.buildDependencies = lib.buildDependencies;
        this.getJHipsterType = lib.getJHipsterType;
        this.getMuiInput = lib.getMuiInput;
        this.getYupValues = lib.getYupValues;
        this.getPropType = lib.getPropType;
        this.isRequiredPropType = lib.isRequiredPropType;
        this.getFormikValuePropType = lib.getFormikValuePropType;
        this.getFormikTouchedPropType = lib.getFormikTouchedPropType;
        this.getFormikErrorPropType = lib.getFormikErrorPropType;
      },
    };

    return { ...jhipsterPhase, ...entandoPhase };
  }

  get prompting() {
    // prompting - Where you prompt users for options (where you’d call this.prompt())
    const jhipsterPromptingPhase = super._prompting();

    return { ...jhipsterPromptingPhase, ...prompts };
  }

  get configuring() {
    // selectedWidgets can be used to select widgets we want to generate. For the moment all will be generated.
    this.selectedWidgets = [DETAILS_WIDGET, FORM_WIDGET, TABLE_WIDGET];

    return super._configuring();
  }

  get composing() {
    // Here we are not overriding this phase and hence its being handled by JHipster
    return super._composing();
  }

  get loading() {
    const jhipsterPhase = super._loading();
    const entandoPhase = {
      loadSharedConfig() {
        this.loadAppConfig();
        this.loadServerConfig();
        this.loadTranslationConfig();
      },
    };

    return { ...jhipsterPhase, ...entandoPhase };
  }

  get preparing() {
    const { context } = this;

    const jhipsterPhase = super._preparing();
    const entandoPhase = {
      prepareEntityForTemplates() {
        prepareEntityForTemplates(context, this);
        // copy all the new context entries into this to ensure we can access them in the templates directly by the name
        _.defaults(this, context);
      },
    };

    return { ...jhipsterPhase, ...entandoPhase };
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
    const jhipsterEndPhase = super._end();

    const entandoPhase = {
      runPrettier() {
        if (this.jhipsterConfig.generateMfeForEntity) {
          this.spawnCommandSync('npm', ['run', 'prettier']);
        }
      },
    };

    return { ...jhipsterEndPhase, ...entandoPhase };
  }
};
