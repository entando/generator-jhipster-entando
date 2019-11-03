const chalk = require('chalk');
const needleServer = require('generator-jhipster/generators/server/needle-api/needle-server');

const descriptorPath = 'bundle/descriptor.yaml';

module.exports = class extends needleServer {

    addWidgetToDescriptor(entityName) {

        const errorMessage = `${chalk.yellow('Reference to widget in descriptor ')}
            ${chalk.yellow(' not added.\n')}`;

        let widgets = [`ui/widgets/${entityName}/tableWidget/table-widget.yaml`, `ui/widgets/${entityName}/detailsWidget/details-widget.yaml`,`ui/widgets/${entityName}/formWidget/form-widget.yaml`]
        let i;

        for(i=0; i<widgets.length; i++) {
            const rewriteFileModel = this.generateFileModel(descriptorPath, 'entando-needle-descriptor-add-widgets', "    -"+widgets[i]);
            this.addBlockContentToFile(rewriteFileModel, errorMessage);
        }
    }

    addRolesToDescriptor(entityName) {

        const errorMessage = `${chalk.yellow('Reference to widget in descriptor ')}
            ${chalk.yellow(' not added.\n')}`;

        const rewriteFileModelAdmin = this.generateFileModel(descriptorPath, 'entando-needle-descriptor-add-roles', `    - name: ${entityName}-admin\n      code: "${entityName}-admin"`);
        this.addBlockContentToFile(rewriteFileModelAdmin, errorMessage);
    }
}
