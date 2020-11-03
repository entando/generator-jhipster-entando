function setOrAdd(map, key, ...properties) {
  if (!map) return;

  // eslint-disable-next-line no-unused-expressions
  map.has(key)
    ? properties.forEach(property => map.get(key).add(property))
    : map.set(key, new Set(properties));
}

function buildDependencies(fields) {
  const dependencies = new Map();
  fields.forEach(field => {
    if (['String', 'Integer', 'Long', 'Float', 'Double', 'BigDecimal'].includes(field.fieldType)) {
      setOrAdd(dependencies, '@material-ui/core/TextField', 'TextField');
    } else if (['Boolean'].includes(field.fieldType)) {
      setOrAdd(dependencies, '@material-ui/core/Checkbox', 'Checkbox');
      setOrAdd(dependencies, '@material-ui/core/FormControlLabel', 'FormControlLabel');
    } else if (['LocalDate', 'Instant', 'ZonedDateTime'].includes(field.fieldType)) {
      const datePickerProperty = ['Instant', 'ZonedDateTime'].includes(field.fieldType)
        ? 'DateTimePicker'
        : 'DatePicker';

      setOrAdd(dependencies, '@material-ui/pickers', datePickerProperty, 'MuiPickersUtilsProvider');
      setOrAdd(dependencies, '@date-io/date-fns', 'DateFnsUtils');
      setOrAdd(dependencies, 'i18n/dateFnsLocales', 'dateFnsLocales');
    } else if (field.fieldIsEnum) {
      setOrAdd(dependencies, '@material-ui/core/InputLabel', 'InputLabel');
      setOrAdd(dependencies, '@material-ui/core/Select', 'Select');
    }
    // TODO: ADD BLOBS
  });

  return dependencies;
}

module.exports = buildDependencies;
