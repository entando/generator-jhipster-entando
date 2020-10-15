const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const constants = require('generator-jhipster/generators/generator-constants');
const expectedFiles = require('./utils/expected-files');

const appBaseName = 'entandoPlugin';
const { DOCKER_DIR, SERVER_MAIN_SRC_DIR } = constants;

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

    it('pom.xml contains the mbknor-jackson-jsonschema dependecy', () => {
      assert.fileContent(
        'pom.xml',
        '        <dependency>\n' +
          '            <groupId>com.kjetland</groupId>\n' +
          '            <artifactId>mbknor-jackson-jsonschema_2.12</artifactId>\n' +
          '            <version>1.0.34</version>\n' +
          '\n' +
          '          <exclusions>\n' +
          '              <exclusion>\n' +
          '                  <groupId>org.scala-lang</groupId>\n' +
          '                  <artifactId>scala-library</artifactId>\n' +
          '              </exclusion>\n' +
          '          </exclusions>\n' +
          '          \n' +
          '        </dependency>\n',
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
          '                      <from>\n' +
          '                          <!-- Think of using the DOCKER_JAVA_JRE JHipster env variable -->\n' +
          '                          <image>entando/entando-alpine-base:6.0.0</image>\n' +
          '                      </from>\n' +
          '                      <to>\n' +
          // eslint-disable-next-line no-template-curly-in-string
          '                          <image>/${project.artifactId}:${project.version}</image>\n' +
          '                      </to>\n' +
          '                      <extraDirectories>\n' +
          '                          <paths>src/main/jib</paths>\n' +
          '                          <permissions>\n' +
          '                              <permission>\n' +
          '                                  <file>/entrypoint.sh</file>\n' +
          '                                  <mode>777</mode>\n' +
          '                              </permission>\n' +
          '                          </permissions>\n' +
          '                      </extraDirectories>\n' +
          '                      <container>\n' +
          '                          <entrypoint>\n' +
          '                              <shell>/bin/bash</shell>\n' +
          '                              <option>-c</option>\n' +
          '                              <arg>/entrypoint.sh</arg>\n' +
          '                          </entrypoint>\n' +
          '                          <ports>\n' +
          '                              <port>8080</port>\n' +
          '                          </ports>\n' +
          '                          <environment>\n' +
          '                              <SPRING_OUTPUT_ANSI_ENABLED>ALWAYS</SPRING_OUTPUT_ANSI_ENABLED>\n' +
          '                              <JHIPSTER_SLEEP>0</JHIPSTER_SLEEP>\n' +
          '                          </environment>\n' +
          '\t\t\t              <creationTime>USE_CURRENT_TIMESTAMP</creationTime>\n' +
          '                      </container>\n' +
          '                    </configuration>',
      );
    });

    it('pom.xml contains the modified JIB creationTime', () => {
      assert.fileContent('pom.xml', '\t\t\t              <creationTime>USE_CURRENT_TIMESTAMP</creationTime>');
    });

    it('pom.xml contains springfox-swagger-ui dependency', () => {
      assert.fileContent(
        'pom.xml',
        '        <dependency>\n' +
          '            <groupId>io.springfox</groupId>\n' +
          '            <artifactId>springfox-swagger-ui</artifactId>\n' +
          '            <version>2.9.2</version>\n' +
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
  });
});
