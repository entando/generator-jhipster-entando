const path = require('path');

const EntandoNeedle = require('../../needle-api/needle-server-bundle');
const { serverFiles } = require('../../files');
const mfeFileGeneration = require('../../lib/create-mfe-template-map.js').generateFiles;
const { getMockData } = require('./mfe-test-tools');

function writingInit() {
    if (this.configOptions.generateMfeForEntity) {
        this.mockData = getMockData(this.fields, 2);
    }
}

// overwriting super._writing().writeEntityServerFiles method
function writeEntityServerFiles() {
    this.writeFilesToDisk(serverFiles, this, false, null);
}

function writeMicroFrontendFiles() {
    if (this.configOptions.generateMfeForEntity) {
        const mfeTemplates = path.join(__dirname, '../..', 'templates', 'ui', 'widgets');
        const microFrontEndFiles = mfeFileGeneration(mfeTemplates);
        debugger;
        this.writeFilesToDisk(microFrontEndFiles, this, false, null);
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
