const chalk = require('chalk');

const LanguagesGenerator = require('generator-jhipster/generators/languages');
const constants = require('generator-jhipster/generators/generator-constants');

const { ANGULAR, REACT } = constants.SUPPORTED_CLIENT_FRAMEWORKS;

module.exports = class extends LanguagesGenerator {
  constructor(args, opts) {
    super(args, { fromBlueprint: true, ...opts }); // fromBlueprint variable is important

    // eslint-disable-next-line no-multi-assign
    const jhContext = (this.jhipsterContext = this.options.jhipsterContext);

    if (!jhContext) {
      this.error(
        `This is a JHipster blueprint and should be used only like ${chalk.yellow(
          'jhipster --blueprint <%= moduleName %>',
        )}`,
      );
    }

    this.configOptions = jhContext.configOptions || {};
    /*  FROM ENTANDO: JHipster 6.9.O have a bug `this.skipUserManagement` is always undefined
     * Force to define the value.
     * Note: The bug is fixed in JHipster v7+ we would remove all this and only rely to default JHipster behavior
     */
    this.skipUserManagement = this.configOptions.skipUserManagement;
  }

  get initializing() {
    // initializing - Your initialization methods (checking current project state, getting configs, etc)
    return super._initializing();
  }

  get prompting() {
    // prompting - Where you prompt users for options (where you’d call this.prompt())
    return super._prompting();
  }

  get configuring() {
    // configuring - Saving configurations and configure the project (creating .editorconfig files and other metadata files)
    return super._configuring();
  }

  get default() {
    // default - If the method name doesn’t match a priority, it will be pushed to this group.
    return super._default();
  }

  get writing() {
    // writing - Where you write the generator specific files (routes, controllers, etc)
    const { skipUserManagement } = this;

    const phaseFromJHipster = super._writing();
    const phaseFromEntando = {
      write() {
        if (!this.skipClient) {
          this.updateLanguagesInLanguagePipe(this.languages);
          this.updateLanguagesInLanguageConstantNG2(this.languages);
          this.updateLanguagesInWebpack(this.languages);
          if (this.clientFramework === ANGULAR) {
            this.updateLanguagesInMomentWebpackNgx(this.languages);
          }
          if (this.clientFramework === REACT) {
            this.updateLanguagesInMomentWebpackReact(this.languages);
          }
        }

        /*  FROM ENTANDO: JHipster 6.9.O have a bug `this.skipUserManagement` is always undefined
         * We want to be sure this part is not running when skipUserManagement is true.
         * Note: The bug is fixed in JHipster v7+ we would remove all this and only rely to default JHipster behavior
         */
        if (!skipUserManagement) {
          this.updateLanguagesInLanguageMailServiceIT(this.languages, this.packageFolder);
        }
      },
    };

    return { ...phaseFromJHipster, ...phaseFromEntando };
  }

  get end() {
    // end - Called last, cleanup, say good bye, etc
    return super._end();
  }
};
