async function askForMfeGeneration(meta) {
  if (!meta && this.existingProject) {
    return;
  }

  const { generateMicroFrontends } = this;

  if (generateMicroFrontends === 'ask') {
    const answers = await this.prompt({
      type: 'confirm',
      name: 'generateMfeForEntity',
      message: 'Do you want to generate micro frontends?',
      default: true,
    });

    this.configOptions.generateMfeForEntity = answers.generateMfeForEntity;
  } else {
    if (generateMicroFrontends === 'never') {
      this.configOptions.generateMfeForEntity = false;
    }
    if (generateMicroFrontends === 'always') {
      this.configOptions.generateMfeForEntity = true;
    }
  }
}

module.exports = { askForMfeGeneration };
