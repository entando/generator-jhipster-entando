const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('Subgenerator common of entando JHipster blueprint', () => {
  describe('With default blueprint configuration', () => {
    before(done => {
      helpers
        .run('generator-jhipster/generators/common')
        .withOptions({
          'from-cli': true,
          skipInstall: true,
          blueprint: 'entando',
          skipChecks: true,
        })
        .withGenerators([
          [
            require('../generators/common/index.js'), // eslint-disable-line global-require
            'jhipster-entando:common',
            path.join(__dirname, '../generators/common/index.js'),
          ],
        ])
        .withPrompts({
          baseName: 'entandoPlugin',
          packageName: 'com.mycompany.myapp',
          applicationType: 'microservice',
          databaseType: 'sql',
          devDatabaseType: 'h2Disk',
          prodDatabaseType: 'mysql',
          cacheProvider: 'ehcache',
          authenticationType: 'oauth2',
          enableTranslation: true,
          nativeLanguage: 'en',
          languages: ['fr', 'de'],
          buildTool: 'maven',
          rememberMeKey: '2bb60a80889aa6e6767e9ccd8714982681152aa5',
        })
        .on('end', done);
    });

    it('creates expected files for the blueprint', () => {
      assert.fileContent(
        '.gitignore',
        '######################\n' +
          '# Entando bundles\n' +
          '######################\n' +
          'bundle/\n' +
          '# !/bundle/descriptor.yaml',
      );
    });
  });
});
