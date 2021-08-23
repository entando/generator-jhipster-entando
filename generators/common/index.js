const chalk = require('chalk');
const CommonGenerator = require('generator-jhipster/generators/common');

module.exports = class extends CommonGenerator {
  constructor(args, options, features) {
    super(args, options, features);

    const { help, jhipsterContext } = this.options;

    if (help) return;

    if (!jhipsterContext) {
      throw new Error(
        `This is a JHipster blueprint and should be used only like ${chalk.yellow(
          'jhipster --blueprints entando',
        )}`,
      );
    }

    this.sbsBlueprint = true;
  }

  notEmpty() {}
};
