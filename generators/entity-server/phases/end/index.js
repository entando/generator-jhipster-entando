function runPrettier() {
  // TODO V7 JHipster this Entando end phase have to be removed since JHipster handles js files
  //  in prettier transformer when writing files on disk
  //  this command will be useless
  if (this.configOptions.generateMfeForEntity) {
    this.spawnCommandSync('npm', ['run', 'prettier']);
  }
}

module.exports = {
  runPrettier,
};
