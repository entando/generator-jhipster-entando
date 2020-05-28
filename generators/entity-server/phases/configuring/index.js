function addPrettier() {
    if (this.configOptions.generateMfeForEntity) {
        this.addNpmDevDependency('prettier', '2.0.5');
        this.addNpmScript('prettier', 'prettier --write "ui/**/*.js"');
    }
}

module.exports = {
    addPrettier,
};
