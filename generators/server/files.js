const constants = require('generator-jhipster/generators/generator-constants');

const { SERVER_MAIN_RES_DIR, SERVER_MAIN_SRC_DIR } = constants;

const serverFiles = {

    packageJson: [
        {
            templates: ['package.json']
        },
        {
            templates: ['buildWidgets.sh']
        },
        {
            templates: ['installWidgets.sh']
        },
        {
            templates: ['buildBundle.sh']
        },
        {
            PATH: '.',
            templates: [
                {
                    useBluePrint: true,
                    file: 'bundle/descriptor.yaml',
                    renameTo: generator => `./bundle/descriptor.yaml`,
                }
            ]
        }
    ],
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
                    renameTo: generator => `${generator.packageFolder}/config/${titleCaseBaseName(generator)}Config.java`
                },
                {
                    useBluePrint: true,
                    file: 'package/config/AppConfigManager.java',
                    renameTo: generator => `${generator.packageFolder}/config/${titleCaseBaseName(generator)}ConfigManager.java`
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
                },
                {
                    useBluePrint: true,
                    file: 'package/web/rest/schema/AppConfigSchemaResource.java',
                    renameTo: generator =>
                        `${generator.packageFolder}/web/rest/schema/${titleCaseBaseName(generator)}ConfigSchemaResource.java`
                },
            ]
        }
    ]
};

function titleCaseBaseName(generator) {
    return generator.humanizedBaseName.replace(/\s/g, '');
}

module.exports = {
    serverFiles
};
