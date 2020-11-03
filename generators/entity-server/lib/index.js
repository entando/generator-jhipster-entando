const materialUiMapper = require('./material-ui.mapper');
const jhipsterTypeMapper = require('./jhipster-type.mapper');
const yupMapper = require('./yup.mapper');

module.exports = {
  ...materialUiMapper,
  ...jhipsterTypeMapper,
  ...yupMapper,
};
