async function askForApplicationType() {
  if (this.existingProject) {
    return;
  }

  // defaulting to microservice for "Which type of application would you like to create?"
  // eslint-disable-next-line no-multi-assign
  this.applicationType = this.jhipsterConfig.applicationType = 'microservice';
}

module.exports = { askForApplicationType };
