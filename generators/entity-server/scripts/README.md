## createMFEtemplateMap

This script automates the template mapping

### Usage
Go to `generators/entity-server/scripts/` and run `node create-mfe-template-map.js`.

This will generate a `mfe-files.js` file at `generators/entity-server/` using `mfe-files.js.ejs` template. The resulting file will look similar to this:

``` javascript
const files = {
  path: 'ui/widgets',
  templates: [
    {
        file: '/common/jsconfig.json',
        renameTo: generator => `/${generator.entityInstance}/common/jsconfig.json`,
        method: 'copy',
    },
    {
        file: '/detailsWidget/package.json',
        renameTo: generator => `/${generator.entityInstance}/detailsWidget/package.json`,
        useBluePrint: 'true',
    },
  ],
};

module.exports = files;
```

Add `<%# { "useBluePrint": true } -%>` to the beginning of each template that is dynamic (not just copied) and that will add the content of JSON object to the mapping (in this case `{ useBluePrint: true }` would be added).

The script keeps the file structure and parses all the files. If you want a file to be skipped (usually this should not happen), add a `<%# { "skip": true } -%>` option. To add custom mappings (e.g., to change the file name), just add `renameTo` option: ``{ "renameTo": "`/${generator.entityInstance}/tableWidget/src/mocks/${generator.entityInstance}i18nMock.js`" }``.


