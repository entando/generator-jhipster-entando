const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const expectedFiles = require('./utils/expected-files');

describe('Subgenerator server of entando JHipster blueprint', () => {
    describe('Sample test', () => {
        before(done => {
            helpers
                .run('generator-jhipster/generators/server')
                .withOptions({
                    'from-cli': true,
                    skipInstall: true,
                    blueprint: 'entando',
                    skipChecks: true
                })
                .withGenerators([
                    [
                        require('../generators/server/index.js'), // eslint-disable-line global-require
                        'jhipster-entando:server',
                        path.join(__dirname, '../generators/server/index.js')
                    ]
                ])
                .withPrompts({
                    baseName: 'entandoPlugin',
                    packageName: 'com.mycompany.myapp',
                    applicationType: 'microservice',
                    databaseType: 'sql',
                    devDatabaseType: 'h2Disk',
                    prodDatabaseType: 'mysql',
                    cacheProvider: 'ehcache',
                    authenticationType: 'oidc',
                    enableTranslation: true,
                    nativeLanguage: 'en',
                    languages: ['fr', 'de'],
                    buildTool: 'maven',
                    rememberMeKey: '2bb60a80889aa6e6767e9ccd8714982681152aa5'
                })
                .on('end', done);
        });

        it('creates expected files for the blueprint', () => {
            assert.file(expectedFiles.server);
        });

        it('verifies Application.java contains EntandoProperties reference', () => {
            const applicationFile = expectedFiles.server.filter(item => item.endsWith('com/mycompany/myapp/EntandoPluginApp.java'))[0];
            assert.fileContent(applicationFile, /EntandoProperties\.class/);
        });
    });
});
