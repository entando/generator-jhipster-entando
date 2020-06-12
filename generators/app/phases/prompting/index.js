function askForApplicationType(meta) {
  if (!meta && this.existingProject) {
    return;
  }

  // defaulting to microservice for "Which type of application would you like to create?"
  this.configOptions.applicationType = 'microservice';
  this.applicationType = this.configOptions.applicationType;

  // defaulting to false for "Do you want to make it reactive with Spring WebFlux?"
  this.configOptions.reactive = false;
  this.reactive = this.configOptions.reactive;
}

module.exports = { askForApplicationType };
