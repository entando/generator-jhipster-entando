const chalk = require('chalk');
const needleServer = require('generator-jhipster/generators/server/needle-api/needle-server');

const descriptorPath = 'bundle/descriptor.yaml';
const pluginsDirectory = 'bundle/plugins';

module.exports = class extends needleServer {
    addWidgetToDescriptor(entityName) {
        const errorMessage = `${chalk.yellow('Reference to widget in descriptor ')}
            ${chalk.yellow(' not added.\n')}`;

        const widgets = [
            `ui/widgets/${entityName}/${entityName}-table-widget-descriptor.yaml`,
            `ui/widgets/${entityName}/${entityName}-details-widget-descriptor.yaml`,
            `ui/widgets/${entityName}/${entityName}-form-widget-descriptor.yaml`,
        ];
        let i;

        for (i = 0; i < widgets.length; i++) {
            const rewriteFileModel = this.generateFileModel(descriptorPath, 'entando-needle-descriptor-add-widgets', `    - ${widgets[i]}`);
            this.addBlockContentToFile(rewriteFileModel, errorMessage);
        }
    }

    addRolesToDescriptor(baseName, entityName) {
        const errorMessage = `${chalk.yellow('Reference to widget in descriptor ')}
            ${chalk.yellow(' not added.\n')}`;
        const mainPluginDescriptorPath = `${pluginsDirectory}/${baseName}-plugin.yaml`;
        const rewriteFileModelAdmin = this.generateFileModel(
            mainPluginDescriptorPath,
            'entando-needle-descriptor-add-roles',
            `    - name: ${entityName}-admin\n      code: "${entityName}-admin"`
        );
        this.addBlockContentToFile(rewriteFileModelAdmin, errorMessage);
    }
};
