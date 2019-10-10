const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

const TEMPLATES_PATH = '../templates/ui/';
const EXPORT_PATH = '../mfe-files.js';

const IGNORED_TEMPLATES = [
    // `${TEMPLATES_PATH}widgets/common/jsconfig.json.ejs`,
    // `${TEMPLATES_PATH}widgets/detailsWidget/src/components/__tests__/EntityDetails.test.js.ejs`,
    // `${TEMPLATES_PATH}widgets/detailsWidget/src/components/__tests__/EntityDetailsContainer.test.js.ejs`,
    // `${TEMPLATES_PATH}widgets/detailsWidget/src/components/__mocks__/entityMocks.js.ejs`,
    // `${TEMPLATES_PATH}widgets/detailsWidget/src/components/__mocks__/i18n.js.ejs`,
    // `${TEMPLATES_PATH}widgets/tableWidget/src/mocks/entityMocks.js.ejs`,
    // `${TEMPLATES_PATH}widgets/tableWidget/src/mocks/entityi18nMock.js.ejs`,
    // `${TEMPLATES_PATH}widgets/tableWidget/src/components/__tests__/entityTableContainer.test.js.ejs`,
    // `${TEMPLATES_PATH}widgets/tableWidget/src/components/__tests__/entityTable.test.js.ejs`,
];

function getFiles(path) {
    const slashedPath = path.endsWith('/') ? path : `${path}/`;
    const inFolder = fs.readdirSync(slashedPath, { withFileTypes: true });

    const files = inFolder.reduce((acc, item) => {
        if (item.isDirectory()) {
            return [...acc, ...getFiles(slashedPath + item.name)];
        }
        if (item.isFile()) {
            const fullPath = slashedPath + item.name;
            return [...acc, ...(!IGNORED_TEMPLATES.includes(fullPath) ? [fullPath] : [])];
        }
        return acc;
    }, []);

    return files;
}

function generate(file) {
    const templateOptions = /<%#\s*(.*?)\s*-?%>/i;
    const firstLine = fs.readFileSync(file, 'utf-8').split('\n')[0];
    const match = templateOptions.exec(firstLine);

    const options = {
        ...(match ? JSON.parse(match[1]) : { method: 'copy' }),
    };

    const template = {
        filename: file.replace(`${TEMPLATES_PATH}widgets`, '').replace(/.ejs$/i, ''),
        options,
    };

    return template;
}

const files = getFiles(TEMPLATES_PATH).map(generate);

const templateFile = fs.readFileSync(path.join(__dirname, '/mfe-files.js.ejs'), 'utf-8');

const mfeFile = ejs.render(templateFile, { files });

fs.writeFileSync(EXPORT_PATH, mfeFile, 'utf8');
