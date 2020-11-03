const materialUiMapper = require('./material-ui.mapper');
const jhipsterTypeMapper = require('./jhipster-type.mapper');
const yupMapper = require('./yup.mapper');
const propTypesMapper = require('./prop-types.mapper');

module.exports = {
  ...materialUiMapper,
  ...jhipsterTypeMapper,
  ...yupMapper,
  ...propTypesMapper,
};
