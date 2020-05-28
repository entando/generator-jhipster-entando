const chalk = require('chalk');

function askForApplicationType(meta) {
    if (!meta && this.existingProject) { return };

    const DEFAULT_APPTYPE = 'microservice';

    const applicationTypeChoices = [
        {
            value: 'monolith',
            name: 'Monolithic application (recommended for simple projects)',
        },
        {
            value: DEFAULT_APPTYPE,
            name: 'Microservice application',
        },
        {
            value: 'gateway',
            name: 'Microservice gateway',
        },
        {
            value: 'uaa',
            name: 'JHipster UAA server',
        },
    ];

    const PROMPT = {
        type: 'list',
        name: 'applicationType',
        message: `Which ${chalk.yellow('*type*')} of application would you like to create?`,
        choices: applicationTypeChoices,
        default: DEFAULT_APPTYPE,
    };

    if (meta) return PROMPT; // eslint-disable-line consistent-return

    const done = this.async();

    const promise = this.skipServer ? Promise.resolve({ applicationType: DEFAULT_APPTYPE }) : this.prompt(PROMPT);
    promise.then(prompt => {
        this.configOptions.applicationType = prompt.applicationType
        this.applicationType = this.configOptions.applicationType;

        // defaulting to false for "Do you want to make it reactive with Spring WebFlux?"
        this.configOptions.reactive = false;
        this.reactive = this.configOptions.reactive;

        done();
    });
}

module.exports = { askForApplicationType };
