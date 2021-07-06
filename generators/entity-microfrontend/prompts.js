async function askForMfeGeneration(meta) {
  if (!meta && this.existingProject) {
    return;
  }

  const { generateMicroFrontends } = this.jhipsterConfig;

  if (generateMicroFrontends === 'ask') {
    const answers = await this.prompt({
      type: 'confirm',
      name: 'generateMfeForEntity',
      message: 'Do you want to generate micro frontends?',
      default: true,
    });

    /* eslint-disable no-multi-assign */
    this.generateMfeForEntity = this.jhipsterConfig.generateMfeForEntity = answers.generateMfeForEntity;
  } else {
    if (generateMicroFrontends === 'never') {
      this.generateMfeForEntity = this.jhipsterConfig.generateMfeForEntity = false;
    }
    if (generateMicroFrontends === 'always') {
      this.generateMfeForEntity = this.jhipsterConfig.generateMfeForEntity = true;
    }
  }
}

module.exports = { askForMfeGeneration };
