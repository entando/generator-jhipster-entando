function askForMfeGeneration(meta) {
  // defaulting to asking about MFE generation
  const { generateMicroFrontends } = this;

  if (!meta && this.existingProject) {
    return;
  }

  if (generateMicroFrontends === 'ask') {
    const done = this.async();
    const prompts = [
      {
        type: 'confirm',
        name: 'generateMfeForEntity',
        message: 'Do you want to generate micro frontends?',
        default: true,
      },
    ];
    this.prompt(prompts).then(prompt => {
      this.configOptions.generateMfeForEntity = prompt.generateMfeForEntity;
      done();
    });
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
