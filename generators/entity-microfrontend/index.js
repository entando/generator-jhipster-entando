const GeneratorBaseBlueprint = require('generator-jhipster/generators/generator-base-blueprint');
const utils = require('generator-jhipster/generators/utils');

const constants = require('../generator-constants');
const prompts = require('./prompts');
const { writeFiles } = require('./files');
const lib = require('./lib');

const { DETAILS_WIDGET, FORM_WIDGET, TABLE_WIDGET } = constants;

module.exports = class extends GeneratorBaseBlueprint {
  constructor(args, opts) {
    super(args, { fromBlueprint: true, ...opts }); // fromBlueprint variable is important
    utils.copyObjectProps(this, opts.context);
    this.jhipsterContext = opts.jhipsterContext || opts.context;
    this.configOptions = opts.configOptions || {};
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
      setupMfeConstants() {
        const jhipsterConfig = this.getAllJhipsterConfig(this, true);
        this.serverPort = jhipsterConfig.serverPort;
        this.generateMicroFrontends = jhipsterConfig.generateMicroFrontends || 'ask';
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
    const jhipsterInstallPhase = super._install();

    const entandoPhase = {
      installRootNpmPackages() {
        this.npmInstall();
      },
    };

    return { ...jhipsterInstallPhase, ...entandoPhase };
  }

  get end() {
    // end - Called last, cleanup, say good bye, etc
    const jhipsterEndPhase = super._end();

    const entandoPhase = {
      runPrettier() {
        /*
         * TODO V7 JHipster this Entando end phase have to be removed since JHipster handles js files
         *   in prettier transformer when writing files on disk. This command will be useless.
         */
        if (this.configOptions.generateMfeForEntity) {
          this.spawnCommandSync('npm', ['run', 'prettier']);
        }
      },
    };

    return { ...jhipsterEndPhase, ...entandoPhase };
  }
};
