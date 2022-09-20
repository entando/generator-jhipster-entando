const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const constants = require('generator-jhipster/generators/generator-constants');
const entandoConstants = require('../generators/generator-constants');
const expectedFiles = require('./utils/expected-files');

const appBaseName = 'entandoPlugin';
const { DOCKER_DIR, SERVER_MAIN_SRC_DIR, SERVER_MAIN_RES_DIR, SERVER_TEST_RES_DIR } = constants;

const { ENTANDO_KEYCLOAK_DOCKER_IMAGE } = entandoConstants;

describe('Subgenerator server of entando JHipster blueprint', () => {
  describe('With default blueprint configuration', () => {
    before(done => {
      helpers
        .run('generator-jhipster/generators/server')
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
      assert.fileContent(
        `${SERVER_MAIN_RES_DIR}config/application.yml`,
        'swagger-ui:\n  client-id: swagger_ui\n  client-secret: swagger_ui',
      );
      assert.fileContent(
        `${SERVER_TEST_RES_DIR}config/application.yml`,
        'swagger-ui:\n  client-id: swagger_ui\n  client-secret: swagger_ui',
      );
    });

    it('pom.xml contains the javax servlet dependency', () => {
      assert.fileContent(
        'pom.xml',
        '        <dependency>\n' +
          '            <groupId>javax.servlet</groupId>\n' +
          '            <artifactId>javax.servlet-api</artifactId>\n' +
          '        </dependency>\n',
      );
    });

    it('pom.xml contains the Undertow dependency', () => {
      assert.fileContent(
        'pom.xml',
        '        <dependency>\n' +
          '            <groupId>org.springframework.boot</groupId>\n' +
          '            <artifactId>spring-boot-starter-undertow</artifactId>\n' +
          '<scope>provided</scope>\n' +
          '        </dependency>\n',
      );
    });

    it('pom.xml contains the Scala-library dependency', () => {
      assert.fileContent(
        'pom.xml',
        '        <dependency>\n' +
          '            <groupId>org.scala-lang</groupId>\n' +
          '            <artifactId>scala-library</artifactId>\n' +
          '            <version>2.12.1</version>\n' +
          '        </dependency>\n',
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
          '        </dependency>',
      );
    });

    it('pom.xml contains springfox-boot-starter dependency', () => {
      assert.fileContent(
        'pom.xml',
        '        <dependency>\n' +
          '            <groupId>io.springfox</groupId>\n' +
          '            <artifactId>springfox-boot-starter</artifactId>\n' +
          // eslint-disable-next-line no-template-curly-in-string
          '            <version>${springfox-boot-starter.version}</version>\n' +
          '        </dependency>\n',
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
          '            </dependency>',
      );
    });

    it('Keycloack docker file contains the Entando modifications', () => {
      assert.fileContent(`${DOCKER_DIR}keycloak.yml`, ENTANDO_KEYCLOAK_DOCKER_IMAGE);
      assert.fileContent(
        `${DOCKER_DIR}keycloak.yml`,
        'command: [\n' +
          "        '-b',\n" +
          "        '0.0.0.0',\n" +
          "        '-Dkeycloak.profile.feature.scripts=enabled',\n" +
          "        '-Dkeycloak.profile.feature.upload_scripts=enabled',\n" +
          "        '-Dkeycloak.migration.action=import',\n" +
          "        '-Dkeycloak.migration.provider=dir',\n" +
          "        '-Dkeycloak.migration.dir=/opt/jboss/keycloak/realm-config',\n" +
          "        '-Dkeycloak.migration.strategy=IGNORE_EXISTING', # use 'OVERWRITE_EXISTING' instead if you want to reset your current configuration\n" +
          "        '-Djboss.socket.binding.port-offset=1000',\n" +
          '      ]\n' +
          '    volumes:\n' +
          '      - ./realm-config:/opt/jboss/keycloak/realm-config\n' +
          '      - ./keycloak-db:/opt/jboss/keycloak/standalone/data',
      );
    });

    it('SecurityConfiguration file contains Entando modifications', () => {
      assert.fileContent(
        `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/config/SecurityConfiguration.java`,
        "            .contentSecurityPolicy(\"default-src 'self' http://localhost:9080; frame-src 'self' data:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://storage.googleapis.com; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:\")\n",
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
          '    }\n' +
          '  ],\n' +
          '  "clientScopes": [\n' +
          '    {\n' +
          '      "id": "1dc1e050-891a-4f5b-ac9d-5ea0c2e3c05e",\n' +
          '      "name": "address",\n' +
          '      "description": "OpenID Connect built-in scope: address",\n' +
          '      "protocol": "openid-connect",\n' +
          '      "attributes": {\n' +
          // eslint-disable-next-line no-template-curly-in-string
          '        "consent.screen.text": "${addressScopeConsentText}",\n' +
          '        "display.on.consent.screen": "true"\n' +
          '      },\n' +
          '      "protocolMappers": [\n' +
          '        {\n' +
          '          "id": "b9a92105-8ca5-45d1-8a99-626255ac174f",\n' +
          '          "name": "address",\n' +
          '          "protocol": "openid-connect",\n' +
          '          "protocolMapper": "oidc-address-mapper",\n' +
          '          "consentRequired": false,\n' +
          '          "config": {\n' +
          '            "user.attribute.formatted": "formatted",\n' +
          '            "user.attribute.country": "country",\n' +
          '            "user.attribute.postal_code": "postal_code",\n' +
          '            "userinfo.token.claim": "true",\n' +
          '            "user.attribute.street": "street",\n' +
          '            "id.token.claim": "true",\n' +
          '            "user.attribute.region": "region",\n' +
          '            "access.token.claim": "true",\n' +
          '            "user.attribute.locality": "locality"\n' +
          '          }\n' +
          '        }\n' +
          '      ]\n' +
          '    },',
      );
    });

    it('Application yaml files contains Entando modifications', () => {
      assert.fileContent(
        `${SERVER_MAIN_RES_DIR}config/application.yml`,
        'swagger-ui:\n  client-id: swagger_ui\n  client-secret: swagger_ui',
      );

      assert.fileContent(
        `${SERVER_MAIN_RES_DIR}config/application-dev.yml`,
        '  cors:\n' +
          "    allowed-origin-patterns: 'http://localhost:[*]'\n" +
          "    allowed-methods: '*'\n" +
          "    allowed-headers: '*'\n" +
          "    exposed-headers: 'Authorization,Link,X-Total-Count'\n" +
          '    allow-credentials: true\n' +
          '    max-age: 1800',
      );
      assert.fileContent(
        `${SERVER_MAIN_RES_DIR}config/application-dev.yml`,
        'springfox:\n  documentation:\n    enabled: true\n',
      );
      assert.fileContent(
        `${SERVER_MAIN_RES_DIR}config/application-prod.yml`,
        'springfox:\n  documentation:\n    enabled: false\n',
      );
    });

    it('JwtGrantedAuthorityConverter file contains Entando modification', () => {
      assert.fileContent(
        `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/security/oauth2/JwtGrantedAuthorityConverter.java`,
        ":'internal'",
      );
    });

    it('CacheConfiguration file contains Entando modification', () => {
      const cacheConfigurationFileName = `${SERVER_MAIN_SRC_DIR}com/mycompany/myapp/config/CacheConfiguration.java`;

      assert.noFileContent(
        cacheConfigurationFileName,
        'import com.mycompany.myapp.repository.UserRepository;\n',
      );
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
          "╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═══╝╚═════╝  ╚═════╝ '",
      );
    });
  });

  describe('With Infinispan as cache configuration', () => {
    before(done => {
      helpers
        .run('generator-jhipster/generators/server')
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

      assert.noFileContent(
        cacheConfigurationFileName,
        'import com.mycompany.myapp.repository.UserRepository;\n',
      );
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
        .run('generator-jhipster/generators/server')
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
          '            </dependency>',
      );
    });
  });
});
