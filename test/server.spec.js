const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const constants = require('generator-jhipster/generators/generator-constants');
const EnvironmentBuilder = require('generator-jhipster/cli/environment-builder');
const entandoConstants = require('../generators/generator-constants');
const expectedFiles = require('./utils/expected-files');

const appBaseName = 'entandoPlugin';
const { DOCKER_DIR, SERVER_MAIN_SRC_DIR, SERVER_MAIN_RES_DIR } = constants;

const { ENTANDO_KEYCLOAK_DOCKER_IMAGE } = entandoConstants;

describe('Subgenerator server of entando JHipster blueprint', () => {
  describe('With default blueprint configuration', () => {
    before(done => {
      helpers
        .run('generator-jhipster/generators/server', {}, { createEnv: EnvironmentBuilder.createEnv })
        .withOptions({
          'from-cli': true,
          skipInstall: true,
          blueprint: 'entando',
          skipChecks: true,
        })
        .withGenerators([
          [
            require('../generators/server/index'), // eslint-disable-line global-require
            'jhipster-entando:server',
            path.join(__dirname, '../generators/server/index'),
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
          nativeLanguage: 'en',
          languages: ['fr', 'de'],
          buildTool: 'maven',
          rememberMeKey: '2bb60a80889aa6e6767e9ccd8714982681152aa5',
          microserviceDependencies: 'entando',
        })
        .on('end', done);
    });

    it('creates expected files for the blueprint', () => {
      assert.file(expectedFiles.server);
    });

    it('creates expected keycloack Entando Placeholder', () => {
      assert.file(expectedFiles['entando-keycloack']);
    });

    it('Should not contains user management files', () => {
      assert.noFile(expectedFiles.userManagement);
    });

    it('application.yml contains swagger-ui', () => {
      assert.fileContent(`${SERVER_MAIN_RES_DIR}config/application.yml`, '      clientId: swagger_ui\n      clientSecret: swagger_ui\n');
    });

    it('pom.xml contains the javax servlet dependency', () => {
      assert.fileContent(
        'pom.xml',
        '        <dependency>\n' +
          '            <groupId>javax.servlet</groupId>\n' +
          '            <artifactId>javax.servlet-api</artifactId>\n' +
          '        </dependency>\n'
      );
    });

    it('pom.xml contains the Undertow dependency', () => {
      assert.fileContent(
        'pom.xml',
        '        <dependency>\n' +
          '            <groupId>org.springframework.boot</groupId>\n' +
          '            <artifactId>spring-boot-starter-undertow</artifactId>\n' +
          '        </dependency>\n'
      );
    });

    it('pom.xml contains the Scala-library dependency', () => {
      assert.fileContent(
        'pom.xml',
        '        <dependency>\n' +
          '            <groupId>org.scala-lang</groupId>\n' +
          '            <artifactId>scala-library</artifactId>\n' +
          '            <version>2.12.1</version>\n' +
          '        </dependency>\n'
      );
    });

    it('pom.xml contains the mbknor-jackson-jsonschema dependency', () => {
      assert.fileContent(
        'pom.xml',
        '        <dependency>\n' +
          '            <groupId>com.kjetland</groupId>\n' +
          '            <artifactId>mbknor-jackson-jsonschema_2.12</artifactId>\n' +
          '            <version>1.0.34</version>\n' +
          '            <exclusions>\n' +
          '                <exclusion>\n' +
          '                    <groupId>org.scala-lang</groupId>\n' +
          '                    <artifactId>scala-library</artifactId>\n' +
          '                </exclusion>\n' +
          '            </exclusions>\n' +
          '        </dependency>'
      );
    });

    it('pom.xml contains springDoc dependency', () => {
      assert.fileContent(
        'pom.xml',
        '        <dependency>\n' +
          '            <groupId>org.springdoc</groupId>\n' +
          '            <artifactId>springdoc-openapi-webmvc-core</artifactId>\n' +
          '        </dependency>\n' +
          '        <dependency> \n' +
          '           <groupId>org.springdoc</groupId>\n' +
          '           <artifactId>springdoc-openapi-ui</artifactId>\n' +
          // eslint-disable-next-line no-template-curly-in-string
          '           <version>${springdoc-openapi-ui.version}</version>\n' +
          '        </dependency>\n'
      );
    });

    it('pom.xml contains the entando-bundle-bom version', () => {
      assert.fileContent('pom.xml', /<entando-bundle-bom\.version>.+<\/entando-bundle-bom\.version>/);
    });

    it('pom.xml contains the entando-bundle-bom dependency', () => {
      assert.fileContent(
        'pom.xml',
        '            <dependency>\n' +
          '                <groupId>org.entando</groupId>\n' +
          '                <artifactId>entando-bundle-bom</artifactId>\n' +
          // eslint-disable-next-line no-template-curly-in-string
          '                <version>${entando-bundle-bom.version}</version>\n' +
          '                <type>pom</type>\n' +
          '                <scope>import</scope>\n' +
          '            </dependency>'
      );
    });

    it('Keycloack docker file contains the Entando modifications', () => {
      assert.fileContent(`${DOCKER_DIR}keycloak.yml`, ENTANDO_KEYCLOAK_DOCKER_IMAGE);
      assert.fileContent(
        `${DOCKER_DIR}keycloak.yml`,
        '    command: [\n' +
          "        '-b',\n" +
          "        '0.0.0.0',\n" +
          "        '-Dkeycloak.profile.feature.scripts=enabled',\n" +
          "        '-Dkeycloak.profile.feature.upload_scripts=enabled',\n" +
          "        '-Dkeycloak.migration.action=import',\n" +
          "        '-Dkeycloak.migration.provider=dir',\n" +
          "        '-Dkeycloak.migration.dir=/opt/keycloak/data/import',\n" +
          "        '-Dkeycloak.migration.strategy=IGNORE_EXISTING', # use 'OVERWRITE_EXISTING' instead if you want to reset your current configuration\n" +
          "        '-Djboss.socket.binding.port-offset=1000',\n" +
          '      ]\n' +
          '    volumes:\n' +
          '      - ./keycloak/realm-config:/opt/keycloak/data/import\n' +
          '      - ./keycloak/keycloak-db:/opt/jboss/keycloak/standalone/data\n'
      );
    });

    it('SecurityConfiguration file contains Entando modifications', () => {
      assert.fileContent(
        `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/config/SecurityConfiguration.java`,
        "                .contentSecurityPolicy(\"default-src 'self' http://localhost:9080; frame-src 'self' data:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://storage.googleapis.com; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:\")"
      );
    });

    it('JHipster-realm.json file contains swagger-ui data', () => {
      assert.fileContent(
        `${DOCKER_DIR}realm-config/jhipster-realm.json`,
        '{\n' +
          '      "id": "d64b8b39-e190-44b8-aafb-13d589e3e21f",\n' +
          '      "clientId": "swagger_ui",\n' +
          '      "rootUrl": "http://localhost:8081",\n' +
          '      "adminUrl": "http://localhost:8081",\n' +
          '      "surrogateAuthRequired": false,\n' +
          '      "enabled": true,\n' +
          '      "clientAuthenticatorType": "client-secret",\n' +
          '      "secret": "swagger_ui",\n' +
          '      "redirectUris": ["http://localhost:*", "https://localhost:*", "http://127.0.0.1:*", "https://127.0.0.1:*", "dev.localhost.ionic:*"],\n' +
          '      "webOrigins": ["*"],\n' +
          '      "notBefore": 0,\n' +
          '      "bearerOnly": false,\n' +
          '      "consentRequired": false,\n' +
          '      "standardFlowEnabled": true,\n' +
          '      "implicitFlowEnabled": true,\n' +
          '      "directAccessGrantsEnabled": false,\n' +
          '      "serviceAccountsEnabled": false,\n' +
          '      "publicClient": true,\n' +
          '      "frontchannelLogout": false,\n' +
          '      "protocol": "openid-connect",\n' +
          '      "attributes": {\n' +
          '        "saml.assertion.signature": "false",\n' +
          '        "saml.force.post.binding": "false",\n' +
          '        "saml.multivalued.roles": "false",\n' +
          '        "saml.encrypt": "false",\n' +
          '        "saml.server.signature": "false",\n' +
          '        "saml.server.signature.keyinfo.ext": "false",\n' +
          '        "exclude.session.state.from.auth.response": "false",\n' +
          '        "saml_force_name_id_format": "false",\n' +
          '        "saml.client.signature": "false",\n' +
          '        "tls.client.certificate.bound.access.tokens": "false",\n' +
          '        "saml.authnstatement": "false",\n' +
          '        "display.on.consent.screen": "false",\n' +
          '        "saml.onetimeuse.condition": "false"\n' +
          '      },\n' +
          '      "authenticationFlowBindingOverrides": {},\n' +
          '      "fullScopeAllowed": true,\n' +
          '      "nodeReRegistrationTimeout": -1,\n' +
          '      "defaultClientScopes": ["web-origins", "jhipster", "role_list", "roles", "profile", "email"],\n' +
          '      "optionalClientScopes": ["address", "phone", "offline_access"]\n' +
          '    }'
      );
    });

    it('Application yaml files contains Entando modifications', () => {
      assert.fileContent(`${SERVER_MAIN_RES_DIR}config/application.yml`, '      clientId: swagger_ui\n      clientSecret: swagger_ui\n');

      assert.fileContent(
        `${SERVER_MAIN_RES_DIR}config/application-dev.yml`,
        '  cors:\n' +
          '    # Allow Ionic for JHipster by default (* no longer allowed in Spring Boot 2.4+)\n' +
          "    allowed-origins: 'http://localhost:[*]'\n" +
          '    # Enable CORS when running in GitHub Codespaces\n' +
          "    allowed-origin-patterns: 'https://*.githubpreview.dev'\n" +
          "    allowed-methods: '*'\n" +
          "    allowed-headers: '*'\n" +
          // eslint-disable-next-line no-template-curly-in-string
          "    exposed-headers: 'Authorization,Link,X-Total-Count,X-${jhipster.clientApp.name}-alert,X-${jhipster.clientApp.name}-error,X-${jhipster.clientApp.name}-params'\n" +
          '    allow-credentials: true\n' +
          '    max-age: 1800\n'
      );
    });

    it('JwtGrantedAuthorityConverter file contains Entando modification', () => {
      assert.fileContent(`${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/security/oauth2/JwtGrantedAuthorityConverter.java`, ":'internal'");
    });

    it('CacheConfiguration file contains Entando modification', () => {
      const cacheConfigurationFileName = `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/config/CacheConfiguration.java`;

      assert.noFileContent(cacheConfigurationFileName, 'import com.mycompany.myapp.repository.UserRepository;\n');
      assert.noFileContent(cacheConfigurationFileName, 'UserRepository.USERS_BY_LOGIN_CACHE');
      assert.noFileContent(cacheConfigurationFileName, 'UserRepository.USERS_BY_EMAIL_CACHE');
      assert.noFileContent(cacheConfigurationFileName, 'Authority.class.getName()');
      assert.noFileContent(cacheConfigurationFileName, 'class.getName() + ".authorities"');
      assert.noFileContent(cacheConfigurationFileName, 'class.getName() + ".persistentTokens"');
    });

    it('CacheConfiguration file contains Entando modification', () => {
      assert.noFileContent(
        `${SERVER_MAIN_RES_DIR}banner.txt`,
        // eslint-disable-next-line no-template-curly-in-string
        "'${AnsiColor.BRIGHT_CYAN}███████╗███╗   ██╗████████╗ █████╗ ███╗   ██╗██████╗  ██████╗ \n" +
          '██╔════╝████╗  ██║╚══██╔══╝██╔══██╗████╗  ██║██╔══██╗██╔═══██╗\n' +
          '█████╗  ██╔██╗ ██║   ██║   ███████║██╔██╗ ██║██║  ██║██║   ██║\n' +
          '██╔══╝  ██║╚██╗██║   ██║   ██╔══██║██║╚██╗██║██║  ██║██║   ██║\n' +
          '███████╗██║ ╚████║   ██║   ██║  ██║██║ ╚████║██████╔╝╚██████╔╝\n' +
          "╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═══╝╚═════╝  ╚═════╝ '"
      );
    });
  });

  describe('With mysql as dev database', () => {
    before(done => {
      helpers
        .run('generator-jhipster/generators/server', {}, { createEnv: EnvironmentBuilder.createEnv })
        .withOptions({
          'from-cli': true,
          skipInstall: true,
          blueprint: 'entando',
          skipChecks: true,
        })
        .withGenerators([
          [
            require('../generators/server/index'), // eslint-disable-line global-require
            'jhipster-entando:server',
            path.join(__dirname, '../generators/server/index'),
          ],
        ])
        .withPrompts({
          baseName: appBaseName,
          packageName: 'com.mycompany.myapp',
          applicationType: 'microservice',
          databaseType: 'sql',
          devDatabaseType: 'mysql',
          prodDatabaseType: 'mysql',
          cacheProvider: 'ehcache',
          authenticationType: 'oauth2',
          enableTranslation: true,
          nativeLanguage: 'en',
          languages: ['fr', 'de'],
          buildTool: 'maven',
          rememberMeKey: '2bb60a80889aa6e6767e9ccd8714982681152aa5',
          microserviceDependencies: 'entando',
        })
        .on('end', done);
    });

    it('creates expected files for the blueprint', () => {
      assert.file(expectedFiles.server);
    });

    it('creates expected MYSQL docker-compose file', () => {
      const dockerComposeFile = expectedFiles['entando-mysql'];
      assert.file(dockerComposeFile);
      assert.fileContent(dockerComposeFile, entandoConstants.ENTANDO_MYSQL_DOCKER_IMAGE);
    });
  });

  describe('With postgresql as dev database', () => {
    before(done => {
      helpers
        .run('generator-jhipster/generators/server', {}, { createEnv: EnvironmentBuilder.createEnv })
        .withOptions({
          'from-cli': true,
          skipInstall: true,
          blueprint: 'entando',
          skipChecks: true,
        })
        .withGenerators([
          [
            require('../generators/server/index'), // eslint-disable-line global-require
            'jhipster-entando:server',
            path.join(__dirname, '../generators/server/index'),
          ],
        ])
        .withPrompts({
          baseName: appBaseName,
          packageName: 'com.mycompany.myapp',
          applicationType: 'microservice',
          databaseType: 'sql',
          devDatabaseType: 'postgresql',
          prodDatabaseType: 'postgresql',
          cacheProvider: 'ehcache',
          authenticationType: 'oauth2',
          enableTranslation: true,
          nativeLanguage: 'en',
          languages: ['fr', 'de'],
          buildTool: 'maven',
          rememberMeKey: '2bb60a80889aa6e6767e9ccd8714982681152aa5',
          microserviceDependencies: 'entando',
        })
        .on('end', done);
    });

    it('creates expected files for the blueprint', () => {
      assert.file(expectedFiles.server);
    });

    it('creates expected MYSQL docker-compose file', () => {
      const dockerComposeFile = expectedFiles['entando-postgresql'];
      assert.file(dockerComposeFile);
      assert.fileContent(dockerComposeFile, entandoConstants.ENTANDO_POSTGRESQL_DOCKER_IMAGE);
    });
  });

  describe('With Infinispan as cache configuration', () => {
    before(done => {
      helpers
        .run('generator-jhipster/generators/server', {}, { createEnv: EnvironmentBuilder.createEnv })
        .withOptions({
          'from-cli': true,
          skipInstall: true,
          blueprint: 'entando',
          skipChecks: true,
        })
        .withGenerators([
          [
            require('../generators/server/index'), // eslint-disable-line global-require
            'jhipster-entando:server',
            path.join(__dirname, '../generators/server/index'),
          ],
        ])
        .withPrompts({
          baseName: appBaseName,
          packageName: 'com.mycompany.myapp',
          applicationType: 'microservice',
          databaseType: 'sql',
          devDatabaseType: 'h2Disk',
          prodDatabaseType: 'mysql',
          cacheProvider: 'infinispan',
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
      assert.file(expectedFiles.server);
    });

    it('CacheConfiguration file contains Entando modification', () => {
      const cacheConfigurationFileName = `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/config/CacheConfiguration.java`;

      assert.noFileContent(cacheConfigurationFileName, 'import com.mycompany.myapp.repository.UserRepository;\n');
      assert.noFileContent(cacheConfigurationFileName, 'UserRepository.USERS_BY_LOGIN_CACHE');
      assert.noFileContent(cacheConfigurationFileName, 'UserRepository.USERS_BY_EMAIL_CACHE');
      assert.noFileContent(cacheConfigurationFileName, 'Authority.class.getName()');
      assert.noFileContent(cacheConfigurationFileName, 'class.getName() + ".authorities"');
      assert.noFileContent(cacheConfigurationFileName, 'class.getName() + ".persistentTokens"');
    });
  });

  describe('With jhipster as microservice dependencyManagement', () => {
    before(done => {
      helpers
        .run('generator-jhipster/generators/server', {}, { createEnv: EnvironmentBuilder.createEnv })
        .withOptions({
          'from-cli': true,
          skipInstall: true,
          blueprint: 'entando',
          skipChecks: true,
        })
        .withGenerators([
          [
            require('../generators/server/index'), // eslint-disable-line global-require
            'jhipster-entando:server',
            path.join(__dirname, '../generators/server/index'),
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
          nativeLanguage: 'en',
          languages: ['fr', 'de'],
          buildTool: 'maven',
          rememberMeKey: '2bb60a80889aa6e6767e9ccd8714982681152aa5',
          microserviceDependencies: 'jhipster',
        })
        .on('end', done);
    });

    it('pom.xml contains the jhipster-dependencies version', () => {
      assert.fileContent('pom.xml', /<jhipster-dependencies\.version>.+<\/jhipster-dependencies\.version>/);
    });

    it('pom.xml contains the jhipster-dependencies', () => {
      assert.fileContent(
        'pom.xml',
        '            <dependency>\n' +
          '                <groupId>tech.jhipster</groupId>\n' +
          '                <artifactId>jhipster-dependencies</artifactId>\n' +
          // eslint-disable-next-line no-template-curly-in-string
          '                <version>${jhipster-dependencies.version}</version>\n' +
          '                <type>pom</type>\n' +
          '                <scope>import</scope>\n' +
          '            </dependency>'
      );
    });
  });
});
