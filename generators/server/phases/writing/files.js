const mkdirp = require('mkdirp');
const cleanup = require('generator-jhipster/generators/cleanup');
const constants = require('generator-jhipster/generators/generator-constants');

const {
  INTERPOLATE_REGEX,
  DOCKER_DIR,
  TEST_DIR,
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
      condition: generator => generator.clientFramework === 'react',
      path: SERVER_MAIN_RES_DIR,
      templates: [
        {
          file: 'banner-react.txt',
          method: 'copy',
          noEjs: true,
          renameTo: () => 'banner.txt',
        },
      ],
    },
    {
      condition: generator => generator.clientFramework !== 'react',
      path: SERVER_MAIN_RES_DIR,
      templates: [{ file: 'banner.txt', method: 'copy', noEjs: true }],
    },
    {
      condition: generator =>
        generator.devDatabaseType === 'h2Disk' || generator.devDatabaseType === 'h2Memory',
      path: SERVER_MAIN_RES_DIR,
      templates: [
        { file: 'h2.server.properties', renameTo: () => '.h2.server.properties', useBluePrint: true },
      ],
    },
    {
      condition: generator => !!generator.enableSwaggerCodegen,
      path: SERVER_MAIN_RES_DIR,
      templates: ['swagger/api.yml'],
    },
    {
      path: SERVER_MAIN_RES_DIR,
      templates: [
        // Thymeleaf templates
        { file: 'templates/error.html', method: 'copy' },
        'logback-spring.xml',
        'config/application.yml',
        'config/application-dev.yml',
        'config/application-tls.yml',
        'config/application-prod.yml',
        'i18n/messages.properties',
      ],
    },
    {
      condition: generator => generator.databaseType === 'sql',
      path: SERVER_MAIN_RES_DIR,
      templates: [
        {
          file: 'config/liquibase/changelog/initial_schema.xml',
          renameTo: () => 'config/liquibase/changelog/00000000000000_initial_schema.xml',
          options: { interpolate: INTERPOLATE_REGEX },
        },
        'config/liquibase/master.xml',
      ],
    },
    {
      condition: generator => generator.databaseType === 'couchbase',
      path: SERVER_MAIN_RES_DIR,
      templates: ['config/couchmove/changelog/V0__create_indexes.n1ql'],
    },
    {
      condition: generator =>
        generator.databaseType === 'couchbase' &&
        (!generator.skipUserManagement || generator.authenticationType === 'oauth2'),
      path: SERVER_MAIN_RES_DIR,
      templates: [
        'config/couchmove/changelog/V0.1__initial_setup/ROLE_ADMIN.json',
        'config/couchmove/changelog/V0.1__initial_setup/ROLE_USER.json',
        'config/couchmove/changelog/V0.1__initial_setup/user__admin.json',
        'config/couchmove/changelog/V0.1__initial_setup/user__anonymoususer.json',
        'config/couchmove/changelog/V0.1__initial_setup/user__system.json',
        'config/couchmove/changelog/V0.1__initial_setup/user__user.json',
      ],
    },
    {
      condition: generator => generator.databaseType === 'cassandra',
      path: SERVER_MAIN_RES_DIR,
      templates: [
        'config/cql/create-keyspace-prod.cql',
        'config/cql/create-keyspace.cql',
        'config/cql/drop-keyspace.cql',
        { file: 'config/cql/changelog/README.md', method: 'copy' },
      ],
    },
    {
      condition: generator =>
        generator.databaseType === 'cassandra' &&
        generator.applicationType !== 'microservice' &&
        (!generator.skipUserManagement || generator.authenticationType === 'oauth2'),
      path: SERVER_MAIN_RES_DIR,
      templates: [
        {
          file: 'config/cql/changelog/create-tables.cql',
          renameTo: () => 'config/cql/changelog/00000000000000_create-tables.cql',
        },
        {
          file: 'config/cql/changelog/insert_default_users.cql',
          renameTo: () => 'config/cql/changelog/00000000000001_insert_default_users.cql',
        },
      ],
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
    {
      condition: generator => generator.authenticationType === 'oauth2',
      path: SERVER_TEST_SRC_DIR,
      templates: [
        {
          file: 'package/security/oauth2/AudienceValidatorTest.java',
          renameTo: generator => `${generator.javaDir}security/oauth2/AudienceValidatorTest.java`,
        },
        {
          file: 'package/config/TestSecurityConfiguration.java',
          renameTo: generator => `${generator.testDir}config/TestSecurityConfiguration.java`,
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
    {
      path: SERVER_TEST_SRC_DIR,
      templates: [
        {
          file: 'package/ArchTest.java',
          renameTo: generator => `${generator.testDir}ArchTest.java`,
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
  serverTestFw: [
    {
      condition: generator => generator.databaseType === 'cassandra',
      path: SERVER_TEST_SRC_DIR,
      templates: [
        {
          file: 'package/CassandraKeyspaceIT.java',
          renameTo: generator => `${generator.testDir}CassandraKeyspaceIT.java`,
        },
        {
          file: 'package/AbstractCassandraTest.java',
          renameTo: generator => `${generator.testDir}AbstractCassandraTest.java`,
        },
        {
          file: 'package/config/CassandraConfigurationIT.java',
          renameTo: generator => `${generator.testDir}config/CassandraConfigurationIT.java`,
        },
      ],
    },
    {
      condition: generator => generator.databaseType === 'couchbase',
      path: SERVER_TEST_SRC_DIR,
      templates: [
        {
          file: 'package/config/DatabaseConfigurationIT.java',
          renameTo: generator => `${generator.testDir}config/DatabaseConfigurationIT.java`,
        },
      ],
    },
    {
      path: SERVER_TEST_SRC_DIR,
      templates: [
        {
          file: 'package/web/rest/TestUtil.java',
          renameTo: generator => `${generator.testDir}web/rest/TestUtil.java`,
        },
        {
          file: 'package/web/rest/errors/ExceptionTranslatorIT.java',
          renameTo: generator => `${generator.testDir}web/rest/errors/ExceptionTranslatorIT.java`,
        },
        {
          file: 'package/web/rest/errors/ExceptionTranslatorTestController.java',
          renameTo: generator => `${generator.testDir}web/rest/errors/ExceptionTranslatorTestController.java`,
        },
      ],
    },
    {
      condition: generator => !generator.skipClient && !generator.reactive,
      path: SERVER_TEST_SRC_DIR,
      templates: [
        {
          file: 'package/web/rest/ClientForwardControllerIT.java',
          renameTo: generator => `${generator.testDir}web/rest/ClientForwardControllerIT.java`,
        },
      ],
    },
    {
      condition: generator => generator.databaseType === 'sql',
      path: SERVER_TEST_SRC_DIR,
      templates: [
        {
          file: 'package/config/timezone/HibernateTimeZoneIT.java',
          renameTo: generator => `${generator.testDir}config/timezone/HibernateTimeZoneIT.java`,
        },
        {
          file: 'package/repository/timezone/DateTimeWrapper.java',
          renameTo: generator => `${generator.testDir}repository/timezone/DateTimeWrapper.java`,
        },
        {
          file: 'package/repository/timezone/DateTimeWrapperRepository.java',
          renameTo: generator => `${generator.testDir}repository/timezone/DateTimeWrapperRepository.java`,
        },
      ],
    },
    {
      path: SERVER_TEST_RES_DIR,
      templates: ['config/application.yml', 'logback.xml'],
    },
    {
      // TODO : add these tests to reactive
      condition: generator => !generator.reactive,
      path: SERVER_TEST_SRC_DIR,
      templates: [
        {
          file: 'package/config/WebConfigurerTest.java',
          renameTo: generator => `${generator.testDir}config/WebConfigurerTest.java`,
        },
        {
          file: 'package/config/WebConfigurerTestController.java',
          renameTo: generator => `${generator.testDir}config/WebConfigurerTestController.java`,
        },
      ],
    },
    {
      condition: generator => generator.applicationType === 'gateway' && generator.serviceDiscoveryType,
      path: SERVER_TEST_SRC_DIR,
      templates: [
        // Create Gateway tests files
        {
          file: 'package/gateway/responserewriting/SwaggerBasePathRewritingFilterTest.java',
          renameTo: generator =>
            `${generator.testDir}gateway/responserewriting/SwaggerBasePathRewritingFilterTest.java`,
        },
      ],
    },
    {
      condition: generator => generator.serviceDiscoveryType,
      path: SERVER_TEST_RES_DIR,
      templates: ['config/bootstrap.yml'],
    },
    {
      condition: generator => generator.authenticationType === 'uaa',
      path: SERVER_TEST_SRC_DIR,
      templates: [
        {
          file: 'package/security/OAuth2TokenMockUtil.java',
          renameTo: generator => `${generator.testDir}security/OAuth2TokenMockUtil.java`,
        },
        {
          file: 'package/config/SecurityBeanOverrideConfiguration.java',
          renameTo: generator => `${generator.testDir}config/SecurityBeanOverrideConfiguration.java`,
        },
      ],
    },
    {
      condition: generator =>
        generator.authenticationType === 'uaa' && generator.applicationType === 'gateway',
      path: SERVER_TEST_SRC_DIR,
      templates: [
        {
          file: 'package/security/oauth2/OAuth2CookieHelperTest.java',
          renameTo: generator => `${generator.testDir}security/oauth2/OAuth2CookieHelperTest.java`,
        },
        {
          file: 'package/security/oauth2/OAuth2AuthenticationServiceTest.java',
          renameTo: generator => `${generator.testDir}security/oauth2/OAuth2AuthenticationServiceTest.java`,
        },
        {
          file: 'package/security/oauth2/CookieTokenExtractorTest.java',
          renameTo: generator => `${generator.testDir}security/oauth2/CookieTokenExtractorTest.java`,
        },
        {
          file: 'package/security/oauth2/CookieCollectionTest.java',
          renameTo: generator => `${generator.testDir}security/oauth2/CookieCollectionTest.java`,
        },
      ],
    },
    {
      condition: generator => {
        if (generator.gatlingTests) {
          mkdirp(`${TEST_DIR}gatling/user-files/data`);
          mkdirp(`${TEST_DIR}gatling/user-files/bodies`);
          mkdirp(`${TEST_DIR}gatling/user-files/simulations`);
          return true;
        }
        return false;
      },
      path: TEST_DIR,
      templates: [
        // Create Gatling test files
        'gatling/conf/gatling.conf',
        'gatling/conf/logback.xml',
      ],
    },
    {
      condition: generator => generator.cucumberTests,
      path: SERVER_TEST_SRC_DIR,
      templates: [
        // Create Cucumber test files
        {
          file: 'package/cucumber/CucumberIT.java',
          renameTo: generator => `${generator.testDir}cucumber/CucumberIT.java`,
        },
        {
          file: 'package/cucumber/stepdefs/StepDefs.java',
          renameTo: generator => `${generator.testDir}cucumber/stepdefs/StepDefs.java`,
        },
        {
          file: 'package/cucumber/CucumberContextConfiguration.java',
          renameTo: generator => `${generator.testDir}cucumber/CucumberContextConfiguration.java`,
        },
        { file: '../features/gitkeep', noEjs: true },
      ],
    },
    {
      condition: generator => generator.messageBroker === 'kafka',
      path: SERVER_TEST_SRC_DIR,
      templates: [
        {
          file: 'package/web/rest/KafkaResourceIT.java',
          renameTo: generator =>
            `${generator.testDir}web/rest/${generator.upperFirstCamelCase(
              generator.baseName,
            )}KafkaResourceIT.java`,
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
