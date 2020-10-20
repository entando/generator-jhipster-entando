const mkdirp = require('mkdirp');
const cleanup = require('generator-jhipster/generators/cleanup');
const constants = require('generator-jhipster/generators/generator-constants');

const {
  INTERPOLATE_REGEX,
  DOCKER_DIR,
  SERVER_MAIN_SRC_DIR,
  SERVER_MAIN_RES_DIR,
  SERVER_TEST_SRC_DIR,
  SERVER_TEST_RES_DIR,
} = constants;

/**
 * The default is to use a file path string. It implies use of the template method.
 * For any other config an object { file:.., method:.., template:.. } can be used
 */
const serverFiles = {
  packageJson: [
    {
      templates: ['package.json'],
    },
  ],
  bundle: [
    {
      templates: [
        { file: 'prepareMicrofrontends.sh', method: 'copy', noEjs: true },
        { file: 'prepareBundle.sh', method: 'copy', noEjs: true },
        { file: 'prepareDockerImage.sh', method: 'copy', noEjs: true },
        { file: 'buildBundle.sh', method: 'copy', noEjs: true },
      ],
    },
    {
      PATH: '.',
      templates: [
        {
          file: 'bundle/descriptor.yaml',
        },
        {
          file: 'bundle/plugins/myplugin.yaml',
          renameTo: generator => `bundle/plugins/${generator.baseName.toLowerCase()}-plugin.yaml`,
        },
      ],
    },
  ],
  docker: [
    {
      condition: generator => generator.authenticationType === 'oauth2',
      path: DOCKER_DIR,
      templates: [
        'keycloak.yml',
        {
          file: 'config/realm-config/jhipster-realm.json',
          renameTo: () => 'realm-config/jhipster-realm.json',
        },
      ],
    },
  ],
  serverBuild: [
    {
      condition: generator => generator.buildTool === 'maven',
      templates: [{ file: 'pom.xml', options: { interpolate: INTERPOLATE_REGEX }, useBluePrint: true }],
    },
  ],
  serverResource: [
    {
      condition: generator => generator.clientFramework !== 'react',
      path: SERVER_MAIN_RES_DIR,
      templates: [{ file: 'banner.txt', method: 'copy', noEjs: true }],
    },
    {
      path: SERVER_MAIN_RES_DIR,
      templates: ['config/application.yml', 'config/application-dev.yml'],
    },
  ],
  serverJavaAuthConfig: [
    {
      condition: generator =>
        generator.databaseType === 'sql' ||
        generator.databaseType === 'mongodb' ||
        generator.databaseType === 'couchbase',
      path: SERVER_MAIN_SRC_DIR,
      templates: [
        {
          file: 'package/security/SpringSecurityAuditorAware.java',
          renameTo: generator => `${generator.javaDir}security/SpringSecurityAuditorAware.java`,
        },
      ],
    },
    {
      condition: generator => !generator.reactive && generator.applicationType !== 'uaa',
      path: SERVER_MAIN_SRC_DIR,
      templates: [
        {
          file: 'package/config/SecurityConfiguration.java',
          renameTo: generator => `${generator.javaDir}config/SecurityConfiguration.java`,
        },
      ],
    },
    {
      condition: generator => !generator.reactive && generator.applicationType !== 'uaa',
      path: SERVER_MAIN_SRC_DIR,
      templates: [
        {
          file: 'package/config/SpringFoxConfiguration.java',
          renameTo: generator => `${generator.javaDir}config/SpringFoxConfiguration.java`,
        },
      ],
    },
    {
      condition: generator => generator.authenticationType === 'oauth2',
      path: SERVER_MAIN_SRC_DIR,
      templates: [
        {
          file: 'package/security/oauth2/JwtAuthorityExtractor.java',
          renameTo: generator => `${generator.javaDir}security/oauth2/JwtAuthorityExtractor.java`,
        },
      ],
    },
  ],
  serverMicroservice: [
    {
      condition: generator => generator.authenticationType === 'oauth2',
      path: SERVER_MAIN_SRC_DIR,
      templates: [
        {
          file: 'package/config/SecurityConfiguration.java',
          renameTo: generator => `${generator.javaDir}config/SecurityConfiguration.java`,
        },
      ],
    },
    {
      condition: generator =>
        !(
          generator.applicationType !== 'microservice' &&
          !(
            generator.applicationType === 'gateway' &&
            (generator.authenticationType === 'uaa' || generator.authenticationType === 'oauth2')
          )
        ) && generator.applicationType === 'microservice',
      path: SERVER_MAIN_RES_DIR,
      templates: [
        { file: 'static/microservices_index.html', method: 'copy', renameTo: () => 'static/index.html' },
        { file: 'static/favicon.png', method: 'copy', renameTo: () => 'static/favicon.png' },
      ],
    },
  ],
  serverJavaApp: [
    {
      path: SERVER_MAIN_SRC_DIR,
      templates: [
        {
          file: 'package/Application.java',
          renameTo: generator => `${generator.javaDir}${generator.mainClass}.java`,
        },
      ],
    },
  ],
  serverJavaConfig: [
    {
      condition: generator =>
        ['ehcache', 'caffeine', 'hazelcast', 'infinispan', 'memcached'].includes(generator.cacheProvider) ||
        generator.applicationType === 'gateway',
      path: SERVER_MAIN_SRC_DIR,
      templates: [
        {
          file: 'package/config/CacheConfiguration.java',
          renameTo: generator => `${generator.javaDir}config/CacheConfiguration.java`,
        },
      ],
    },
  ],
};

function writeFiles() {
  return {
    setUp() {
      this.javaDir = `${this.packageFolder}/`;
      this.testDir = `${this.packageFolder}/`;

      // Create Java resource files
      mkdirp(SERVER_MAIN_RES_DIR);
      mkdirp(`${SERVER_TEST_SRC_DIR}/${this.testDir}`);
      this.generateKeyStore();
    },

    cleanupOldServerFiles() {
      cleanup.cleanupOldServerFiles(
        this,
        `${SERVER_MAIN_SRC_DIR}/${this.javaDir}`,
        `${SERVER_TEST_SRC_DIR}/${this.testDir}`,
        SERVER_MAIN_RES_DIR,
        SERVER_TEST_RES_DIR,
      );
    },

    writeFiles() {
      this.writeFilesToDisk(serverFiles, this, false, null);
    },
  };
}

module.exports = {
  writeFiles,
  serverFiles,
};
