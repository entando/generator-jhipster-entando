/* eslint-disable no-template-curly-in-string */
const _ = require('lodash');
const YAML = require('yaml');
const fs = require('fs');
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const expectedFiles = require('./utils/expected-files');

function readFile(filename, json) {
    const file = fs.readFileSync(filename, 'utf8');
    return json ? JSON.parse(file) : file;
}

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

        it('verifies application configuration contains EntandoProperties reference', () => {
            const applicationFile = expectedFiles.server.filter(item => item.endsWith('com/mycompany/myapp/EntandoPluginApp.java'))[0];
            assert.fileContent(applicationFile, /EntandoProperties\.class/);
        });

        it('verifies application.yml file contains entando properties', () => {
            const applicationYml = expectedFiles.server.filter(item => item.endsWith('application.yml'))[0];
            const fileContent = readFile(applicationYml, false);
            const config = YAML.parse(fileContent);
            // eslint-disable-next-line no-prototype-builtins
            assert.ok(config.hasOwnProperty('entando'), 'application.yml should contain an entando property');

            const entandoProperties = config.entando;
            const expectedProperties = {
                'client-id': '${CLIENT_ID:entandoPlugin}',
                'client-secret': '${CLIENT_SECRET:entandoPlugin}',
                'access-token-uri': '${TOKEN_SERVICE:http://localhost:9080/auth/realms/entando-development}/protocol/openid-connect/token',
                'auth-service-uri': '${ENTANDO_AUTH:http://localhost:8082/}',
                'config-service-uri': '${ENTANDO_CONFIG:http://localhost:8083/}'
            };
            assert.ok(_.isEqual(entandoProperties, expectedProperties), 'entando properties in application.yml not as expected');
        });
    });
});
