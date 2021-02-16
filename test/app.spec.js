const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const constants = require('generator-jhipster/generators/generator-constants');
const expectedFiles = require('./utils/expected-files');

const appBaseName = 'entandoPlugin';
const { SERVER_MAIN_RES_DIR } = constants;

describe('Subgenerator app of entando JHipster blueprint', () => {
  describe('With default blueprint configuration', () => {
    before(done => {
      helpers
        .run('generator-jhipster/generators/app')
        .withOptions({
          'from-cli': true,
          skipInstall: true,
          blueprint: 'entando',
          skipChecks: true,
        })
        .withGenerators([
          [
            require('../generators/app/index.js'), // eslint-disable-line global-require
            path.join(__dirname, '../generators/app/index.js'),
          ],
        ])
        .withPrompts({
          baseName: appBaseName,
          packageName: 'com.mycompany.myapp',
          applicationType: 'microservice',
          databaseType: 'sql',
          devDatabaseType: 'h2Disk',
          prodDatabaseType: 'mysql',
          cacheProvider: 'ehcache',
          authenticationType: 'oauth2',
          enableTranslation: true,
          skipUserManagement: true,
          nativeLanguage: 'en',
          languages: ['fr', 'de'],
          buildTool: 'maven',
          rememberMeKey: '2bb60a80889aa6e6767e9ccd8714982681152aa5',
        })
        .on('end', done);
    });

    it('creates expected files for the blueprint', () => {
      assert.file(expectedFiles.microservices);
    });

    it('microservice index.html contains Entando data', () => {
      assert.fileContent(`${SERVER_MAIN_RES_DIR}static/index.html`, 'https://dev.entando.org/');
    });
  });
});
