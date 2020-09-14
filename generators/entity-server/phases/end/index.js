function runPrettier() {
  if (this.configOptions.generateMfeForEntity) {
    this.spawnCommandSync('npm', ['run', 'prettier']);
  }
}

module.exports = {
  runPrettier,
};
