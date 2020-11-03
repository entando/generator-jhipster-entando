const { expect } = require('chai');
const sinon = require('sinon');
const {
  getPropType,
  isRequiredPropType,
  getFormikValuePropType,
  getFormikTouchedPropType,
  getFormikErrorPropType,
} = require('../../generators/entity-server/lib/prop-types.mapper');
const jhipsterMapper = require('../../generators/entity-server/lib/jhipster-type.mapper');

let getJHipsterTypeStub;

describe('getPropType', () => {
  afterEach(() => {
    if (getJHipsterTypeStub) {
      getJHipsterTypeStub.restore();
    }
  });

  ['Integer', 'Long', 'Float', 'Double', 'BigDecimal'].forEach(type => {
    it(`should return PropTypes.number when JHipster fieldType is ${type}`, () => {
      getJHipsterTypeStub = sinon.stub(jhipsterMapper, 'getJHipsterType').returns(`${type}`);
      const propType = getPropType({});

      expect(propType).to.be.a('string').to.equal('PropTypes.number');
    });
  });

  [
    'String',
    'LocalDate',
    'Instant',
    'ZonedDateTime',
    'Enum',
    'ImageBlob',
    'BinaryFileBlob',
    'TextBlob',
  ].forEach(type => {
    it(`should return PropTypes.string when JHipster fieldType is ${type}`, () => {
      getJHipsterTypeStub = sinon.stub(jhipsterMapper, 'getJHipsterType').returns(`${type}`);
      const propType = getPropType({});

      expect(propType).to.be.a('string').to.equal('PropTypes.string');
    });
  });

  it('should return PropTypes.bool when JHipster fieldType is Boolean', () => {
    getJHipsterTypeStub = sinon.stub(jhipsterMapper, 'getJHipsterType').returns('Boolean');
    const propType = getPropType({});

    expect(propType).to.be.a('string').to.equal('PropTypes.bool');
  });

  it('should return PropTypes.any when JHipster fieldType is unknown', () => {
    getJHipsterTypeStub = sinon.stub(jhipsterMapper, 'getJHipsterType').returns('unknown');
    const propType = getPropType({});

    expect(propType).to.be.a('string').to.equal('PropTypes.any');
  });
});

describe('isRequiredPropType', () => {
  it('should return .isRequired when JHipster field has required in validates rules', () => {
    const propType = isRequiredPropType({ fieldValidateRules: ['required'] });

    expect(propType).to.be.a('string').to.equal('.isRequired');
  });

  it('should return empty string when JHipster field has at least required in validates rules', () => {
    const propType = isRequiredPropType({ fieldValidateRules: ['required', 'max'] });

    expect(propType).to.be.a('string').to.equal('.isRequired');
  });

  it('should return empty string when JHipster field has not required in validates rules', () => {
    const propType = isRequiredPropType({ fieldValidateRules: ['max'] });

    // eslint-disable-next-line no-unused-expressions
    expect(propType).to.be.a('string').that.is.empty;
  });

  it('should return empty string when JHipster field has not fieldValidateRules', () => {
    const propType = isRequiredPropType({});

    // eslint-disable-next-line no-unused-expressions
    expect(propType).to.be.a('string').that.is.empty;
  });
});

describe('getFormikValuePropType', () => {
  afterEach(() => {
    if (getJHipsterTypeStub) {
      getJHipsterTypeStub.restore();
    }
  });

  ['String', 'Enum', 'ImageBlob', 'BinaryFileBlob', 'TextBlob'].forEach(type => {
    it(`should return PropTypes.string when JHipster fieldType is ${type}`, () => {
      getJHipsterTypeStub = sinon.stub(jhipsterMapper, 'getJHipsterType').returns(`${type}`);
      const propType = getFormikValuePropType({});

      expect(propType).to.be.an('array').to.have.lengthOf(1).to.deep.equal(['PropTypes.string']);
    });
  });

  ['Integer', 'Long', 'Float', 'Double', 'BigDecimal'].forEach(type => {
    it(`should return PropTypes.number when JHipster fieldType is ${type}`, () => {
      getJHipsterTypeStub = sinon.stub(jhipsterMapper, 'getJHipsterType').returns(`${type}`);
      const propType = getFormikValuePropType({});

      expect(propType)
        .to.be.a('array')
        .to.have.lengthOf(2)
        .to.deep.equal(['PropTypes.string', 'PropTypes.number']);
    });
  });

  ['LocalDate', 'Instant', 'ZonedDateTime'].forEach(type => {
    it(`should return ['PropTypes.string', 'PropTypes.instanceOf(Date)'] when JHipster fieldType is ${type}`, () => {
      getJHipsterTypeStub = sinon.stub(jhipsterMapper, 'getJHipsterType').returns(`${type}`);
      const propType = getFormikValuePropType({});

      expect(propType)
        .to.be.an('array')
        .to.have.lengthOf(2)
        .to.deep.equal(['PropTypes.string', 'PropTypes.instanceOf(Date)']);
    });
  });

  it('should return [PropTypes.bool] when JHipster fieldType is Boolean', () => {
    getJHipsterTypeStub = sinon.stub(jhipsterMapper, 'getJHipsterType').returns('Boolean');
    const propType = getFormikValuePropType({});

    expect(propType).to.be.an('array').to.have.lengthOf(1).to.deep.equal(['PropTypes.bool']);
  });

  it('should return  [PropTypes.any] when JHipster fieldType is unknown', () => {
    getJHipsterTypeStub = sinon.stub(jhipsterMapper, 'getJHipsterType').returns('unknown');
    const propType = getFormikValuePropType({});

    expect(propType).to.be.a('array').to.have.lengthOf(1).to.deep.equal(['PropTypes.any']);
  });
});

describe('getFormikTouchedPropType', () => {
  afterEach(() => {
    if (getJHipsterTypeStub) {
      getJHipsterTypeStub.restore();
    }
  });

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
    'Enum',
    'ImageBlob',
    'BinaryFileBlob',
    'TextBlob',
  ].forEach(type => {
    it(`should return ['PropTypes.bool', 'PropTypes.shape()'] when JHipster fieldType is ${type}`, () => {
      getJHipsterTypeStub = sinon.stub(jhipsterMapper, 'getJHipsterType').returns(`${type}`);
      const propType = getFormikTouchedPropType({});

      expect(propType)
        .to.be.an('array')
        .to.have.lengthOf(2)
        .to.deep.equal(['PropTypes.bool', 'PropTypes.shape()']);
    });
  });

  it('should return [PropTypes.any] when JHipster fieldType is unknown', () => {
    getJHipsterTypeStub = sinon.stub(jhipsterMapper, 'getJHipsterType').returns('unknown');
    const propType = getFormikTouchedPropType({});

    expect(propType).to.be.a('array').to.have.lengthOf(1).to.deep.equal(['PropTypes.any']);
  });
});

describe('getFormikErrorPropType', () => {
  afterEach(() => {
    if (getJHipsterTypeStub) {
      getJHipsterTypeStub.restore();
    }
  });

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
    'Enum',
    'ImageBlob',
    'BinaryFileBlob',
    'TextBlob',
  ].forEach(type => {
    it(`should return ['PropTypes.string', 'PropTypes.shape()'] when JHipster fieldType is ${type}`, () => {
      getJHipsterTypeStub = sinon.stub(jhipsterMapper, 'getJHipsterType').returns(`${type}`);
      const propType = getFormikErrorPropType({});

      expect(propType)
        .to.be.an('array')
        .to.have.lengthOf(2)
        .to.deep.equal(['PropTypes.string', 'PropTypes.shape()']);
    });
  });

  it('should return [PropTypes.any] when JHipster fieldType is unknown', () => {
    getJHipsterTypeStub = sinon.stub(jhipsterMapper, 'getJHipsterType').returns('unknown');
    const propType = getFormikErrorPropType({});

    expect(propType).to.be.a('array').to.have.lengthOf(1).to.deep.equal(['PropTypes.any']);
  });
});
