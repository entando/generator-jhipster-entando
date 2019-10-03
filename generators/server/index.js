/* eslint-disable consistent-return */
const chalk = require('chalk');
const ServerGenerator = require('generator-jhipster/generators/server');
const serverFiles = require('./files').serverFiles;

module.exports = class extends ServerGenerator {
    constructor(args, opts) {
        super(args, Object.assign({ fromBlueprint: true }, opts)); // fromBlueprint variable is important

        const jhContext = (this.jhipsterContext = this.options.jhipsterContext);

        if (!jhContext) {
            this.error(`This is a JHipster blueprint and should be used only like ${chalk.yellow('jhipster --blueprint entando')}`);
        }

        this.configOptions = jhContext.configOptions || {};
        // This sets up options for this sub generator and is being reused from JHipster
        jhContext.setupServerOptions(this, jhContext);
    }

    get initializing() {
        console.log('server/index.js initializing()');

        return super._initializing();
    }

    _prompting() {
        console.log('server/index.js _prompting()');

        return super._prompting();
    }

    get prompting() {
        console.log('server/index.js prompting()');
        // Here we are not overriding this phase and hence its being handled by JHipster
        return this._prompting();
    }

    _configuring() {
        console.log('server/index.js _configuring()');
        return super._configuring();
    }

    get configuring() {
        console.log('server/index.js configuring()');
        return this._configuring();
    }

    get default() {
        console.log('server/index.js default()');
        // Here we are not overriding this phase and hence its being handled by JHipster
        return super._default();
    }

    _addUnspecificDependencies() {
        console.log('server/index.js _addUnspecificDependencies()');
        this.addMavenDependency('javax.servlet', 'javax.servlet-api', null, '<scope>provided</scope>');
        this.addMavenDependency('org.springframework.boot', 'spring-boot-starter-undertow', null, '<scope>provided</scope>');
    }

    _addJsonSchemaDependencies() {
        console.log('server/index.js _addJsonSchemaDependencies()');
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
            `
        );
    }

    _addMavenSnapshotRepository() {
        console.log('server/index.js _addMavenSnapshotRepository()');
        this.addMavenRepository('snapshot-repo', 'https://oss.sonatype.org/content/repositories/snapshots');
    }

    _addEntandoConfigServiceDependencies() {
        console.log('server/index.js _addEntandoConfigServiceDependencies()');
        this.addMavenDependency('org.entando', 'config-connector', '1.0.0-SNAPSHOT');
    }

    _addEntandoAuthDependencies() {
        console.log('server/index.js _addEntandoAuthDependencies()');
        this.addMavenDependency('io.github.openfeign', 'feign-jackson', null, null);
    }

    get writing() {
        console.log('server/index.js writing()');
        const jhipsterPhase = super._writing();
        const myCustomSteps = {
            updatePom() {
                this._addMavenSnapshotRepository();
                this._addUnspecificDependencies();
                this._addJsonSchemaDependencies();
                this._addEntandoConfigServiceDependencies();
                this._addEntandoAuthDependencies();
            },
            writeApplicationYml() {
                if (this.skipServer) return;

                // write server side files
                this.writeFilesToDisk(serverFiles, this, false, null);
            }
        };
        return { ...jhipsterPhase, ...myCustomSteps };
    }

    get end() {
        console.log('server/index.js end()');
        // Here we are not overriding this phase and hence its being handled by JHipster
        return super._end();
    }
};
