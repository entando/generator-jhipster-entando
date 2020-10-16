const path = require('path');
const fse = require('fs-extra');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

const expectedFiles = require('./utils/expected-files');

describe('Subgenerator entity of entando JHipster blueprint', () => {
  describe('With default blueprint configuration', () => {
    before(done => {
      helpers
        .run('generator-jhipster/generators/entity')
        .inTmpDir(dir => {
          fse.copySync(path.join(__dirname, '../test/templates/ngx-blueprint'), dir);
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

    it('creates expected details widget files for the blueprint', () => {
      assert.file(expectedFiles.entity.widget.formWidget);
    });
  });

  describe('With noDb blueprint configuration', () => {
    before(done => {
      helpers
        .run('generator-jhipster/generators/entity')
        .inTmpDir(dir => {
          fse.copySync(path.join(__dirname, '../test/templates/ngx-blueprint-noDb'), dir);
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

    it('creates expected details widget files for the blueprint', () => {
      assert.file(expectedFiles.entity.widget.formWidget);
    });
  });

  describe('With noDb with serviceClass blueprint configuration', () => {
    before(done => {
      helpers
        .run('generator-jhipster/generators/entity')
        .inTmpDir(dir => {
          fse.copySync(path.join(__dirname, '../test/templates/ngx-blueprint-noDb'), dir);
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
        })
        .on('end', done);
    });

    it('creates expected files for the blueprint', () => {
      assert.file(expectedFiles.entity.server.common);
      assert.file(expectedFiles.entity.server.noDb);
      assert.file(expectedFiles.entity.server.serviceClass);
    });

    it('creates expected details widget files for the blueprint', () => {
      assert.file(expectedFiles.entity.widget.detailsWidget);
    });

    it('creates expected details widget files for the blueprint', () => {
      assert.file(expectedFiles.entity.widget.formWidget);
    });
  });

  describe('With noDb with serviceImpl blueprint configuration', () => {
    before(done => {
      helpers
        .run('generator-jhipster/generators/entity')
        .inTmpDir(dir => {
          fse.copySync(path.join(__dirname, '../test/templates/ngx-blueprint-noDb'), dir);
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

    it('creates expected files for the blueprint', () => {
      assert.file(expectedFiles.entity.server.common);
      assert.file(expectedFiles.entity.server.noDb);
      assert.file(expectedFiles.entity.server.serviceImpl);
    });

    it('creates expected details widget files for the blueprint', () => {
      assert.file(expectedFiles.entity.widget.detailsWidget);
    });

    it('creates expected details widget files for the blueprint', () => {
      assert.file(expectedFiles.entity.widget.formWidget);
    });
  });
});
