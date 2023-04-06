const { expect } = require('chai');
const sinon = require('sinon');
const {
  getYupType,
  getYupValidationRules,
  getYupValues,
} = require('../../generators/entity-microfrontend/lib/yup.mapper');
const yupMapper = require('../../generators/entity-microfrontend/lib/yup.mapper');
const jhipsterMapper = require('../../generators/entity-microfrontend/lib/jhipster-type.mapper');

let getJHipsterTypeStub;
let getYupTypeStub;
let getYupValidationRulesStub;

describe('getYupType', () => {
  afterEach(() => {
    if (getJHipsterTypeStub) {
      getJHipsterTypeStub.restore();
    }
  });
  it('should return [string()] when JHipster fieldType is String', () => {
    getJHipsterTypeStub = sinon.stub(jhipsterMapper, 'getJHipsterType').returns('String');
    const yupType = getYupType({});

    expect(yupType).to.be.an('array').to.have.lengthOf(1).to.deep.equal(['string()']);
  });

  ['Integer', 'Long', 'Float', 'Double', 'BigDecimal'].forEach(type => {
    it(`should return [number()] when JHipster fieldType is ${type}`, () => {
      getJHipsterTypeStub = sinon.stub(jhipsterMapper, 'getJHipsterType').returns(`${type}`);
      const yupType = getYupType({});

      expect(yupType).to.be.an('array').to.have.lengthOf(1).to.deep.equal(['number()']);
    });
  });

  ['LocalDate', 'Instant', 'ZonedDateTime'].forEach(type => {
    it(`should return ['date()', 'nullable()'] when JHipster fieldType is ${type}`, () => {
      getJHipsterTypeStub = sinon.stub(jhipsterMapper, 'getJHipsterType').returns(`${type}`);
      const yupType = getYupType({});

      expect(yupType).to.be.an('array').to.have.lengthOf(2).to.deep.equal(['date()', 'nullable()']);
    });
  });

  it('should return [boolean()] when JHipster fieldType is Boolean', () => {
    getJHipsterTypeStub = sinon.stub(jhipsterMapper, 'getJHipsterType').returns('Boolean');
    const yupType = getYupType({});

    expect(yupType).to.be.an('array').to.have.lengthOf(1).to.deep.equal(['boolean()']);
  });

  ['Enum', 'ImageBlob', 'BinaryFileBlob', 'TextBlob'].forEach(type => {
    it(`should return ['string()'] when JHipster fieldType is ${type}`, () => {
      getJHipsterTypeStub = sinon.stub(jhipsterMapper, 'getJHipsterType').returns(`${type}`);
      const yupType = getYupType({});

      expect(yupType).to.be.an('array').to.have.lengthOf(1).to.deep.equal(['string()']);
    });
  });

  it('should return undefined when JHipster fieldType is UNKNOWN_TYPE', () => {
    getJHipsterTypeStub = sinon.stub(jhipsterMapper, 'getJHipsterType').returns('UNKNOWN_TYPE');
    const yupType = getYupType({});

    expect(yupType).to.be.an('undefined');
  });
});

describe('getYupValidationRules', () => {
  it('should return [required()] when fieldValidateRules is required', () => {
    const field = { fieldValidateRules: ['required'] };
    const yupType = getYupValidationRules(field);

    expect(yupType).to.be.an('array').to.have.lengthOf(1).to.deep.equal(['required()']);
  });

  it('should return [min()] when fieldValidateRules is minlength', () => {
    const field = { fieldValidateRules: ['minlength'], fieldValidateRulesMinlength: 5 };
    const yupType = getYupValidationRules(field);

    expect(yupType)
      .to.be.an('array')
      .to.have.lengthOf(1)
      .to.deep.equal([`min(${field.fieldValidateRulesMinlength})`]);
  });

  it('should return [max()] when fieldValidateRules is maxlength', () => {
    const field = { fieldValidateRules: ['maxlength'], fieldValidateRulesMaxlength: 5 };
    const yupType = getYupValidationRules(field);

    expect(yupType)
      .to.be.an('array')
      .to.have.lengthOf(1)
      .to.deep.equal([`max(${field.fieldValidateRulesMaxlength})`]);
  });

  it('should return [matches()] when fieldValidateRules is pattern', () => {
    const field = { fieldValidateRules: ['pattern'], fieldValidateRulesPattern: '[a-zA-Z] [a-z[A-Z]]' };
    const yupType = getYupValidationRules(field);

    expect(yupType)
      .to.be.an('array')
      .to.have.lengthOf(1)
      .to.deep.equal([`matches(/${field.fieldValidateRulesPattern}/)`]);
  });

  it('should return [min()] when fieldValidateRules is min', () => {
    const field = { fieldValidateRules: ['min'], fieldValidateRulesMin: 2 };
    const yupType = getYupValidationRules(field);

    expect(yupType)
      .to.be.an('array')
      .to.have.lengthOf(1)
      .to.deep.equal([`min(${field.fieldValidateRulesMin})`]);
  });

  it('should return [max()] when fieldValidateRules is max', () => {
    const field = { fieldValidateRules: ['max'], fieldValidateRulesMax: 3 };
    const yupType = getYupValidationRules(field);

    expect(yupType)
      .to.be.an('array')
      .to.have.lengthOf(1)
      .to.deep.equal([`max(${field.fieldValidateRulesMax})`]);
  });

  it('should return an empty array when fieldValidateRules is unknown', () => {
    const field = { fieldValidateRules: ['UNKNOWN_TYPE'] };
    const yupType = getYupValidationRules(field);

    // eslint-disable-next-line no-unused-expressions
    expect(yupType).to.be.an('array').that.is.empty;
  });

  it('should return all yup validations when field has all rules', () => {
    const field = {
      fieldValidateRules: ['required', 'minlength', 'maxlength', 'pattern', 'min', 'max', 'UNKNOWN_TYPE'],
      fieldValidateRulesMinlength: 5,
      fieldValidateRulesMaxlength: 5,
      fieldValidateRulesPattern: '[a-zA-Z] [a-z[A-Z]]',
      fieldValidateRulesMin: 2,
      fieldValidateRulesMax: 3,
    };
    const yupType = getYupValidationRules(field);

    expect(yupType)
      .to.be.an('array')
      .to.have.lengthOf(6)
      .to.deep.equal([
        'required()',
        `min(${field.fieldValidateRulesMinlength})`,
        `max(${field.fieldValidateRulesMaxlength})`,
        `matches(/${field.fieldValidateRulesPattern}/)`,
        `min(${field.fieldValidateRulesMin})`,
        `max(${field.fieldValidateRulesMax})`,
      ]);
  });
});

describe('getYupValues', () => {
  afterEach(() => {
    if (getYupTypeStub) {
      getYupTypeStub.restore();
    }

    if (getYupValidationRulesStub) {
      getYupValidationRulesStub.restore();
    }
  });

  it('should return an array of 1 element when give 1 fields-', () => {
    getYupTypeStub = sinon.stub(yupMapper, 'getYupType').returns(['string()']);
    getYupValidationRulesStub = sinon.stub(yupMapper, 'getYupValidationRules').returns('required()');

    const fields = [{ fieldName: 'field1', fieldType: 'String', fieldValidateRules: ['required'] }];
    const yupValues = getYupValues(fields);

    expect(yupValues)
      .to.be.an('array')
      .to.have.lengthOf(1)
      .to.deep.equal(['field1: Yup.string().required(),']);
  });

  it('should return an array of 2 elements when give 2 fields', () => {
    getYupTypeStub = sinon.stub(yupMapper, 'getYupType').returns(['string()']);
    getYupValidationRulesStub = sinon.stub(yupMapper, 'getYupValidationRules').returns('required()');

    const fields = [
      { fieldName: 'field1', fieldType: 'String', fieldValidateRules: ['required'] },
      { fieldName: 'field2', fieldType: 'String', fieldValidateRules: ['required'] },
    ];
    const yupValues = getYupValues(fields);

    expect(yupValues)
      .to.be.an('array')
      .to.have.lengthOf(2)
      .to.deep.equal(['field1: Yup.string().required(),', 'field2: Yup.string().required(),']);
  });
});
