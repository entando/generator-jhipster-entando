const path = require('path');

const EntandoNeedle = require('../../needle-api/needle-server-bundle');
const { serverFiles } = require('../../files');
const mfeFileGeneration = require('../../lib/create-mfe-template-map.js').generateFiles;
const { getMockData } = require('./mfe-test-tools');

function writingInit() {
    if (this.configOptions.generateMfeForEntity) {
        this.utils = {
            getMockEntityData: getMockData,
        };
        this.mockData = [getMockData(this.fields), getMockData(this.fields)];
    }
}

function writeServerFiles() {
    this.writeFilesToDisk(serverFiles, this, false, null);
}

function writeEntityServerFiles() {
    if (this.configOptions.generateMfeForEntity) {
        const mfeTemplates = path.join(__dirname, '../..', 'templates', 'ui', 'widgets');
        const microFrontEndFiles = mfeFileGeneration(mfeTemplates);

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
    writeServerFiles,
    writeEntityServerFiles,
    updateBundleDescriptor,
};
