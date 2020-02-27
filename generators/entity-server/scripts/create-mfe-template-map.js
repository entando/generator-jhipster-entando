const fs = require('fs');

const TEMPLATES_PATH = '../templates/ui/';

const IGNORED_TEMPLATES = [
    // ADD IGNORED TEMPLATES HERE (format example, `${TEMPLATES_PATH}widgets/common/file.js.ejs`)
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

function getFileGenerationOption(file) {
    const templateOptions = /<%#\s*(.*?)\s*-?%>/i;
    const firstLine = fs.readFileSync(file, 'utf-8').split('\n')[0];
    const match = templateOptions.exec(firstLine);
    const options = {
        ...(match ? JSON.parse(match[1]) : { method: 'copy' }),
    };
    return options;
}

function generate(file) {
    const options = getFileGenerationOption(file);

    const template = {
        filename: file.replace(`${TEMPLATES_PATH}widgets`, '').replace(/.ejs$/i, ''),
        options,
    };

    return template;
}

function getRenameToFunction(file) {
    if (file && file.options.renameTo) {
        return function(generator) {
            return eval(file.options.renameTo);
        };
    }
    return function(generator) {
        return `/${generator.entityInstance}/${file.filename}`;
    };
}

module.exports.generateFiles = function(basePath) {
    const files = getFiles(basePath).map(generate);
    const templates = files.filter(file => !file.options.skip).map(file => {
        file.filename = file.filename.substring(basePath.length);
        const fileObj = {
            file: file.filename,
        };

        Object.keys(file.options).forEach(opt => {
            switch (opt) {
                case 'skip':
                    break;
                case 'renameTo':
                    fileObj.renameTo = getRenameToFunction(file);
                    break;
                default:
                    fileObj[opt] = file.options[opt];
            }
        });

        if(!fileObj.renameTo) {
            fileObj.renameTo = getRenameToFunction(file);
        }
        return fileObj;
    });

    return {
        microFrontEnd: [
            {
                path: 'ui/widgets',
                templates,
            },
        ],
    };
};
