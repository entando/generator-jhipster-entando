/* eslint-disable consistent-return */
const chalk = require('chalk');
const ServerGenerator = require('generator-jhipster/generators/server');
const constants = require('generator-jhipster/generators/generator-constants');

const { SERVER_MAIN_RES_DIR, SERVER_MAIN_SRC_DIR } = constants;

const serverFiles = {
    server: [
        {
            path: SERVER_MAIN_RES_DIR,
            templates: [
                {
                    useBluePrint: true,
                    file: 'config/application.yml'
                }
            ]
        },
        {
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                {
                    useBluePrint: true,
                    file: 'package/config/ConfigServiceConfiguration.java',
                    renameTo: generator => `${generator.packageFolder}/config/ConfigServiceConfiguration.java`
                },
                {
                    useBluePrint: true,
                    file: 'package/config/AppConfig.java',
                    renameTo: generator => `${generator.packageFolder}/config/${generator.humanizedBaseName.replace(/\s/g, '')}Config.java`
                },
                {
                    useBluePrint: true,
                    file: 'package/config/AppConfigManager.java',
                    renameTo: generator =>
                        `${generator.packageFolder}/config/${generator.humanizedBaseName.replace(/\s/g, '')}ConfigManager.java`
                },
                {
                    useBluePrint: true,
                    file: 'package/config/EntandoProperties.java',
                    renameTo: generator => `${generator.packageFolder}/config/EntandoProperties.java`
                },
                {
                    useBluePrint: true,
                    file: 'package/Application.java',
                    renameTo: generator => `${generator.javaDir}${generator.mainClass}.java`
                },
                {
                    useBluePrint: true,
                    file: 'package/client/EntandoAuthClient.java',
                    renameTo: generator => `${generator.packageFolder}/client/EntandoAuthClient.java`
                }
            ]
        }
    ]
};

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
        return super._initializing();
    }

    _prompting() {
        return super._prompting();
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
        this.addMavenDependency('javax.servlet', 'javax.servlet-api', null, '<scope>provided</scope>');
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

    _addEntandoConfigServiceDependencies() {
        this.addMavenDependency('org.entando', 'config-connector', '1.0.0-SNAPSHOT');
    }

    _addEntandoAuthDependencies() {
        this.addMavenDependency('io.github.openfeign', 'feign-jackson', null, null);
    }

    get writing() {
        const jhipsterPhase = super._writing();
        const myCustomSteps = {
            updatePom() {
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
        // Here we are not overriding this phase and hence its being handled by JHipster
        return super._end();
    }
};
