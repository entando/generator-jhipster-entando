const path = require('path');
const fse = require('fs-extra');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

const expectedFiles = require('./utils/expected-files');

describe('Subgenerator entity of entando JHipster blueprint', () => {
  describe('With postgres', () => {
    describe('and with always MFE', () => {
      before(done => {
        helpers
          .run('generator-jhipster/generators/entity')
          .inTmpDir(dir => {
            fse.copySync(path.join(__dirname, '../test/templates/ms-postgres-oauth2-alwaysMFE'), dir);
          })
          .withOptions({
            'from-cli': true,
            skipInstall: true,
            blueprint: 'entando',
            skipChecks: true,
          })
          .withGenerators([
            [
              require('../generators/entity/index.js'), // eslint-disable-line global-require
              'jhipster-entando:entity',
              path.join(__dirname, '../generators/entity/index.js'),
            ],
          ])
          .withArguments(['foo'])
          .withPrompts({
            fieldAdd: false,
            relationshipAdd: false,
            dto: 'no',
            service: 'no',
            pagination: 'infinite-scroll',
          })
          .on('end', done);
      });

      it('creates expected files for the blueprint', () => {
        assert.file(expectedFiles.entity.server.common);
      });

      it('creates expected details widget files for the blueprint', () => {
        assert.file(expectedFiles.entity.widget.detailsWidget);
      });

      it('creates expected form widget files for the blueprint', () => {
        assert.file(expectedFiles.entity.widget.formWidget);
      });

      it('creates expected table widget files for the blueprint', () => {
        assert.file(expectedFiles.entity.widget.tableWidget);
      });
    });

    describe('and without MFE', () => {
      before(done => {
        helpers
          .run('generator-jhipster/generators/entity')
          .inTmpDir(dir => {
            fse.copySync(path.join(__dirname, '../test/templates/ms-noDb-oauth2-withoutMFE'), dir);
          })
          .withOptions({
            'from-cli': true,
            skipInstall: true,
            blueprint: 'entando',
            skipChecks: true,
          })
          .withGenerators([
            [
              require('../generators/entity/index.js'), // eslint-disable-line global-require
              'jhipster-entando:entity',
              path.join(__dirname, '../generators/entity/index.js'),
            ],
          ])
          .withArguments(['foo'])
          .withPrompts({
            fieldAdd: false,
            relationshipAdd: false,
            dto: 'no',
            service: 'serviceImpl',
            pagination: 'infinite-scroll',
          })
          .on('end', done);
      });

      it('should contains expected files from the blueprint', () => {
        assert.file(expectedFiles.entity.server.common);
        assert.file(expectedFiles.entity.server.serviceImpl);
      });

      it('should not contains any MFE files', () => {
        assert.noFile(expectedFiles.entity.widget.detailsWidget);
        assert.noFile(expectedFiles.entity.widget.formWidget);
        assert.noFile(expectedFiles.entity.widget.tableWidget);
      });
    });

    describe('and ask for MFE and generateMfeForEntity is false', () => {
      before(done => {
        helpers
          .run('generator-jhipster/generators/entity')
          .inTmpDir(dir => {
            fse.copySync(path.join(__dirname, '../test/templates/ms-postgres-oauth2-askForMFE'), dir);
          })
          .withOptions({
            'from-cli': true,
            skipInstall: true,
            blueprint: 'entando',
            skipChecks: true,
          })
          .withGenerators([
            [
              require('../generators/entity/index.js'), // eslint-disable-line global-require
              'jhipster-entando:entity',
              path.join(__dirname, '../generators/entity/index.js'),
            ],
          ])
          .withArguments(['foo'])
          .withPrompts({
            fieldAdd: false,
            relationshipAdd: false,
            dto: 'no',
            service: 'serviceClass',
            pagination: 'infinite-scroll',
            generateMfeForEntity: false,
          })
          .on('end', done);
      });

      it('should contains expected files from the blueprint', () => {
        assert.file(expectedFiles.entity.server.common);
        assert.file(expectedFiles.entity.server.serviceClass);
      });

      it('should not contains any MFE files', () => {
        assert.noFile(expectedFiles.entity.widget.detailsWidget);
        assert.noFile(expectedFiles.entity.widget.formWidget);
        assert.noFile(expectedFiles.entity.widget.tableWidget);
      });
    });

    describe('and ask for MFE and generateMfeForEntity is true', () => {
      before(done => {
        helpers
          .run('generator-jhipster/generators/entity')
          .inTmpDir(dir => {
            fse.copySync(path.join(__dirname, '../test/templates/ms-postgres-oauth2-askForMFE'), dir);
          })
          .withOptions({
            'from-cli': true,
            skipInstall: true,
            blueprint: 'entando',
            skipChecks: true,
          })
          .withGenerators([
            [
              require('../generators/entity/index.js'), // eslint-disable-line global-require
              'jhipster-entando:entity',
              path.join(__dirname, '../generators/entity/index.js'),
            ],
          ])
          .withArguments(['foo'])
          .withPrompts({
            fieldAdd: false,
            relationshipAdd: false,
            dto: 'no',
            service: 'no',
            pagination: 'infinite-scroll',
            generateMfeForEntity: true,
          })
          .on('end', done);
      });

      it('should contains expected files from the blueprint', () => {
        assert.file(expectedFiles.entity.server.common);
      });

      it('creates expected details widget files for the blueprint', () => {
        assert.file(expectedFiles.entity.widget.detailsWidget);
      });

      it('creates expected form widget files for the blueprint', () => {
        assert.file(expectedFiles.entity.widget.formWidget);
      });

      it('creates expected table widget files for the blueprint', () => {
        assert.file(expectedFiles.entity.widget.tableWidget);
      });
    });
  });

  describe('With noDb', () => {
    describe('with always MFE blueprint', () => {
      before(done => {
        helpers
          .run('generator-jhipster/generators/entity')
          .inTmpDir(dir => {
            fse.copySync(path.join(__dirname, '../test/templates/ms-noDb-oauth2-alwaysMFE'), dir);
          })
          .withOptions({
            'from-cli': true,
            skipInstall: true,
            blueprint: 'entando',
            skipChecks: true,
          })
          .withGenerators([
            [
              require('../generators/entity/index.js'), // eslint-disable-line global-require
              'jhipster-entando:entity',
              path.join(__dirname, '../generators/entity/index.js'),
            ],
          ])
          .withArguments(['foo'])
          .withPrompts({
            fieldAdd: false,
            relationshipAdd: false,
            dto: 'no',
            service: 'no',
            pagination: 'infinite-scroll',
          })
          .on('end', done);
      });

      it('creates expected files for the blueprint', () => {
        assert.file(expectedFiles.entity.server.common);
        assert.file(expectedFiles.entity.server.noDb);
      });

      it('creates expected details widget files for the blueprint', () => {
        assert.file(expectedFiles.entity.widget.detailsWidget);
      });

      it('creates expected form widget files for the blueprint', () => {
        assert.file(expectedFiles.entity.widget.formWidget);
      });

      it('creates expected table widget files for the blueprint', () => {
        assert.file(expectedFiles.entity.widget.tableWidget);
      });
    });

    describe('and without MFE blueprint configuration', () => {
      before(done => {
        helpers
          .run('generator-jhipster/generators/entity')
          .inTmpDir(dir => {
            fse.copySync(path.join(__dirname, '../test/templates/ms-noDb-oauth2-withoutMFE'), dir);
          })
          .withOptions({
            'from-cli': true,
            skipInstall: true,
            blueprint: 'entando',
            skipChecks: true,
          })
          .withGenerators([
            [
              require('../generators/entity/index.js'), // eslint-disable-line global-require
              'jhipster-entando:entity',
              path.join(__dirname, '../generators/entity/index.js'),
            ],
          ])
          .withArguments(['foo'])
          .withPrompts({
            fieldAdd: false,
            relationshipAdd: false,
            dto: 'no',
            service: 'serviceImpl',
            pagination: 'infinite-scroll',
          })
          .on('end', done);
      });

      it('should contains expected files from the blueprint', () => {
        assert.file(expectedFiles.entity.server.common);
        assert.file(expectedFiles.entity.server.noDb);
        assert.file(expectedFiles.entity.server.serviceImpl);
      });

      it('should not contains any MFE files', () => {
        assert.noFile(expectedFiles.entity.widget.detailsWidget);
        assert.noFile(expectedFiles.entity.widget.formWidget);
        assert.noFile(expectedFiles.entity.widget.tableWidget);
      });
    });

    describe('With noDb and ask for MFE and generateMfeForEntity is false blueprint configuration', () => {
      before(done => {
        helpers
          .run('generator-jhipster/generators/entity')
          .inTmpDir(dir => {
            fse.copySync(path.join(__dirname, '../test/templates/ms-noDb-oauth2-askForMFE'), dir);
          })
          .withOptions({
            'from-cli': true,
            skipInstall: true,
            blueprint: 'entando',
            skipChecks: true,
          })
          .withGenerators([
            [
              require('../generators/entity/index.js'), // eslint-disable-line global-require
              'jhipster-entando:entity',
              path.join(__dirname, '../generators/entity/index.js'),
            ],
          ])
          .withArguments(['foo'])
          .withPrompts({
            fieldAdd: false,
            relationshipAdd: false,
            dto: 'no',
            service: 'serviceClass',
            pagination: 'infinite-scroll',
            generateMfeForEntity: false,
          })
          .on('end', done);
      });

      it('should contains expected files from the blueprint', () => {
        assert.file(expectedFiles.entity.server.common);
        assert.file(expectedFiles.entity.server.noDb);
        assert.file(expectedFiles.entity.server.serviceClass);
      });

      it('should not contains any MFE files', () => {
        assert.noFile(expectedFiles.entity.widget.detailsWidget);
        assert.noFile(expectedFiles.entity.widget.formWidget);
        assert.noFile(expectedFiles.entity.widget.tableWidget);
      });
    });

    describe('With noDb and ask for MFE and generateMfeForEntity is true blueprint configuration', () => {
      before(done => {
        helpers
          .run('generator-jhipster/generators/entity')
          .inTmpDir(dir => {
            fse.copySync(path.join(__dirname, '../test/templates/ms-noDb-oauth2-askForMFE'), dir);
          })
          .withOptions({
            'from-cli': true,
            skipInstall: true,
            blueprint: 'entando',
            skipChecks: true,
          })
          .withGenerators([
            [
              require('../generators/entity/index.js'), // eslint-disable-line global-require
              'jhipster-entando:entity',
              path.join(__dirname, '../generators/entity/index.js'),
            ],
          ])
          .withArguments(['foo'])
          .withPrompts({
            fieldAdd: false,
            relationshipAdd: false,
            dto: 'no',
            service: 'serviceImpl',
            pagination: 'infinite-scroll',
            generateMfeForEntity: true,
          })
          .on('end', done);
      });

      it('should contains expected files from the blueprint', () => {
        assert.file(expectedFiles.entity.server.common);
        assert.file(expectedFiles.entity.server.noDb);
        assert.file(expectedFiles.entity.server.serviceImpl);
      });

      it('creates expected details widget files for the blueprint', () => {
        assert.file(expectedFiles.entity.widget.detailsWidget);
      });

      it('creates expected form widget files for the blueprint', () => {
        assert.file(expectedFiles.entity.widget.formWidget);
      });

      it('creates expected table widget files for the blueprint', () => {
        assert.file(expectedFiles.entity.widget.tableWidget);
      });
    });
  });
});
