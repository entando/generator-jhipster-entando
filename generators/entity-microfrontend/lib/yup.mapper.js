const jhipsterMapper = require('./jhipster-type.mapper');

function getYupType(field) {
  const fieldType = jhipsterMapper.getJHipsterType(field);
  switch (fieldType) {
    case 'String':
      return ['string()'];
    case 'Integer':
    case 'Long':
    case 'Float':
    case 'Double':
    case 'BigDecimal':
      return ['number()'];
    case 'LocalDate':
    case 'Instant':
    case 'ZonedDateTime':
      return ['date()', 'nullable()'];
    case 'Boolean':
      return ['boolean()'];
    case 'Enum':
    case 'ImageBlob':
    case 'BinaryFileBlob':
    case 'TextBlob':
      return ['string()'];
    default:
      return undefined;
  }
}

function getYupValidationRules(field) {
  const fieldValidateRules = field.fieldValidateRules || [];

  return (
    fieldValidateRules
      // filtering out rules that are unsupported by yup
      .filter(rule => ['required', 'minlength', 'maxlength', 'pattern', 'min', 'max'].includes(rule))
      .map(rule => {
        switch (rule) {
          case 'required':
            return 'required()';
          case 'minlength':
            return `min(${field.fieldValidateRulesMinlength})`;
          case 'maxlength':
            return `max(${field.fieldValidateRulesMaxlength})`;
          case 'pattern':
            return `matches(/${field.fieldValidateRulesPattern}/)`;
          case 'min':
            return `min(${field.fieldValidateRulesMin})`;
          case 'max':
            return `max(${field.fieldValidateRulesMax})`;
          default:
            return undefined;
        }
      })
  );
}

function getYupValues(fields) {
  return fields.map(field => {
    const fieldYupType = getYupType(field);
    const fieldYupRules = getYupValidationRules(field);

    return `${field.fieldName}: Yup.${[...fieldYupType, ...fieldYupRules].join('.')},`;
  });
}

module.exports = {
  getYupType,
  getYupValidationRules,
  getYupValues,
};
