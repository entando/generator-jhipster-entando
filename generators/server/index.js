/* eslint-disable consistent-return */
const chalk = require('chalk');
const ServerGenerator = require('generator-jhipster/generators/server');
const packagejs = require('generator-jhipster/package.json');
const constants = require('generator-jhipster/generators/generator-constants');
const writeFilesToDisk = require('../entity-server/files').writeFilesToDisk;
const prompts = require('./prompts');

const { SERVER_MAIN_RES_DIR, SERVER_TEST_SRC_DIR } = constants;

const serverFiles = {
    server: [
        {
            path: SERVER_MAIN_RES_DIR,
            templates: [{ file: 'config/application.yml', useBluePrint: true }]
        }
    ]
};

// Tests files that will require a qualifier to work properly with SpringDataRest
const testFiles = {
    tests: [
        {
            path: SERVER_TEST_SRC_DIR,
            templates: [
                {
                    useBluePrint: true,
                    file: 'package/web/rest/AuditResourceIntTest.java',
                    renameTo: generator => `${generator.packageFolder}/web/rest/AuditResourceIntTest.java`
                },
                {
                    useBluePrint: true,
                    file: 'package/web/rest/UserResourceIntTest.java',
                    renameTo: generator => `${generator.packageFolder}/web/rest/UserResourceIntTest.java`
                },
                {
                    useBluePrint: true,
                    file: 'package/web/rest/errors/ExceptionTranslatorIntTest.java',
                    renameTo: generator => `${generator.packageFolder}/web/rest/errors/ExceptionTranslatorIntTest.java`
                }
            ] 


        }
    ]
}

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
        const superPrompting = super._prompting();
        const customPrompts = prompts;
        return {
            ...superPrompting,
            ...customPrompts,
            setSharedConfigOptions() {
                this.configOptions.packageName = this.packageName;
                this.configOptions.cacheProvider = this.cacheProvider;
                this.configOptions.enableHibernateCache = this.enableHibernateCache;
                this.configOptions.websocket = this.websocket;
                this.configOptions.databaseType = this.databaseType;
                this.configOptions.devDatabaseType = this.devDatabaseType;
                this.configOptions.prodDatabaseType = this.prodDatabaseType;
                this.configOptions.searchEngine = this.searchEngine;
                this.configOptions.messageBroker = this.messageBroker;
                this.configOptions.serviceDiscoveryType = this.serviceDiscoveryType;
                this.configOptions.buildTool = this.buildTool;
                this.configOptions.enableSwaggerCodegen = this.enableSwaggerCodegen;
                this.configOptions.authenticationType = this.authenticationType;
                this.configOptions.uaaBaseName = this.uaaBaseName;
                this.configOptions.serverPort = this.serverPort;
                this.configOptions.useSpringDataRest = this.useSpringDataRest;

                // Make dist dir available in templates
                this.BUILD_DIR = this.getBuildDirectoryForBuildTool(this.buildTool);
                this.CLIENT_DIST_DIR = this.BUILD_DIR + constants.CLIENT_DIST_DIR;
            }
        };
    }

    get prompting() {
        // Here we are not overriding this phase and hence its being handled by JHipster
        return this._prompting();
    }

    _configuring() {
        const superConfiguring = super._configuring();
        const customConfiguring = {
            saveConfig() {
                const config = {
                    jhipsterVersion: packagejs.version,
                    applicationType: this.applicationType,
                    baseName: this.baseName,
                    packageName: this.packageName,
                    packageFolder: this.packageFolder,
                    serverPort: this.serverPort,
                    authenticationType: this.authenticationType,
                    uaaBaseName: this.uaaBaseName,
                    cacheProvider: this.cacheProvider,
                    enableHibernateCache: this.enableHibernateCache,
                    websocket: this.websocket,
                    databaseType: this.databaseType,
                    devDatabaseType: this.devDatabaseType,
                    prodDatabaseType: this.prodDatabaseType,
                    searchEngine: this.searchEngine,
                    messageBroker: this.messageBroker,
                    serviceDiscoveryType: this.serviceDiscoveryType,
                    buildTool: this.buildTool,
                    enableSwaggerCodegen: this.enableSwaggerCodegen,
                    jwtSecretKey: this.jwtSecretKey,
                    rememberMeKey: this.rememberMeKey,
                    enableTranslation: this.enableTranslation,
                    useSpringDataRest: this.useSpringDataRest,
                    includeQuerydsl: this.includeQuerydsl
                };
                if (this.enableTranslation && !this.configOptions.skipI18nQuestion) {
                    config.nativeLanguage = this.nativeLanguage;
                    config.languages = this.languages;
                }
                this.config.set(config);
            }
        };
        return { ...superConfiguring, ...customConfiguring };
    }

    get configuring() {
        // Here we are not overriding this phase and hence its being handled by JHipster
        return this._configuring();
    }

    get default() {
        // Here we are not overriding this phase and hence its being handled by JHipster
        return super._default();
    }

    get writing() {
        // Here we are not overriding this phase and hence its being handled by JHipster
        const jhipsterPhase = super._writing();
        const myCustomSteps = {
            updatePom() {
                if (this.useSpringDataRest) {
                    this.addMavenDependency('org.springframework.boot', 'spring-boot-starter-data-rest', null);
                    if (this.includeQuerydsl) {
                        this.addMavenProperty('querydsl.version', '4.1.3');
                        this.addMavenDependency('org.springframework.data', 'spring-data-commons', null);
                        // eslint-disable-next-line no-template-curly-in-string
                        this.addMavenDependency('com.querydsl', 'querydsl-apt', '${querydsl.version}');
                        // eslint-disable-next-line no-template-curly-in-string
                        this.addMavenDependency('com.querydsl', 'querydsl-jpa', '${querydsl.version}');
                        const aptMavenPluginOther = `
                        <executions>
                            <execution>
                                <goals>
                                    <goal>process</goal>
                                </goals>
                                <configuration>
                                    <outputDirectory>target/generated-sources/java</outputDirectory>
                                    <processor>com.querydsl.apt.jpa.JPAAnnotationProcessor</processor>
                                </configuration>
                            </execution>
                        </executions>
                        `;
                        this.addMavenPlugin('com.mysema.maven', 'apt-maven-plugin', '1.1.3', aptMavenPluginOther);
                    }
                } else {
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
            },
            writeApplicationYml() {
                if (this.skipServer) return;

                // write server side files
                // consoleFull(serverFiles);
                writeFilesToDisk(serverFiles, this, false, this.fetchFromInstalledJHipster('entity-server/templates'));
            },
            overwriteTestFilesForQualifier() {
                if (!this.useSpringDataRest) return;

                writeFilesToDisk(testFiles, this, false, this.fetchFromInstalledJHipster('entity-server/templates'));
            }
        };
        return { ...jhipsterPhase, ...myCustomSteps };
    }

    get end() {
        // Here we are not overriding this phase and hence its being handled by JHipster
        return super._end();
    }
};
