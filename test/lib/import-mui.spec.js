const { expect } = require('chai');
const sinon = require('sinon');
const { buildDependencies, getMuiInput } = require('../../generators/entity-server/lib/material-ui.mapper');
const jhipsterMapper = require('../../generators/entity-server/lib/jhipster-type.mapper');

let getJHipsterTypeStub;

describe('buildDependencies with one field type', () => {
  ['String', 'Integer', 'Long', 'Float', 'Double', 'BigDecimal'].forEach(type => {
    it(`should return ${type} dependencies when fieldType is ${type}`, () => {
      const expectedMap = new Map().set('@material-ui/core/TextField', new Set(['TextField']));
      const fields = [
        {
          fieldType: `${type}`,
        },
      ];

      const dependencies = buildDependencies(fields);

      expect(expectedMap).to.deep.equal(dependencies);
    });
  });

  it(`should return Boolean dependencies when fieldType is Boolean`, () => {
    const expectedMap = new Map()
      .set('@material-ui/core/Checkbox', new Set(['Checkbox']))
      .set('@material-ui/core/FormControlLabel', new Set(['FormControlLabel']));
    const fields = [
      {
        fieldType: 'Boolean',
      },
    ];

    const dependencies = buildDependencies(fields);

    expect(expectedMap).to.deep.equal(dependencies);
  });

  it(`should return LocalDate dependencies when fieldType is LocalDate`, () => {
    const expectedMap = new Map()
      .set('@material-ui/pickers', new Set(['DatePicker', 'MuiPickersUtilsProvider']))
      .set('@date-io/date-fns', new Set(['DateFnsUtils']))
      .set('i18n/dateFnsLocales', new Set(['dateFnsLocales']));
    const fields = [
      {
        fieldType: 'LocalDate',
      },
    ];

    const dependencies = buildDependencies(fields);

    expect(expectedMap).to.deep.equal(dependencies);
  });

  ['Instant', 'ZonedDateTime'].forEach(type => {
    it(`should return ${type} dependencies when fieldType is ${type}`, () => {
      const expectedMap = new Map()
        .set('@material-ui/pickers', new Set(['DateTimePicker', 'MuiPickersUtilsProvider']))
        .set('@date-io/date-fns', new Set(['DateFnsUtils']))
        .set('i18n/dateFnsLocales', new Set(['dateFnsLocales']));
      const fields = [
        {
          fieldType: `${type}`,
        },
      ];

      const dependencies = buildDependencies(fields);

      expect(expectedMap).to.deep.equal(dependencies);
    });
  });

  it(`should return enum dependencies when fieldType is enum`, () => {
    const expectedMap = new Map()
      .set('@material-ui/core/InputLabel', new Set(['InputLabel']))
      .set('@material-ui/core/Select', new Set(['Select']));
    const fields = [
      {
        fieldIsEnum: true,
      },
    ];

    const dependencies = buildDependencies(fields);

    expect(expectedMap).to.deep.equal(dependencies);
  });
});

describe('buildDependencies with many field type', () => {
  it(`should return Boolean/String dependencies when fieldType are Boolean and String`, () => {
    const expectedMap = new Map()
      .set('@material-ui/core/Checkbox', new Set(['Checkbox']))
      .set('@material-ui/core/FormControlLabel', new Set(['FormControlLabel']))
      .set('@material-ui/core/TextField', new Set(['TextField']));
    const fields = [
      {
        fieldType: 'Boolean',
      },
      {
        fieldType: 'String',
      },
    ];

    const dependencies = buildDependencies(fields);

    expect(expectedMap).to.deep.equal(dependencies);
  });

  it(`should return LocalDate/Instant dependencies when fieldType are Instant and LocalDate`, () => {
    const expectedMap = new Map()
      .set('@material-ui/pickers', new Set(['DatePicker', 'DateTimePicker', 'MuiPickersUtilsProvider']))
      .set('@date-io/date-fns', new Set(['DateFnsUtils']))
      .set('i18n/dateFnsLocales', new Set(['dateFnsLocales']));
    const fields = [
      {
        fieldType: 'LocalDate',
      },
      {
        fieldType: 'Instant',
      },
    ];

    const dependencies = buildDependencies(fields);

    expect(expectedMap).to.deep.equal(dependencies);
  });

  it(`should return enum dependencies when fieldType is enum`, () => {
    const expectedMap = new Map()
      .set('@material-ui/core/TextField', new Set(['TextField']))
      .set('@material-ui/core/Checkbox', new Set(['Checkbox']))
      .set('@material-ui/core/FormControlLabel', new Set(['FormControlLabel']))
      .set('@material-ui/pickers', new Set(['DatePicker', 'DateTimePicker', 'MuiPickersUtilsProvider']))
      .set('@date-io/date-fns', new Set(['DateFnsUtils']))
      .set('i18n/dateFnsLocales', new Set(['dateFnsLocales']))
      .set('@material-ui/core/InputLabel', new Set(['InputLabel']))
      .set('@material-ui/core/Select', new Set(['Select']));
    const fields = [
      {
        fieldType: 'String',
      },
      {
        fieldType: 'Integer',
      },
      {
        fieldType: 'Long',
      },
      {
        fieldType: 'Float',
      },
      {
        fieldType: 'Double',
      },
      {
        fieldType: 'BigDecimal',
      },
      {
        fieldType: 'Boolean',
      },
      {
        fieldType: 'LocalDate',
      },
      {
        fieldType: 'Instant',
      },
      {
        fieldType: 'ZonedDateTime',
      },
      {
        fieldIsEnum: true,
      },
    ];

    const dependencies = buildDependencies(fields);

    expect(expectedMap).to.deep.equal(dependencies);
  });
});

describe('Get Material input', () => {
  afterEach(() => {
    if (getJHipsterTypeStub) {
      getJHipsterTypeStub.restore();
    }
  });

  ['String', 'Integer', 'Long', 'Float', 'Double', 'BigDecimal'].forEach(type => {
    it(`Should return TextField when type is ${type}`, () => {
      getJHipsterTypeStub = sinon.stub(jhipsterMapper, 'getJHipsterType').returns(`${type}`);

      const field = getMuiInput({
        fieldType: `${type}`,
      });
      const result = getMuiInput(field);

      expect(result).to.be.equal('TextField');
    });
  });

  it('Should return DatePicker when type is LocalDate', () => {
    getJHipsterTypeStub = sinon.stub(jhipsterMapper, 'getJHipsterType').returns('LocalDate');

    const field = getMuiInput({
      fieldType: 'LocalDate',
    });
    const result = getMuiInput(field);

    expect(result).to.be.equal('DatePicker');
  });

  ['Instant', 'ZonedDateTime'].forEach(type => {
    it(`Should return DateTimePicker when type is ${type}`, () => {
      getJHipsterTypeStub = sinon.stub(jhipsterMapper, 'getJHipsterType').returns(`${type}`);

      const field = getMuiInput({
        fieldType: `${type}`,
      });
      const result = getMuiInput(field);

      expect(result).to.be.equal('DateTimePicker');
    });
  });

  it('Should return Checkbox when type is Boolean', () => {
    getJHipsterTypeStub = sinon.stub(jhipsterMapper, 'getJHipsterType').returns('Boolean');

    const field = getMuiInput({
      fieldType: 'Boolean',
    });
    const result = getMuiInput(field);

    expect(result).to.be.equal('Checkbox');
  });

  it('Should return Select when type is Enum', () => {
    getJHipsterTypeStub = sinon.stub(jhipsterMapper, 'getJHipsterType').returns('Enum');

    const field = getMuiInput({
      fieldIsEnum: true,
    });
    const result = getMuiInput(field);

    expect(result).to.be.equal('Select');
  });

  ['ImageBlob', 'BinaryFileBlob', 'TextBlob'].forEach(type => {
    it(`Should return TextField when type is ${type}`, () => {
      getJHipsterTypeStub = sinon.stub(jhipsterMapper, 'getJHipsterType').returns(`${type}`);

      const field = getMuiInput({
        fieldType: `${type}`,
      });
      const result = getMuiInput(field);

      expect(result).to.be.equal('TextField');
    });
  });
});
