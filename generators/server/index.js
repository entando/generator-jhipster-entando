const chalk = require('chalk');

const ServerGenerator = require('generator-jhipster/generators/server');

const prompts = require('./prompts');
const { writeFiles } = require('./files');
const constants = require('../generator-constants');

module.exports = class extends ServerGenerator {
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

    this.delete = this._delete;
  }

  get initializing() {
    // initializing - Your initialization methods (checking current project state, getting configs, etc)
    const jhipsterPhase = super._initializing();
    const entandoPhase = {
      setupEntandoContext() {
        const configuration = this.getJhipsterConfig();
        this.bundleName = configuration.get('bundleName');
        this.dockerImageOrganization = configuration.get('dockerOrganization');
        this.prodDatabaseTypePlugin = ['mongodb', 'neo4j', 'couchbase', 'cassandra', 'no'].includes(
          this.databaseType,
        )
          ? 'none'
          : this.prodDatabaseType;
      },
      setupEntandoServerconsts() {
        this.ENTANDO_BUNDLE_BOM_VERSION = constants.ENTANDO_BUNDLE_BOM_VERSION;
      },
    };

    return { ...jhipsterPhase, ...entandoPhase };
  }

  get configuring() {
    // configuring - Saving configurations and configure the project (creating .editorconfig files and other metadata files)

    return super._configuring();
  }

  get prompting() {
    // prompting - Where you prompt users for options (where you’d call this.prompt())
    const jhipsterPhase = super._prompting();

    return { ...jhipsterPhase, ...prompts };
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

  get end() {
    // Here we are not overriding this phase and hence its being handled by JHipster
    return super._end();
  }

  // eslint-disable-next-line no-unused-vars
  _delete(templatePathFrom, templatePathTo, _this, options, useTemplate) {
    this.fs.delete(templatePathTo);
  }
};
