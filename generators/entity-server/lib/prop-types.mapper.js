const jhipsterMapper = require('./jhipster-type.mapper');

function getPropType(field) {
  const fieldType = jhipsterMapper.getJHipsterType(field);

  switch (fieldType) {
    case 'String':
    case 'LocalDate':
    case 'Instant':
    case 'ZonedDateTime':
    case 'Enum':
    case 'ImageBlob':
    case 'BinaryFileBlob':
    case 'TextBlob':
      return 'PropTypes.string';
    case 'Integer':
    case 'Long':
    case 'Float':
    case 'Double':
    case 'BigDecimal':
      return 'PropTypes.number';
    case 'Boolean':
      return 'PropTypes.bool';
    default:
      return 'PropTypes.any';
  }
}

function isRequiredPropType(field) {
  return field.fieldValidateRules && field.fieldValidateRules.includes('required') ? '.isRequired' : '';
}

function getFormikValuePropType(field) {
  const fieldType = jhipsterMapper.getJHipsterType(field);

  switch (fieldType) {
    case 'String':
    case 'Enum':
    case 'ImageBlob':
    case 'BinaryFileBlob':
    case 'TextBlob':
      return ['PropTypes.string'];
    case 'Integer':
    case 'Long':
    case 'Float':
    case 'Double':
    case 'BigDecimal':
      return ['PropTypes.string', 'PropTypes.number'];
    case 'LocalDate':
    case 'Instant':
    case 'ZonedDateTime':
      return ['PropTypes.string', 'PropTypes.instanceOf(Date)'];
    case 'Boolean':
      return ['PropTypes.bool'];
    default:
      return ['PropTypes.any'];
  }
}

function getFormikTouchedPropType(field) {
  const fieldType = jhipsterMapper.getJHipsterType(field);

  switch (fieldType) {
    case 'String':
    case 'Integer':
    case 'Long':
    case 'Float':
    case 'Double':
    case 'BigDecimal':
    case 'LocalDate':
    case 'Instant':
    case 'ZonedDateTime':
    case 'Boolean':
    case 'Enum':
    case 'ImageBlob':
    case 'BinaryFileBlob':
    case 'TextBlob':
      return ['PropTypes.bool', 'PropTypes.shape()'];
    default:
      return ['PropTypes.any'];
  }
}

function getFormikErrorPropType(field) {
  const fieldType = jhipsterMapper.getJHipsterType(field);

  switch (fieldType) {
    case 'String':
    case 'Integer':
    case 'Long':
    case 'Float':
    case 'Double':
    case 'BigDecimal':
    case 'LocalDate':
    case 'Instant':
    case 'ZonedDateTime':
    case 'Boolean':
    case 'Enum':
    case 'ImageBlob':
    case 'BinaryFileBlob':
    case 'TextBlob':
      return ['PropTypes.string', 'PropTypes.shape()'];
    default:
      return ['PropTypes.any'];
  }
}

module.exports = {
  getPropType,
  isRequiredPropType,
  getFormikValuePropType,
  getFormikTouchedPropType,
  getFormikErrorPropType,
};
