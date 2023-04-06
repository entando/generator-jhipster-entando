const chai = require('chai');

const { expect } = chai;
const chaiDateString = require('chai-date-string');
const moment = require('moment');
const sinon = require('sinon');

const {
  getMockData,
  getGeneratedValue,
} = require('../../generators/entity-microfrontend/lib/mfe-test-tools');
const jhipsterMapper = require('../../generators/entity-microfrontend/lib/jhipster-type.mapper');

let getJHipsterTypeStub;

chai.use(chaiDateString);

describe('getGeneratedValue', () => {
  it('should return random text when JHipster fieldType is String', () => {
    const value = getGeneratedValue('String', {});

    // eslint-disable-next-line no-unused-expressions
    expect(value).to.be.a('string').to.be.not.empty;
  });

  ['Integer', 'Long', 'BigDecimal'].forEach(type => {
    it(`should return random Integer value when JHipster fieldType is ${type}`, () => {
      const value = getGeneratedValue(`${type}`, {});

      // eslint-disable-next-line no-unused-expressions
      expect(value).to.be.a('number');
    });
  });

  it('should return random number when JHipster fieldType is Float', () => {
    const value = getGeneratedValue('Float', {});

    // eslint-disable-next-line no-unused-expressions
    expect(value).to.be.a('number');
  });

  it('should return Double value when JHipster fieldType is Double', () => {
    const value = getGeneratedValue('Double', {});

    // eslint-disable-next-line no-unused-expressions
    expect(value).to.be.a('number');
  });

  it('should return date value when JHipster fieldType is LocalDate', () => {
    const value = getGeneratedValue('LocalDate', {});

    // eslint-disable-next-line no-unused-expressions
    expect(value).to.be.a.dateString();
  });

  ['Instant', 'ZonedDateTime'].forEach(type => {
    it(`should return moment date value when JHipster fieldType is ${type}`, () => {
      const value = moment(getGeneratedValue(`${type}`, {}));

      // eslint-disable-next-line no-unused-expressions
      expect(value.isValid()).to.be.true;
    });
  });

  it('should return boolean value when JHipster fieldType is Boolean', () => {
    const value = getGeneratedValue('Boolean', {});

    // eslint-disable-next-line no-unused-expressions
    expect(value).to.be.a('boolean');
  });

  it('should return XXX value when JHipster fieldType is Enum', () => {
    const valuesAsString = 'John, Doe';
    const valuesAsArray = valuesAsString.split(',');
    const value = getGeneratedValue('Enum', { fieldValues: valuesAsString });

    // eslint-disable-next-line no-unused-expressions
    expect(valuesAsArray).to.be.include(value);
  });

  ['ImageBlob', 'BinaryFileBlob', 'TextBlob'].forEach(type => {
    it(`should return fixed binary value value when JHipster fieldType is ${type}`, () => {
      const value = getGeneratedValue(`${type}`, {});

      // eslint-disable-next-line no-unused-expressions
      expect(value).to.be.equal(
        'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=',
      );
    });
  });
});

describe('getMockData', () => {
  afterEach(() => {
    if (getJHipsterTypeStub) {
      getJHipsterTypeStub.restore();
    }
  });

  it('With one field and one count', () => {
    getJHipsterTypeStub = sinon.stub(jhipsterMapper, 'getJHipsterType').returns(['String']);
    const fields = [
      {
        fieldName: 'field1',
        fieldType: 'String',
      },
    ];

    const value = getMockData(fields, 1);

    expect(value).to.be.an('array').to.have.lengthOf(1);
    expect(value[0]).to.be.an('object');
    expect(value[0].id).to.be.equal(0);
    expect(value[0].field1).to.be.a('String');
  });

  it('With one field and two counts', () => {
    getJHipsterTypeStub = sinon.stub(jhipsterMapper, 'getJHipsterType').returns(['String']);
    const fields = [
      {
        fieldName: 'field1',
        fieldType: 'String',
      },
    ];

    const value = getMockData(fields, 2);

    expect(value).to.be.an('array').to.have.lengthOf(2);
    expect(value[0]).to.be.an('object');
    expect(value[0].id).to.be.equal(0);
    expect(value[0].field1).to.be.a('String');
    expect(value[1]).to.be.an('object');
    expect(value[1].id).to.be.equal(1);
    expect(value[1].field1).to.be.a('String');
  });

  it('With two fields and one count', () => {
    getJHipsterTypeStub = sinon.stub(jhipsterMapper, 'getJHipsterType').returns(['String']);
    const fields = [
      {
        fieldName: 'field1',
        fieldType: 'String',
      },
      {
        fieldName: 'field2',
        fieldType: 'String',
      },
    ];

    const value = getMockData(fields, 1);

    expect(value).to.be.an('array').to.have.lengthOf(1);
    expect(value[0]).to.be.an('object');
    expect(value[0].id).to.be.equal(0);
    expect(value[0].field1).to.be.a('String');
    expect(value[0].field2).to.be.a('String');
  });

  it('With two fields and two counts', () => {
    getJHipsterTypeStub = sinon.stub(jhipsterMapper, 'getJHipsterType').returns(['String']);
    const fields = [
      {
        fieldName: 'field1',
        fieldType: 'String',
      },
      {
        fieldName: 'field2',
        fieldType: 'String',
      },
    ];

    const value = getMockData(fields, 2);

    expect(value).to.be.an('array').to.have.lengthOf(2);
    expect(value[0]).to.be.an('object');
    expect(value[0].id).to.be.equal(0);
    expect(value[0].field1).to.be.a('String');
    expect(value[0].field2).to.be.a('String');
    expect(value[1]).to.be.an('object');
    expect(value[1].id).to.be.equal(1);
    expect(value[1].field1).to.be.a('String');
    expect(value[1].field2).to.be.a('String');
  });
});
