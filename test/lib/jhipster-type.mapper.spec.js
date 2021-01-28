const { expect } = require('chai');
const { getJHipsterType } = require('../../generators/entity-microfrontend/lib');

describe('JHipster type mapper', () => {
  [
    'String',
    'Integer',
    'Long',
    'Float',
    'Double',
    'BigDecimal',
    'LocalDate',
    'Instant',
    'ZonedDateTime',
    'Boolean',
  ].forEach(type => {
    it(`should return ${type} when JHipster fieldType is ${type}`, () => {
      const field = {
        fieldType: `${type}`,
      };

      const mappedType = getJHipsterType(field);

      expect(mappedType).to.equal(type);
    });
  });

  it(`should return Enum when JHipster fieldIsEnum is true`, () => {
    const field = {
      fieldIsEnum: true,
    };
    const expectedType = 'Enum';

    const mappedType = getJHipsterType(field);

    expect(mappedType).to.equal(expectedType);
  });

  it(`should return ImageBlob when JHipster fieldType is byte[] and fieldTypeBlobContent is image`, () => {
    const field = {
      fieldType: 'byte[]',
      fieldTypeBlobContent: 'image',
    };
    const expectedType = 'ImageBlob';

    const mappedType = getJHipsterType(field);

    expect(mappedType).to.equal(expectedType);
  });

  it(`should return BinaryFileBlob when JHipster fieldType is byte[] and fieldTypeBlobContent is any`, () => {
    const field = {
      fieldType: 'byte[]',
      fieldTypeBlobContent: 'any',
    };
    const expectedType = 'BinaryFileBlob';

    const mappedType = getJHipsterType(field);

    expect(mappedType).to.equal(expectedType);
  });

  it(`should return TextBlob when JHipster fieldType is byte[] and fieldTypeBlobContent is text`, () => {
    const field = {
      fieldType: 'byte[]',
      fieldTypeBlobContent: 'text',
    };
    const expectedType = 'TextBlob';

    const mappedType = getJHipsterType(field);

    expect(mappedType).to.equal(expectedType);
  });
});
