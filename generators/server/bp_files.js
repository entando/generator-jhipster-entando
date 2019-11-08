const constants = require('generator-jhipster/generators/generator-constants');

const { SERVER_MAIN_RES_DIR, SERVER_MAIN_SRC_DIR } = constants;

const serverFiles = {
    server: [
        {
            path: SERVER_MAIN_RES_DIR,
            templates: [
                {
                    file: 'config/application.yml',
                },
            ],
        },
        {
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                {
                    file: 'package/config/ConfigServiceConfiguration.java',
                    renameTo: generator => `${generator.packageFolder}/config/ConfigServiceConfiguration.java`,
                },
                {
                    file: 'package/config/AppConfig.java',
                    renameTo: generator => `${generator.packageFolder}/config/${titleCaseBaseName(generator)}Config.java`,
                },
                {
                    file: 'package/config/AppConfigManager.java',
                    renameTo: generator => `${generator.packageFolder}/config/${titleCaseBaseName(generator)}ConfigManager.java`,
                },
                {
                    file: 'package/config/EntandoProperties.java',
                    renameTo: generator => `${generator.packageFolder}/config/EntandoProperties.java`,
                },
                {
                    file: 'package/Application.java',
                    renameTo: generator => `${generator.javaDir}${generator.mainClass}.java`,
                },
                {
                    file: 'package/client/EntandoAuthClient.java',
                    renameTo: generator => `${generator.packageFolder}/client/EntandoAuthClient.java`,
                },
                {
                    file: 'package/web/rest/schema/AppConfigSchemaResource.java',
                    renameTo: generator =>
                        `${generator.packageFolder}/web/rest/schema/${titleCaseBaseName(generator)}ConfigSchemaResource.java`,
                },
            ],
        },
    ],
};

function titleCaseBaseName(generator) {
    return generator.humanizedBaseName.replace(/\s/g, '');
}

module.exports = {
    serverFiles,
};
