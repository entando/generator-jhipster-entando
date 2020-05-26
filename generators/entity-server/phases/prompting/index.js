function askForMfeGeneration(meta) {
    // defaulting to asking about MFE generation
    const serverSetting = this.config.get('generateMicroFrontends') || 'ask';

    if (!meta && this.existingProject) {
        return;
    }

    if (serverSetting === 'ask') {
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
        if (serverSetting === 'never') {
            this.configOptions.generateMfeForEntity = false;
        }
        if (serverSetting === 'always') {
            this.configOptions.generateMfeForEntity = true;
        }
    }
}

module.exports = { askForMfeGeneration };
