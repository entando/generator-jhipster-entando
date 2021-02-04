const constants = require('generator-jhipster/generators/generator-constants');

const {
  INTERPOLATE_REGEX,
  DOCKER_DIR,
  SERVER_MAIN_SRC_DIR,
  SERVER_MAIN_RES_DIR,
  SERVER_TEST_RES_DIR,
} = constants;

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

function writeFiles() {
  return {
    writeEntandoFiles() {
      this.writeFilesToDisk(entandoServerFiles, this, false, null);
    },

    addUnspecificDependencies() {
      this.addMavenDependency('javax.servlet', 'javax.servlet-api', null, null);
      this.addMavenDependency(
        'org.springframework.boot',
        'spring-boot-starter-undertow',
        null,
        '<scope>provided</scope>',
      );
    },

    addJsonSchemaDependencies() {
      this.addMavenDependency('org.scala-lang', 'scala-library', '2.12.1');
      this.addMavenDependency(
        'com.kjetland',
        'mbknor-jackson-jsonschema_2.12',
        '1.0.34',
        `
          <exclusions>
              <exclusion>
                  <groupId>org.scala-lang</groupId>
                  <artifactId>scala-library</artifactId>
              </exclusion>
          </exclusions>
          `,
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
