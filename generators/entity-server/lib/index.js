const materialUiMapper = require('./material-ui.mapper');
const jhipsterTypeMapper = require('./jhipster-type.mapper');

module.exports = {
  ...materialUiMapper,
  ...jhipsterTypeMapper,
};
