function addPrettier() {
    if (this.configOptions.generateMfeForEntity) {
        this.addNpmDevDependency('prettier', '1.19.1');
        this.addNpmScript('prettier', 'prettier --write "ui/**/*.js"');
    }
}

module.exports = {
    addPrettier,
};
