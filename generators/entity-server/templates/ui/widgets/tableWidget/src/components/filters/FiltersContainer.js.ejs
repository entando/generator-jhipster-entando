import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Filter from 'components/filters/Filter';
import filterType from 'components/__types__/filter';

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
  const { classes, filters, applyFilter, update, remove, clear, add, t } = props;

  const hasFilters = filters.length > 0;

  return (
    <Paper className={classes.root}>
      <Button variant="contained" className={classes.button} onClick={add}>
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
          onClick={applyFilter}
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
};

FiltersContainer.defaultProps = {
  applyFilter: () => {},
  add: () => {},
  update: () => {},
  remove: () => {},
  clear: () => {},
};

export default withStyles(styles)(withTranslation()(FiltersContainer));
