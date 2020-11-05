import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Snackbar, SnackbarContent } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
  message: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    fontSize: 20,
  },
  iconStatus: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.main,
  },
});

const statusIcon = {
  success: CheckCircleIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const autoHideDurations = {
  success: 3000,
  error: null,
  info: 5000,
};

const Notification = ({ className, classes, status: passedStatus, message, onClose }) => {
  const isOpen = !!message;

  const status = passedStatus || Notification.INFO;
  const Icon = statusIcon[status];
  const autoHideDuration = autoHideDurations[status];

  const messageTemplate = (
    <span className={classes.message}>
      <Icon className={clsx(classes.icon, classes.iconStatus)} />
      {message}
    </span>
  );

  return (
    <Snackbar open={isOpen} onClose={onClose} autoHideDuration={autoHideDuration}>
      <SnackbarContent
        className={clsx(classes[status], className)}
        message={messageTemplate}
        action={[
          <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
            <CloseIcon className={classes.icon} />
          </IconButton>,
        ]}
      />
    </Snackbar>
  );
};

Notification.SUCCESS = 'success';
Notification.ERROR = 'error';
Notification.INFO = 'info';

Notification.propTypes = {
  classes: PropTypes.shape({
    message: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    iconStatus: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired,
  }).isRequired,
  className: PropTypes.string,
  status: PropTypes.oneOf([Notification.SUCCESS, Notification.ERROR, Notification.INFO]),
  message: PropTypes.string,
  onClose: PropTypes.func,
};

Notification.defaultProps = {
  message: null,
  className: '',
  status: Notification.INFO,
  onClose: () => {},
};

export default withStyles(styles, { withTheme: true })(Notification);
