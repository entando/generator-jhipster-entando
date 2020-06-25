const { writeFiles } = require('./files');

function addUnspecificDependencies() {
  this.addMavenDependency('javax.servlet', 'javax.servlet-api', null, null);
  this.addMavenDependency(
    'org.springframework.boot',
    'spring-boot-starter-undertow',
    null,
    '<scope>provided</scope>',
  );
}

function addJsonSchemaDependencies() {
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
}

function addMavenSnapshotRepository() {
  this.addMavenRepository('snapshot-repo', 'https://oss.sonatype.org/content/repositories/snapshots');
}

function addEntandoAuthDependencies() {
  this.addMavenDependency('io.github.openfeign', 'feign-jackson', null, null);
}

module.exports = {
  ...writeFiles(),

  addMavenSnapshotRepository,
  addUnspecificDependencies,
  addJsonSchemaDependencies,
};
