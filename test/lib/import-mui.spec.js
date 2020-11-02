const { expect } = require('chai');
const buildDependencies = require('../../generators/entity-server/lib/import-mui');

describe('with one field type', () => {
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

describe('with many field type', () => {
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
