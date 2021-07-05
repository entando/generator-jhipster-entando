const chalk = require('chalk');
const _ = require('lodash');

const ServerGenerator = require('generator-jhipster/generators/server');
const {
  formatDateForChangelog,
  prepareFieldForLiquibaseTemplates,
} = require('generator-jhipster/utils/liquibase');
const {
  prepareEntityForTemplates,
  prepareEntityPrimaryKeyForTemplates,
  loadRequiredConfigIntoEntity,
} = require('generator-jhipster/utils/entity');
const { prepareFieldForTemplates } = require('generator-jhipster/utils/field');
const { OAUTH2 } = require('generator-jhipster/jdl/jhipster/authentication-types');
const { SQL } = require('generator-jhipster/jdl/jhipster/database-types');
const { CommonDBTypes } = require('generator-jhipster/jdl/jhipster/field-types');
const { defaultConfig } = require('generator-jhipster/generators/generator-defaults');

const prompts = require('./prompts');
const { writeFiles } = require('./files');
const constants = require('../generator-constants');

const { STRING: TYPE_STRING, LONG: TYPE_LONG } = CommonDBTypes;

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

  get loading() {
    const defaultPhaseFromJHipster = super._loading();
    return {
      ...defaultPhaseFromJHipster,
      createUserManagementEntities() {
        this._createUserManagementEntities();
      },
    };
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

  /**
   * This method is copied from the JHipster bootstrap generator because of a bug, that makes the user
   * object undefiined. Remove this method from here when the bug will be fixed.
   * @private
   */
  _createUserManagementEntities() {
    this.configOptions.sharedLiquibaseFakeData = this.configOptions.sharedLiquibaseFakeData || {};

    if (
      this.configOptions.sharedEntities.User ||
      (this.jhipsterConfig.skipUserManagement && this.jhipsterConfig.authenticationType !== OAUTH2)
    ) {
      return;
    }

    const changelogDateDate = this.jhipsterConfig.creationTimestamp
      ? new Date(this.jhipsterConfig.creationTimestamp)
      : new Date();
    const changelogDate = formatDateForChangelog(changelogDateDate);

    const userEntityDefinition = this.readEntityJson('User');
    if (userEntityDefinition) {
      if (userEntityDefinition.relationships && userEntityDefinition.relationships.length > 0) {
        this.warning('Relationships on the User entity side will be disregarded');
      }
      if (
        userEntityDefinition.fields &&
        userEntityDefinition.fields.some(field => field.fieldName !== 'id')
      ) {
        this.warning('Fields on the User entity side (other than id) will be disregarded');
      }
    }

    // Create entity definition for built-in entity to make easier to deal with relationships.
    const user = {
      name: 'User',
      builtIn: true,
      entityTableName: `${this.getTableName(this.jhipsterConfig.jhiPrefix)}_user`,
      relationships: [],
      changelogDate,
      fields: userEntityDefinition ? userEntityDefinition.fields || [] : [],
    };

    loadRequiredConfigIntoEntity(user, this.jhipsterConfig);
    // Fallback to defaults for test cases.
    loadRequiredConfigIntoEntity(user, defaultConfig);

    const oauth2 = user.authenticationType === OAUTH2;
    const userIdType = oauth2 || user.databaseType !== SQL ? TYPE_STRING : this.getPkType(user.databaseType);
    const fieldValidateRulesMaxlength = userIdType === TYPE_STRING ? 100 : undefined;

    let idField = user.fields.find(field => field.fieldName === 'id');
    if (!idField) {
      idField = {};
      user.fields.unshift(idField);
    }
    _.defaults(idField, {
      fieldName: 'id',
      fieldType: userIdType,
      fieldValidateRulesMaxlength,
      fieldTranslationKey: 'global.field.id',
      fieldNameHumanized: 'ID',
      id: true,
      builtIn: true,
    });

    if (!user.fields.some(field => field.fieldName === 'login')) {
      user.fields.push({
        fieldName: 'login',
        fieldType: TYPE_STRING,
        builtIn: true,
      });
    }

    if (!user.fields.some(field => field.fieldName === 'firstName')) {
      user.fields.push({
        fieldName: 'firstName',
        fieldType: TYPE_STRING,
      });
    }

    if (!user.fields.some(field => field.fieldName === 'lastName')) {
      user.fields.push({
        fieldName: 'lastName',
        fieldType: TYPE_STRING,
      });
    }

    prepareEntityForTemplates(user, this);
    prepareEntityPrimaryKeyForTemplates(user, this);

    user.fields.forEach(field => {
      prepareFieldForTemplates(user, field, this);
      prepareFieldForLiquibaseTemplates(user, field);
    });
    this.configOptions.sharedEntities.User = user;

    user.resetFakerSeed();
    const liquibaseFakeData = oauth2
      ? []
      : [
          { id: userIdType === TYPE_LONG ? 1 : user.primaryKey.fields[0].generateFakeData() },
          { id: userIdType === TYPE_LONG ? 2 : user.primaryKey.fields[0].generateFakeData() },
        ];
    user.liquibaseFakeData = liquibaseFakeData;
    user.fakeDataCount = liquibaseFakeData.length;
    this.configOptions.sharedLiquibaseFakeData.User = liquibaseFakeData;
  }
};
