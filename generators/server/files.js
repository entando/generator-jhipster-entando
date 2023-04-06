const constants = require('generator-jhipster/generators/generator-constants');
const entConstants = require('../generator-constants');

const { INTERPOLATE_REGEX, DOCKER_DIR, SERVER_MAIN_SRC_DIR, SERVER_MAIN_RES_DIR, SERVER_TEST_SRC_DIR, SERVER_TEST_RES_DIR } = constants;
const { REACT } = constants.SUPPORTED_CLIENT_FRAMEWORKS;
const { SCALA_LIBRARY_VERSION, MBKNOR_JACKSON_JSONSCHEMA_VERSION } = entConstants;

/**
 * The default is to use a file path string. It implies use of the template method.
 * For any other config an object { file:.., method:.., template:.. } can be used
 */
const entandoServerFiles = {
  entando: [
    {
      templates: [{ file: 'Dockerfile' }],
    },
  ],
  packageJson: [
    {
      templates: ['package.json'],
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
          renameTo: () => 'keycloak/realm-config/jhipster-realm.json',
        },
        {
          file: 'config/realm-config/jhipster-users-0.json',
          method: 'copy',
          renameTo: () => 'keycloak/realm-config/jhipster-users-0.json',
        },
        {
          file: 'keycloak-db/entando-placeholder',
          method: 'copy',
          noEjs: true,
          renameTo: () => 'keycloak/keycloak-db/.entando-placeholder',
        },
      ],
    },
  ],
  serverBuild: [
    {
      condition: generator => generator.buildTool === 'maven',
      templates: [{ file: 'pom.xml', options: { interpolate: INTERPOLATE_REGEX } }],
    },
  ],
  serverResource: [
    {
      condition: generator => generator.clientFramework !== REACT,
      path: SERVER_MAIN_RES_DIR,
      templates: [{ file: 'banner.txt', method: 'copy', noEjs: true }],
    },
    {
      path: SERVER_MAIN_RES_DIR,
      templates: ['config/application.yml', 'config/application-dev.yml', 'config/application-prod.yml'],
    },
    {
      condition: generator => generator.databaseType === 'sql',
      path: SERVER_MAIN_RES_DIR,
      templates: [
        {
          override: generator => !generator.jhipsterConfig.incrementalChangelog || generator.configOptions.recreateInitialChangelog,
          file: 'config/liquibase/changelog/initial_schema.xml',
          renameTo: () => 'config/liquibase/changelog/00000000000000_initial_schema.xml',
          options: { interpolate: INTERPOLATE_REGEX },
        },
      ],
    },
  ],
  serverJavaWebError: [
    {
      path: SERVER_MAIN_SRC_DIR,
      templates: [
        {
          file: 'package/web/rest/errors/package-info.java',
          renameTo: generator => `${generator.javaDir}web/rest/errors/package-info.java`,
        },
        {
          file: 'package/web/rest/errors/BadRequestAlertException.java',
          renameTo: generator => `${generator.javaDir}web/rest/errors/BadRequestAlertException.java`,
        },
        {
          file: 'package/web/rest/errors/ErrorConstants.java',
          renameTo: generator => `${generator.javaDir}web/rest/errors/ErrorConstants.java`,
        },
        {
          file: 'package/web/rest/errors/ExceptionTranslator.java',
          renameTo: generator => `${generator.javaDir}web/rest/errors/ExceptionTranslator.java`,
        },
        {
          file: 'package/web/rest/errors/FieldErrorVM.java',
          renameTo: generator => `${generator.javaDir}web/rest/errors/FieldErrorVM.java`,
        },
      ],
    },
    {
      condition: generator => !generator.skipUserManagement,
      path: SERVER_MAIN_SRC_DIR,
      templates: [
        {
          file: 'package/web/rest/errors/EmailAlreadyUsedException.java',
          renameTo: generator => `${generator.javaDir}web/rest/errors/EmailAlreadyUsedException.java`,
        },
        {
          file: 'package/web/rest/errors/InvalidPasswordException.java',
          renameTo: generator => `${generator.javaDir}web/rest/errors/InvalidPasswordException.java`,
        },
        {
          file: 'package/web/rest/errors/LoginAlreadyUsedException.java',
          renameTo: generator => `${generator.javaDir}web/rest/errors/LoginAlreadyUsedException.java`,
        },
      ],
    },
  ],
  serverJavaAuthConfig: [
    {
      condition: generator => !generator.reactive,
      path: SERVER_MAIN_SRC_DIR,
      templates: [
        {
          file: 'package/config/SecurityConfiguration.java',
          renameTo: generator => `${generator.javaDir}config/SecurityConfiguration.java`,
        },
      ],
    },
    {
      condition: generator => !generator.reactive,
      path: SERVER_MAIN_SRC_DIR,
      templates: [
        {
          file: 'package/config/OpenApiConfiguration.java',
          renameTo: generator => `${generator.javaDir}config/OpenApiConfiguration.java`,
        },
      ],
    },
    {
      condition: generator => generator.authenticationType === 'oauth2',
      path: SERVER_MAIN_SRC_DIR,
      templates: [
        {
          file: 'package/security/oauth2/JwtGrantedAuthorityConverter.java',
          renameTo: generator => `${generator.javaDir}security/oauth2/JwtGrantedAuthorityConverter.java`,
        },
      ],
    },
  ],
  serverMicroservice: [
    {
      condition: generator => generator.applicationType === 'microservice',
      path: SERVER_MAIN_RES_DIR,
      templates: [
        { file: 'static/microservices_index.html', renameTo: () => 'static/index.html' },
        { file: 'static/favicon.png', renameTo: () => 'static/favicon.png' },
      ],
    },
  ],
  serverJavaConfig: [
    {
      condition: generator =>
        ['ehcache', 'caffeine', 'hazelcast', 'infinispan', 'memcached', 'redis'].includes(generator.cacheProvider) ||
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
      path: SERVER_TEST_RES_DIR,
      templates: ['config/application.yml'],
    },
  ],
  serverJavaApp: [
    {
      path: SERVER_TEST_SRC_DIR,
      templates: [
        {
          file: 'package/TechnicalStructureTest.java',
          renameTo: generator => `${generator.testDir}TechnicalStructureTest.java`,
        },
      ],
    },
  ],
};

const toDeleteServerFiles = {
  serverJavaUserManagement: [
    {
      condition: generator =>
        (generator.authenticationType === 'oauth2' && generator.applicationType !== 'microservice') ||
        (!generator.skipUserManagement && generator.databaseType === 'sql'),
      path: SERVER_MAIN_RES_DIR,
      templates: [{ file: 'config/liquibase/data/user.csv', method: 'delete' }],
    },
    {
      condition: generator =>
        (generator.authenticationType === 'oauth2' && generator.applicationType !== 'microservice' && generator.databaseType === 'sql') ||
        (!generator.skipUserManagement && generator.databaseType === 'sql'),
      path: SERVER_MAIN_RES_DIR,
      templates: [
        { file: 'config/liquibase/data/authority.csv', method: 'delete' },
        { file: 'config/liquibase/data/user_authority.csv', method: 'delete' },
      ],
    },
    {
      condition: generator => generator.authenticationType === 'oauth2',
      path: SERVER_MAIN_SRC_DIR,
      templates: [
        {
          file: 'package/service/UserService.java',
          renameTo: generator => `${generator.javaDir}service/UserService.java`,
          method: 'delete',
        },
        {
          file: 'package/service/dto/AdminUserDTO.java',
          renameTo: generator => `${generator.javaDir}service/dto/${generator.asDto('AdminUser')}.java`,
          method: 'delete',
        },
        {
          file: 'package/service/dto/UserDTO.java',
          renameTo: generator => `${generator.javaDir}service/dto/${generator.asDto('User')}.java`,
          method: 'delete',
        },
      ],
    },
    {
      condition: generator => generator.authenticationType === 'oauth2' && generator.databaseType !== 'no',
      path: SERVER_MAIN_SRC_DIR,
      templates: [
        {
          file: 'package/domain/User.java',
          renameTo: generator => `${generator.javaDir}domain/${generator.asEntity('User')}.java`,
          method: 'delete',
        },
        {
          file: 'package/domain/Authority.java',
          renameTo: generator => `${generator.javaDir}domain/Authority.java`,
          method: 'delete',
        },
        {
          file: 'package/service/mapper/UserMapper.java',
          renameTo: generator => `${generator.javaDir}service/mapper/UserMapper.java`,
          method: 'delete',
        },
        {
          file: 'package/repository/UserRepository.java',
          renameTo: generator => `${generator.javaDir}repository/UserRepository.java`,
          method: 'delete',
        },
        {
          file: 'package/repository/AuthorityRepository.java',
          renameTo: generator => `${generator.javaDir}repository/AuthorityRepository.java`,
          method: 'delete',
        },
        {
          file: 'package/web/rest/UserResource.java',
          renameTo: generator => `${generator.javaDir}web/rest/UserResource.java`,
          method: 'delete',
        },
        {
          file: 'package/web/rest/PublicUserResource.java',
          renameTo: generator => `${generator.javaDir}web/rest/PublicUserResource.java`,
          method: 'delete',
        },
        {
          file: 'package/web/rest/vm/ManagedUserVM.java',
          renameTo: generator => `${generator.javaDir}web/rest/vm/ManagedUserVM.java`,
          method: 'delete',
        },
      ],
    },
    {
      condition: generator => generator.authenticationType === 'oauth2',
      path: SERVER_TEST_SRC_DIR,
      templates: [
        {
          file: 'package/service/UserServiceIT.java',
          renameTo: generator => `${generator.testDir}service/UserServiceIT.java`,
          method: 'delete',
        },
      ],
    },
    {
      condition: generator => generator.authenticationType === 'oauth2' && generator.databaseType !== 'no',
      path: SERVER_TEST_SRC_DIR,
      templates: [
        {
          file: 'package/service/mapper/UserMapperTest.java',
          renameTo: generator => `${generator.testDir}service/mapper/UserMapperTest.java`,
          method: 'delete',
        },
        {
          file: 'package/web/rest/PublicUserResourceIT.java',
          renameTo: generator => `${generator.testDir}web/rest/PublicUserResourceIT.java`,
          method: 'delete',
        },
        {
          file: 'package/web/rest/UserResourceIT.java',
          renameTo: generator => `${generator.testDir}web/rest/UserResourceIT.java`,
          method: 'delete',
        },
      ],
    },
    {
      condition: generator => generator.authenticationType === 'oauth2' && generator.searchEngine === 'elasticsearch',
      path: SERVER_MAIN_SRC_DIR,
      templates: [
        {
          file: 'package/repository/search/UserSearchRepository.java',
          renameTo: generator => `${generator.javaDir}repository/search/UserSearchRepository.java`,
          method: 'delete',
        },
      ],
    },
    {
      condition: generator => generator.authenticationType === 'oauth2' && generator.searchEngine === 'elasticsearch',
      path: SERVER_TEST_SRC_DIR,
      templates: [
        {
          file: 'package/repository/search/UserSearchRepositoryMockConfiguration.java',
          renameTo: generator => `${generator.testDir}repository/search/UserSearchRepositoryMockConfiguration.java`,
          method: 'delete',
        },
      ],
    },
    {
      condition: generator =>
        generator.authenticationType === 'oauth2' && ['sql', 'mongodb', 'couchbase', 'neo4j'].includes(generator.databaseType),
      path: SERVER_MAIN_SRC_DIR,
      templates: [
        {
          file: 'package/repository/AuthorityRepository.java',
          renameTo: generator => `${generator.javaDir}repository/AuthorityRepository.java`,
          method: 'delete',
        },
      ],
    },
    {
      condition: generator => !generator.skipUserManagement,
      path: SERVER_MAIN_RES_DIR,
      templates: [
        { file: 'templates/mail/activationEmail.html', method: 'delete' },
        { file: 'templates/mail/creationEmail.html', method: 'delete' },
        { file: 'templates/mail/passwordResetEmail.html', method: 'delete' },
      ],
    },
    {
      condition: generator => !generator.skipUserManagement && ['sql', 'mongodb', 'couchbase', 'neo4j'].includes(generator.databaseType),
      path: SERVER_MAIN_SRC_DIR,
      templates: [
        {
          file: 'package/domain/Authority.java',
          renameTo: generator => `${generator.javaDir}domain/Authority.java`,
          method: 'delete',
        },
        {
          file: 'package/repository/AuthorityRepository.java',
          renameTo: generator => `${generator.javaDir}repository/AuthorityRepository.java`,
          method: 'delete',
        },
      ],
    },
    {
      condition: generator => !generator.skipUserManagement,
      path: SERVER_MAIN_SRC_DIR,
      templates: [
        /* User management java domain files */
        {
          file: 'package/domain/User.java',
          renameTo: generator => `${generator.javaDir}domain/${generator.asEntity('User')}.java`,
          method: 'delete',
        },
        {
          file: 'package/repository/UserRepository.java',
          renameTo: generator => `${generator.javaDir}repository/UserRepository.java`,
          method: 'delete',
        },

        /* User management java service files */
        {
          file: 'package/service/UserService.java',
          renameTo: generator => `${generator.javaDir}service/UserService.java`,
          method: 'delete',
        },
        {
          file: 'package/service/MailService.java',
          renameTo: generator => `${generator.javaDir}service/MailService.java`,
          method: 'delete',
        },

        /* User management java web files */
        {
          file: 'package/service/dto/AdminUserDTO.java',
          renameTo: generator => `${generator.javaDir}service/dto/${generator.asDto('AdminUser')}.java`,
          method: 'delete',
        },
        {
          file: 'package/service/dto/UserDTO.java',
          renameTo: generator => `${generator.javaDir}service/dto/${generator.asDto('User')}.java`,
          method: 'delete',
        },
        {
          file: 'package/service/dto/PasswordChangeDTO.java',
          renameTo: generator => `${generator.javaDir}service/dto/PasswordChangeDTO.java`,
          method: 'delete',
        },
        {
          file: 'package/web/rest/vm/ManagedUserVM.java',
          renameTo: generator => `${generator.javaDir}web/rest/vm/ManagedUserVM.java`,
          method: 'delete',
        },
        {
          file: 'package/web/rest/AccountResource.java',
          renameTo: generator => `${generator.javaDir}web/rest/AccountResource.java`,
          method: 'delete',
        },
        {
          file: 'package/web/rest/UserResource.java',
          renameTo: generator => `${generator.javaDir}web/rest/UserResource.java`,
          method: 'delete',
        },
        {
          file: 'package/web/rest/PublicUserResource.java',
          renameTo: generator => `${generator.javaDir}web/rest/PublicUserResource.java`,
          method: 'delete',
        },
        {
          file: 'package/web/rest/vm/KeyAndPasswordVM.java',
          renameTo: generator => `${generator.javaDir}web/rest/vm/KeyAndPasswordVM.java`,
          method: 'delete',
        },
        {
          file: 'package/service/mapper/UserMapper.java',
          renameTo: generator => `${generator.javaDir}service/mapper/UserMapper.java`,
          method: 'delete',
        },
      ],
    },
    {
      condition: generator => !generator.skipUserManagement && generator.searchEngine === 'elasticsearch',
      path: SERVER_MAIN_SRC_DIR,
      templates: [
        {
          file: 'package/repository/search/UserSearchRepository.java',
          renameTo: generator => `${generator.javaDir}repository/search/UserSearchRepository.java`,
          method: 'delete',
        },
      ],
    },
    {
      condition: generator => !generator.skipUserManagement && generator.searchEngine === 'elasticsearch',
      path: SERVER_TEST_SRC_DIR,
      templates: [
        {
          file: 'package/repository/search/UserSearchRepositoryMockConfiguration.java',
          renameTo: generator => `${generator.testDir}repository/search/UserSearchRepositoryMockConfiguration.java`,
          method: 'delete',
        },
      ],
    },
    {
      condition: generator => generator.authenticationType === 'jwt',
      path: SERVER_TEST_SRC_DIR,
      templates: [
        {
          file: 'package/security/jwt/TokenProviderTest.java',
          renameTo: generator => `${generator.testDir}security/jwt/TokenProviderTest.java`,
          method: 'delete',
        },
        {
          file: 'package/security/jwt/JWTFilterTest.java',
          renameTo: generator => `${generator.testDir}security/jwt/JWTFilterTest.java`,
          method: 'delete',
        },
      ],
    },
    {
      condition: generator => !generator.skipUserManagement && generator.cucumberTests,
      path: SERVER_TEST_SRC_DIR,
      templates: [
        {
          file: 'package/cucumber/stepdefs/UserStepDefs.java',
          renameTo: generator => `${generator.testDir}cucumber/stepdefs/UserStepDefs.java`,
          method: 'delete',
        },
        { file: '../features/user/user.feature', method: 'delete' },
      ],
    },
    {
      condition: generator => !generator.skipUserManagement,
      path: SERVER_TEST_RES_DIR,
      templates: [
        /* User management java test files */
        { file: 'templates/mail/testEmail.html', method: 'delete' },
        { file: 'i18n/messages_en.properties', method: 'delete' },
      ],
    },
    {
      condition: generator => !generator.skipUserManagement,
      path: SERVER_TEST_SRC_DIR,
      templates: [
        {
          file: 'package/service/MailServiceIT.java',
          renameTo: generator => `${generator.testDir}service/MailServiceIT.java`,
          method: 'delete',
        },
        {
          file: 'package/service/UserServiceIT.java',
          renameTo: generator => `${generator.testDir}service/UserServiceIT.java`,
          method: 'delete',
        },
        {
          file: 'package/service/mapper/UserMapperTest.java',
          renameTo: generator => `${generator.testDir}service/mapper/UserMapperTest.java`,
          method: 'delete',
        },
        {
          file: 'package/web/rest/AccountResourceIT.java',
          renameTo: generator => `${generator.testDir}web/rest/AccountResourceIT.java`,
          method: 'delete',
        },
        {
          file: 'package/config/NoOpMailConfiguration.java',
          renameTo: generator => `${generator.testDir}config/NoOpMailConfiguration.java`,
          method: 'delete',
        },
        {
          file: 'package/web/rest/PublicUserResourceIT.java',
          renameTo: generator => `${generator.testDir}web/rest/PublicUserResourceIT.java`,
          method: 'delete',
        },
        {
          file: 'package/web/rest/UserResourceIT.java',
          renameTo: generator => `${generator.testDir}web/rest/UserResourceIT.java`,
          method: 'delete',
        },
      ],
    },
    {
      condition: generator => !generator.skipUserManagement && generator.authenticationType !== 'oauth2',
      path: SERVER_TEST_SRC_DIR,
      templates: [
        {
          file: 'package/web/rest/WithUnauthenticatedMockUser.java',
          renameTo: generator => `${generator.testDir}web/rest/WithUnauthenticatedMockUser.java`,
          method: 'delete',
        },
      ],
    },
  ],
};

function writeFiles() {
  return {
    writeEntandoFiles() {
      this.writeFilesToDisk(entandoServerFiles, this, false, null);
      this.writeFilesToDisk(toDeleteServerFiles, this, false, null);
    },

    addUnspecificDependencies() {
      this.addMavenDependency('javax.servlet', 'javax.servlet-api', null, null);
      /*
      this.addMavenDependency(
        'org.springframework.boot',
        'spring-boot-starter-undertow',
        null,
        '<scope>provided</scope>',
      );
      */
    },

    addJsonSchemaDependencies() {
      this.addMavenDependency('org.scala-lang', 'scala-library', SCALA_LIBRARY_VERSION);
      this.addMavenDependency(
        'com.kjetland',
        'mbknor-jackson-jsonschema_2.12',
        MBKNOR_JACKSON_JSONSCHEMA_VERSION,
        '            <exclusions>\n' +
          '                <exclusion>\n' +
          '                    <groupId>org.scala-lang</groupId>\n' +
          '                    <artifactId>scala-library</artifactId>\n' +
          '                </exclusion>\n' +
          '            </exclusions>'
      );
    },

    addMavenSnapshotRepository() {
      this.addMavenRepository('snapshot-repo', 'https://oss.sonatype.org/content/repositories/snapshots');
    },
  };
}

module.exports = {
  writeFiles,
};
