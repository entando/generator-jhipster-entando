const constants = require('generator-jhipster/generators/generator-constants');
const entConstants = require('../generator-constants');

const {
  INTERPOLATE_REGEX,
  DOCKER_DIR,
  SERVER_MAIN_SRC_DIR,
  SERVER_MAIN_RES_DIR,
  SERVER_TEST_SRC_DIR,
  SERVER_TEST_RES_DIR,
} = constants;

const { SCALA_LIBRARY_VERSION, MBKNOR_JACKSON_JSONSCHEMA_VERSION } = entConstants;

/**
 * The default is to use a file path string. It implies use of the template method.
 * For any other config an object { file:.., method:.., template:.. } can be used
 */
const entandoServerFiles = {
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
        {
          file: 'config/realm-config/jhipster-users-0.json',
          method: 'copy',
          renameTo: () => 'realm-config/jhipster-users-0.json',
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
      condition: generator => generator.clientFramework !== 'react',
      path: SERVER_MAIN_RES_DIR,
      templates: [{ file: 'banner.txt', method: 'copy', noEjs: true }],
    },
    {
      path: SERVER_MAIN_RES_DIR,
      templates: ['config/application.yml', 'config/application-dev.yml'],
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
          file: 'package/security/oauth2/JwtGrantedAuthorityConverter.java',
          renameTo: generator => `${generator.javaDir}security/oauth2/JwtGrantedAuthorityConverter.java`,
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
      path: SERVER_TEST_RES_DIR,
      templates: ['config/application.yml'],
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
        (generator.authenticationType === 'oauth2' &&
          generator.applicationType !== 'microservice' &&
          generator.databaseType === 'sql') ||
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
          file: 'package/web/rest/UserResourceIT.java',
          renameTo: generator => `${generator.testDir}web/rest/UserResourceIT.java`,
          method: 'delete',
        },
      ],
    },
    {
      condition: generator =>
        generator.authenticationType === 'oauth2' && generator.searchEngine === 'elasticsearch',
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
      condition: generator =>
        generator.authenticationType === 'oauth2' && generator.searchEngine === 'elasticsearch',
      path: SERVER_TEST_SRC_DIR,
      templates: [
        {
          file: 'package/repository/search/UserSearchRepositoryMockConfiguration.java',
          renameTo: generator =>
            `${generator.testDir}repository/search/UserSearchRepositoryMockConfiguration.java`,
          method: 'delete',
        },
      ],
    },
    {
      condition: generator =>
        generator.authenticationType === 'oauth2' &&
        ['sql', 'mongodb', 'couchbase', 'neo4j'].includes(generator.databaseType),
      path: SERVER_MAIN_SRC_DIR,
      templates: [
        {
          file: 'package/repository/AuthorityRepository.java',
          renameTo: generator => `${generator.javaDir}repository/AuthorityRepository.java`,
          method: 'delete',
        },
        {
          file: 'package/repository/PersistenceAuditEventRepository.java',
          renameTo: generator => `${generator.javaDir}repository/PersistenceAuditEventRepository.java`,
          method: 'delete',
        },
        {
          file: 'package/service/AuditEventService.java',
          renameTo: generator => `${generator.javaDir}service/AuditEventService.java`,
          method: 'delete',
        },
        {
          file: 'package/web/rest/AuditResource.java',
          renameTo: generator => `${generator.javaDir}web/rest/AuditResource.java`,
          method: 'delete',
        },
      ],
    },
    {
      condition: generator =>
        !generator.reactive &&
        generator.authenticationType === 'oauth2' &&
        ['sql', 'mongodb', 'couchbase', 'neo4j'].includes(generator.databaseType),
      path: SERVER_MAIN_SRC_DIR,
      templates: [
        {
          file: 'package/repository/CustomAuditEventRepository.java',
          renameTo: generator => `${generator.javaDir}repository/CustomAuditEventRepository.java`,
          method: 'delete',
        },
      ],
    },
    {
      condition: generator =>
        generator.authenticationType === 'oauth2' &&
        ['sql', 'mongodb', 'couchbase', 'neo4j'].includes(generator.databaseType),
      path: SERVER_TEST_SRC_DIR,
      templates: [
        {
          file: 'package/web/rest/AuditResourceIT.java',
          renameTo: generator => `${generator.testDir}web/rest/AuditResourceIT.java`,
          method: 'delete',
        },
      ],
    },
    {
      condition: generator =>
        !generator.reactive &&
        generator.authenticationType === 'oauth2' &&
        ['sql', 'mongodb', 'couchbase', 'neo4j'].includes(generator.databaseType),
      path: SERVER_TEST_SRC_DIR,
      templates: [
        {
          file: 'package/repository/CustomAuditEventRepositoryIT.java',
          renameTo: generator => `${generator.testDir}repository/CustomAuditEventRepositoryIT.java`,
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
      condition: generator =>
        !generator.skipUserManagement &&
        ['sql', 'mongodb', 'couchbase', 'neo4j'].includes(generator.databaseType),
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
        {
          file: 'package/repository/PersistenceAuditEventRepository.java',
          renameTo: generator => `${generator.javaDir}repository/PersistenceAuditEventRepository.java`,
          method: 'delete',
        },
        {
          file: 'package/service/AuditEventService.java',
          renameTo: generator => `${generator.javaDir}service/AuditEventService.java`,
          method: 'delete',
        },
        {
          file: 'package/web/rest/AuditResource.java',
          renameTo: generator => `${generator.javaDir}web/rest/AuditResource.java`,
          method: 'delete',
        },
      ],
    },
    {
      condition: generator =>
        !generator.reactive &&
        !generator.skipUserManagement &&
        ['sql', 'mongodb', 'couchbase', 'neo4j'].includes(generator.databaseType),
      path: SERVER_MAIN_SRC_DIR,
      templates: [
        {
          file: 'package/repository/CustomAuditEventRepository.java',
          renameTo: generator => `${generator.javaDir}repository/CustomAuditEventRepository.java`,
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
          renameTo: generator =>
            `${generator.testDir}repository/search/UserSearchRepositoryMockConfiguration.java`,
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
      condition: generator =>
        !generator.skipUserManagement &&
        ['sql', 'mongodb', 'couchbase', 'neo4j'].includes(generator.databaseType),
      path: SERVER_TEST_SRC_DIR,
      templates: [
        {
          file: 'package/web/rest/AuditResourceIT.java',
          renameTo: generator => `${generator.testDir}web/rest/AuditResourceIT.java`,
          method: 'delete',
        },
        {
          file: 'package/service/AuditEventServiceIT.java',
          renameTo: generator => `${generator.testDir}service/AuditEventServiceIT.java`,
          method: 'delete',
        },
      ],
    },
    {
      condition: generator =>
        !generator.reactive &&
        !generator.skipUserManagement &&
        ['sql', 'mongodb', 'couchbase', 'neo4j'].includes(generator.databaseType),
      path: SERVER_TEST_SRC_DIR,
      templates: [
        {
          file: 'package/repository/CustomAuditEventRepositoryIT.java',
          renameTo: generator => `${generator.testDir}repository/CustomAuditEventRepositoryIT.java`,
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
      if (this.buildTool === 'maven') {
        this.addMavenDependency('javax.servlet', 'javax.servlet-api', null, null);
        this.addMavenDependency(
          'org.springframework.boot',
          'spring-boot-starter-undertow',
          null,
          '<scope>provided</scope>',
        );
      } else if (this.buildTool === 'gradle') {
        this.addGradleDependency('implementation', 'javax.servlet', 'javax.servlet-api', null);
        this.addGradleDependency(
          'compileOnly',
          'org.springframework.boot',
          'spring-boot-starter-undertow',
          null,
        );
      }
    },

    addJsonSchemaDependencies() {
      if (this.buildTool === 'maven') {
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
            '            </exclusions>',
        );
      } else if (this.buildTool === 'gradle') {
        this.addGradleDependency('implementation', 'org.scala-lang', 'scala-library', SCALA_LIBRARY_VERSION);
        this.addGradleDependency(
          'implementation',
          'com.kjetland',
          'mbknor-jackson-jsonschema_2.12',
          MBKNOR_JACKSON_JSONSCHEMA_VERSION,
        );
      }
    },

    addMavenSnapshotRepository() {
      this.addMavenRepository('snapshot-repo', 'https://oss.sonatype.org/content/repositories/snapshots');
      this.addGradleMavenRepository('https://oss.sonatype.org/content/repositories/snapshots', null, null);
    },
  };
}

module.exports = {
  writeFiles,
};
