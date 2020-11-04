const chalk = require('chalk');

const EntityServerGenerator = require('generator-jhipster/generators/entity-server');

const constants = require('../generator-constants');
const prompts = require('./prompts');
const { writeEntandoFiles } = require('./files');
const lib = require('./lib');

const { DETAILS_WIDGET, FORM_WIDGET, TABLE_WIDGET } = constants;

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
    // This sets up options for this sub generator and is being reused from JHipster
    jhContext.setupClientOptions(this, jhContext);

    if (jhContext.databaseType === 'cassandra') {
      this.pkType = 'UUID';
    }
    const jhipsterConfig = this.getAllJhipsterConfig();
    this.serverPort = jhipsterConfig.serverPort;
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

  get default() {
    // default - If the method name doesn’t match a priority, it will be pushed to this group.
    return super._default();
  }

  get writing() {
    // writing - Where you write the generator specific files (routes, controllers, etc)
    const jhipsterWritingPhase = super._writing();

    return { ...jhipsterWritingPhase, ...writeEntandoFiles() };
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
