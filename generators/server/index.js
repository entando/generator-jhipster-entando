/* eslint-disable consistent-return */
const chalk = require('chalk');
const ServerGenerator = require('generator-jhipster/generators/server');
const writeFiles = require('./files').writeFiles;
const customPrompts = require('./prompts');

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

    _initializing() {
        return super._initializing();
    }

    get initializing() {
        return this._initializing();
    }

    _prompting() {
        return customPrompts;
    }

    get prompting() {
        // Here we are not overriding this phase and hence its being handled by JHipster
        return this._prompting();
    }

    _configuring() {
        return super._configuring();
    }

    get configuring() {
        return this._configuring();
    }

    get default() {
        // Here we are not overriding this phase and hence its being handled by JHipster
        return super._default();
    }

    _addUnspecificDependencies() {
        this.addMavenDependency('javax.servlet', 'javax.servlet-api', null, null);
        this.addMavenDependency('org.springframework.boot', 'spring-boot-starter-undertow', null, '<scope>provided</scope>');
    }

    _addJsonSchemaDependencies() {
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
        this.addMavenRepository('snapshot-repo', 'https://oss.sonatype.org/content/repositories/snapshots');
    }

    _addEntandoConfigServiceDependencies() {
        this.addMavenDependency('org.entando', 'config-connector', '1.0.0-SNAPSHOT');
    }

    _addEntandoAuthDependencies() {
        this.addMavenDependency('io.github.openfeign', 'feign-jackson', null, null);
    }

    get writing() {
        const customizedJhipsterPhase = writeFiles();
        const myCustomSteps = {
            updatePom() {
                this._addMavenSnapshotRepository();
                this._addUnspecificDependencies();
                this._addJsonSchemaDependencies();
                this._addEntandoConfigServiceDependencies();
                this._addEntandoAuthDependencies();
            },
        };
        return { ...customizedJhipsterPhase, ...myCustomSteps };
    }

    get end() {
        // Here we are not overriding this phase and hence its being handled by JHipster
        return super._end();
    }
};
