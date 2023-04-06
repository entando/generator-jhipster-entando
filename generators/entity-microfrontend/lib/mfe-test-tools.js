const casual = require('casual');

const jhipsterMapper = require('./jhipster-type.mapper');

function getGeneratedValue(fieldType, { fieldValues }) {
  switch (fieldType) {
    case 'String':
      return casual.text;
    case 'Integer':
    case 'Long':
    case 'BigDecimal':
      return casual.integer();
    case 'Float':
      return casual.random;
    case 'Double':
      return casual.double();
    case 'LocalDate':
      return casual.date('YYYY-MM-DD');
    case 'Instant':
    case 'ZonedDateTime':
      return casual.moment.format();
    case 'Boolean':
      return casual.coin_flip;
    case 'Enum': {
      const enumValues = fieldValues.split(',');
      return enumValues[Math.floor(Math.random() * enumValues.length)];
    }
    case 'ImageBlob':
    case 'BinaryFileBlob':
    case 'TextBlob':
      return 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=';
    default:
      return casual.text;
  }
}

function getMockData(fields, count) {
  return Array.from({ length: count }, (value, index) => {
    return fields.reduce(
      (acc, field) => {
        const fieldType = jhipsterMapper.getJHipsterType(field);
        const fieldValue = getGeneratedValue(fieldType, field);
        return { ...acc, [field.fieldName]: fieldValue };
      },
      { id: index }
    );
  });
}

module.exports = {
  getMockData,
  getGeneratedValue,
};
