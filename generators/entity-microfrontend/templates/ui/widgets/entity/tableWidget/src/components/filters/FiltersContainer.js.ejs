import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Filter from 'components/filters/Filter';
import filterType from 'components/__types__/filter';
import { FILTER_TYPE_NO_VALUE_SPEC } from 'components/filters/utils';

const styles = {
  root: {
    flexGrow: 1,
    padding: '5px',
    marginRight: '65px',
  },
  paper: {
    padding: '5px',
    textAlign: 'center',
    height: '30px',
  },
  icon: {
    padding: '5px',
    color: '#555555',
    '&:hover': {
      color: '#000000',
    },
  },
  button: {
    margin: '5px',
  },
};

const FiltersContainer = props => {
  const { classes, filters, applyFilter, update, remove, clear, add, t, error } = props;

  const hasFilters = filters.length > 0;

  const handleApplyFilter = () => {
    const errors = hasFilters && filters.map((filt) => {
      if (filt.field && filt.operator && !FILTER_TYPE_NO_VALUE_SPEC.includes(filt.operator)) {
        return filt.value ? '' : 'missing filter parameters';
      }
      return '';
    }).filter(f => !!f);
    if (errors && errors.length > 0) {
      error(errors[0]);
    } else {
      applyFilter();
    }
  };

  return (
    <Paper className={classes.root}>
      <Button variant="contained" className={classes.button} onClick={add}  data-testid="button-add-filter">
        {t('filters.addFilter')}
      </Button>
      {hasFilters && (
        <Button className={classes.button} onClick={clear}>
          {t('filters.clearFilters')}
        </Button>
      )}
      {filters.map((filter, index) => {
        const filterKey = `${filter.field}${filter.operator}${index}`;
        return (
          <Filter
            key={filterKey}
            update={update}
            remove={remove}
            filterId={index}
            filter={filter}
          />
        );
      })}
      {hasFilters && (
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={handleApplyFilter}
        >
          {t('filters.filter')}
        </Button>
      )}
    </Paper>
  );
};

FiltersContainer.propTypes = {
  classes: PropTypes.shape().isRequired,
  t: PropTypes.func.isRequired,
  filters: PropTypes.arrayOf(filterType).isRequired,
  applyFilter: PropTypes.func,
  add: PropTypes.func,
  update: PropTypes.func,
  remove: PropTypes.func,
  clear: PropTypes.func,
  error: PropTypes.func,
};

FiltersContainer.defaultProps = {
  applyFilter: () => {},
  add: () => {},
  update: () => {},
  remove: () => {},
  clear: () => {},
  error: () => {},
};

export default withStyles(styles)(withTranslation()(FiltersContainer));
