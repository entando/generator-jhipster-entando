import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

const styles = {
  root: {
    flexShrink: 0,
    marginLeft: '5px',
  },
};

const TablePaginationActions = ({ classes, count, page, rowsPerPage, onChangePage, t }) => {
  const handleFirstPageButtonClick = () => {
    onChangePage(0);
  };

  const handleBackButtonClick = () => {
    onChangePage(page - 1);
  };

  const handleNextButtonClick = () => {
    onChangePage(page + 1);
  };

  const handleLastPageButtonClick = () => {
    onChangePage(Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label={t('pagination.ariaLabels.firstPage')}
      >
        <FirstPageIcon />
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label={t('pagination.ariaLabels.previousPage')}
      >
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label={t('pagination.ariaLabels.nextPage')}
      >
        <KeyboardArrowRight />
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label={t('pagination.ariaLabels.lastPage')}
      >
        <LastPageIcon />
      </IconButton>
    </div>
  );
};

TablePaginationActions.propTypes = {
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  classes: PropTypes.shape({
    root: PropTypes.string,
  }).isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation()(withStyles(styles)(TablePaginationActions));
