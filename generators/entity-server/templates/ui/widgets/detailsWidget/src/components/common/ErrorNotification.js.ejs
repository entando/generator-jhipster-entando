import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Snackbar, SnackbarContent } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

const styles = theme => ({
  message: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
});

const ErrorNotification = ({ classes, message, onClose }) => {
  const messageTemplate = (
    <span className={classes.message}>
      <ErrorIcon className={clsx(classes.icon, classes.iconVariant)} />
      {message}
    </span>
  );

  return message ? (
    <Snackbar open onClose={onClose}>
      <SnackbarContent
        className={classes.error}
        message={messageTemplate}
        action={[
          <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
            <CloseIcon className={classes.icon} />
          </IconButton>,
        ]}
      />
    </Snackbar>
  ) : (
    ''
  );
};

ErrorNotification.propTypes = {
  classes: PropTypes.shape({
    message: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    iconVariant: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired,
  }).isRequired,
  message: PropTypes.string,
  onClose: PropTypes.func,
};

ErrorNotification.defaultProps = {
  message: null,
  onClose: () => {},
};

export default withStyles(styles, { withTheme: true })(ErrorNotification);
