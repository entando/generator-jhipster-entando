const chalk = require('chalk');
const CommonGenerator = require('generator-jhipster/generators/common');

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

    this.sbsBlueprint = true;
  }

  /**
   * A blueprint can't be empty, we add a fake method here to ensure that.
   */
  notEmpty() {}
};
