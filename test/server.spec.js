const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const constants = require('generator-jhipster/generators/generator-constants');
const expectedFiles = require('./utils/expected-files');

const appBaseName = 'entandoPlugin';
const { DOCKER_DIR, SERVER_MAIN_SRC_DIR, SERVER_MAIN_RES_DIR, SERVER_TEST_RES_DIR } = constants;

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
            require('../generators/server/index.js'), // eslint-disable-line global-require
            'jhipster-entando:server',
            path.join(__dirname, '../generators/server/index.js'),
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
          dockerImageOrganization: 'test',
        })
        .on('end', done);
    });

    it('creates expected files for the blueprint', () => {
      assert.file(expectedFiles.server);
      assert.file(`bundle/plugins/${appBaseName.toLowerCase()}-plugin.yaml`);
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

    it('pom.xml contains the snapshot repository', () => {
      assert.fileContent(
        'pom.xml',
        '        <repository>\n' +
          '            <id>snapshot-repo</id>\n' +
          '            <url>https://oss.sonatype.org/content/repositories/snapshots</url>\n' +
          '        </repository>\n',
      );
    });

    it('pom.xml contains the entando dockerImageOrganization', () => {
      assert.fileContent(
        'pom.xml',
        '                    <configuration>\n' +
          '                      <allowInsecureRegistries>true</allowInsecureRegistries>\n' +
          '                        <from>\n' +
          '                            <!-- Think of using the DOCKER_JAVA_JRE JHipster env variable -->\n' +
          '                            <image>entando/entando-alpine-base:6.0.0</image>\n' +
          '                        </from>\n' +
          '                        <to>\n' +
          // eslint-disable-next-line no-template-curly-in-string
          '                            <image>/${project.artifactId}:${project.version}</image>\n' +
          '                        </to>\n' +
          '                        <container>\n' +
          '                            <entrypoint>\n' +
          '                                <shell>/bin/bash</shell>\n' +
          '                                <option>-c</option>\n' +
          '                                <arg>/entrypoint.sh</arg>\n' +
          '                            </entrypoint>\n' +
          '                            <ports>\n' +
          '                                <port>8080</port>\n' +
          '                            </ports>\n' +
          '                            <environment>\n' +
          '                                <SPRING_OUTPUT_ANSI_ENABLED>ALWAYS</SPRING_OUTPUT_ANSI_ENABLED>\n' +
          '                                <JHIPSTER_SLEEP>0</JHIPSTER_SLEEP>\n' +
          '                            </environment>\n' +
          '                            <creationTime>USE_CURRENT_TIMESTAMP</creationTime>\n' +
          '                        </container>\n' +
          '                        <extraDirectories>\n' +
          '                            <paths>src/main/jib</paths>\n' +
          '                            <permissions>\n' +
          '                                <permission>\n' +
          '                                    <file>/entrypoint.sh</file>\n' +
          '                                    <mode>777</mode>\n' +
          '                                </permission>\n' +
          '                            </permissions>\n' +
          '                        </extraDirectories>\n' +
          '                    </configuration>\n',
      );
    });

    it('pom.xml contains the modified JIB creationTime', () => {
      assert.fileContent(
        'pom.xml',
        '                            <creationTime>USE_CURRENT_TIMESTAMP</creationTime>',
      );
    });

    it('pom.xml contains springfox-swagger-ui dependency', () => {
      assert.fileContent(
        'pom.xml',
        '        <dependency>\n' +
          '            <groupId>io.springfox</groupId>\n' +
          '            <artifactId>springfox-swagger-ui</artifactId>\n' +
          // eslint-disable-next-line no-template-curly-in-string
          '            <version>${springfox.version}</version>\n' +
          '        </dependency>',
      );
    });

    it('Keycloack docker file contains the Entando modifications', () => {
      assert.fileContent(`${DOCKER_DIR}keycloak.yml`, 'entando/entando-keycloak:6.0.15');
      assert.fileContent(
        `${DOCKER_DIR}keycloak.yml`,
        '    command:\n' +
          '      [\n' +
          "        '-b',\n" +
          "        '0.0.0.0',\n" +
          "        '-Dkeycloak.profile.feature.scripts=enabled',\n" +
          "        '-Dkeycloak.profile.feature.upload_scripts=enabled',\n" +
          "        '-Dkeycloak.migration.action=import',\n" +
          "        '-Dkeycloak.migration.provider=dir',\n" +
          "        '-Dkeycloak.migration.dir=/opt/jboss/keycloak/realm-config',\n" +
          "        '-Dkeycloak.migration.strategy=OVERWRITE_EXISTING',\n" +
          "        '-Djboss.socket.binding.port-offset=1000',\n" +
          '      ]',
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

    it('Application yaml files contains Entando midification', () => {
      assert.fileContent(
        `${SERVER_MAIN_RES_DIR}config/application.yml`,
        'swagger-ui:\n  client-id: swagger_ui\n  client-secret: swagger_ui',
      );

      assert.fileContent(
        `${SERVER_MAIN_RES_DIR}config/application-dev.yml`,
        '  cors:\n' +
          "    allowed-origins: '*'\n" +
          "    allowed-methods: '*'\n" +
          "    allowed-headers: '*'\n" +
          "    exposed-headers: 'Authorization,Link,X-Total-Count'\n" +
          '    allow-credentials: true\n' +
          '    max-age: 1800',
      );
    });

    it('package.json file contains Entando scripts', () => {
      assert.fileContent(
        'package.json',
        '  "scripts": {\n' +
          '    "populate-bundle": "bash ./buildBundle.sh",\n' +
          '    "build-all": "bash ./buildBundle.sh -d",\n' +
          '    "keycloak": "docker-compose -f src/main/docker/keycloak.yml up"\n' +
          '  }',
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

  describe('With Gradle blueprint configuration', () => {
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
            require('../generators/server/index.js'), // eslint-disable-line global-require
            'jhipster-entando:server',
            path.join(__dirname, '../generators/server/index.js'),
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
          buildTool: 'gradle',
          rememberMeKey: '2bb60a80889aa6e6767e9ccd8714982681152aa5',
          dockerImageOrganization: 'test',
        })
        .on('end', done);
    });

    it('creates expected files for the blueprint', () => {
      assert.file(expectedFiles.server);
      assert.file(`bundle/plugins/${appBaseName.toLowerCase()}-plugin.yaml`);
    });

    it('Should not contains user management files', () => {
      assert.noFile(expectedFiles.userManagement);
    });

    it('Should contains gradle dependencies', () => {
      assert.fileContent(
        'build.gradle',
        '    implementation "javax.servlet:javax.servlet-api"\n' +
          '    compileOnly "org.springframework.boot:spring-boot-starter-undertow"\n' +
          '    implementation "org.scala-lang:scala-library:2.12.1"\n' +
          '    implementation "com.kjetland:mbknor-jackson-jsonschema_2.12:1.0.34"',
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
            require('../generators/server/index.js'), // eslint-disable-line global-require
            'jhipster-entando:server',
            path.join(__dirname, '../generators/server/index.js'),
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
          dockerImageOrganization: 'test',
        })
        .on('end', done);
    });

    it('creates expected files for the blueprint', () => {
      assert.file(expectedFiles.server);
      assert.file(`bundle/plugins/${appBaseName.toLowerCase()}-plugin.yaml`);
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
      assert.fileContent(
        cacheConfigurationFileName,
        '        @Override\n' +
          '    protected void configure(AuthenticationManagerBuilder auth)\n' +
          '      throws Exception {\n' +
          '        auth\n' +
          '          .inMemoryAuthentication()\n' +
          '          .withUser("user")\n' +
          '            .password("password")\n' +
          '            .roles("USER")\n' +
          '            .and()\n' +
          '          .withUser("admin")\n' +
          '            .password("admin")\n' +
          '            .roles("USER", "ADMIN");\n' +
          '    }\n' +
          ' \n' +
          '    @Override\n' +
          '    protected void configure(HttpSecurity http) throws Exception {\n' +
          '        http\n' +
          '          .authorizeRequests()\n' +
          '          .anyRequest()\n' +
          '          .authenticated()\n' +
          '          .and()\n' +
          '          .httpBasic();\n' +
          '    }    @Override\n' +
          '    protected void configure(AuthenticationManagerBuilder auth)\n' +
          '      throws Exception {\n' +
          '        auth\n' +
          '          .inMemoryAuthentication()\n' +
          '          .withUser("user")\n' +
          '            .password("password")\n' +
          '            .roles("USER")\n' +
          '            .and()\n' +
          '          .withUser("admin")\n' +
          '            .password("admin")\n' +
          '            .roles("USER", "ADMIN");\n' +
          '    }\n' +
          ' \n' +
          '    @Override\n' +
          '    protected void configure(HttpSecurity http) throws Exception {\n' +
          '        http\n' +
          '          .authorizeRequests()\n' +
          '          .anyRequest()\n' +
          '          .authenticated()\n' +
          '          .and()\n' +
          '          .httpBasic();\n' +
          '    }',
      );
    });
  });
});
