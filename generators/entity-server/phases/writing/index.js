const EntandoNeedle = require('../../needle-api/needle-server-bundle');
const { serverFiles, microFrontendFiles } = require('../../files');
const { getMockData } = require('../../lib/mfe-test-tools');

function writingInit() {
  if (this.configOptions.generateMfeForEntity) {
    this.mockData = getMockData(this.fields, 2);
  }
}

function writeEntityServerFiles() {
  this.writeFilesToDisk(serverFiles, this, false, null);
}

function writeMicroFrontendFiles() {
  if (this.configOptions.generateMfeForEntity) {
    this.writeFilesToDisk(microFrontendFiles, this, false, null);
  }
}

function updateBundleDescriptor() {
  this.entandoNeedleApi = new EntandoNeedle(this);
  this.entandoNeedleApi.addWidgetToDescriptor(this.entityFileName);
  this.entandoNeedleApi.addRolesToDescriptor(this.baseName.toLowerCase(), this.entityFileName);
}

module.exports = {
  writingInit,
  writeEntityServerFiles,
  writeMicroFrontendFiles,
  updateBundleDescriptor,
};
