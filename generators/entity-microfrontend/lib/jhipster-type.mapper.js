/**
 * Returns updated JHipster type so that each different type has a string name.
 * @param {object} field - field of an entity with fieldType, fieldIsEnum and (optional) fieldTypeBlobContent
 * @return {string} one of field types: 'String', 'Integer', 'Long', 'Float', 'Double', 'BigDecimal', 'LocalDate', 'Instant', 'ZonedDateTime', 'Boolean', 'Enum', 'ImageBlob', 'BinaryFileBlob', 'TextBlob'
 */
function getJHipsterType({ fieldType, fieldIsEnum, fieldTypeBlobContent }) {
  if (
    ['String', 'Integer', 'Long', 'Float', 'Double', 'BigDecimal', 'LocalDate', 'Instant', 'ZonedDateTime', 'Boolean', 'Duration'].includes(fieldType)
  ) {
    return fieldType;
  }

  if (fieldIsEnum) {
    return 'Enum';
  }

  if (fieldType === 'byte[]' && fieldTypeBlobContent) {
    if (fieldTypeBlobContent === 'image') {
      return 'ImageBlob';
    }
    if (fieldTypeBlobContent === 'any') {
      return 'BinaryFileBlob';
    }
    if (fieldTypeBlobContent === 'text') {
      return 'TextBlob';
    }
  }

  throw new Error(`Unsupported field type: ${JSON.stringify({ fieldType, fieldIsEnum, fieldTypeBlobContent })}`);
}

module.exports = {
  getJHipsterType,
};
