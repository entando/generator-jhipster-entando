import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class ConfirmationDialogTrigger extends PureComponent {
  static CONFIRM = 'CONFIRM';

  static DISCARD = 'DISCARD';

  constructor(props) {
    super(props);
    this.state = { open: false };
    this.handleOpen = this.handleOpen.bind(this);
    this.discard = this.discard.bind(this);
    this.confirm = this.confirm.bind(this);
  }

  handleOpen() {
    this.setState(() => ({
      open: true,
    }));
  }

  handleClose(action) {
    const { onCloseDialog } = this.props;
    this.setState(() => ({
      open: false,
    }));
    onCloseDialog(action);
  }

  discard() {
    this.handleClose(ConfirmationDialogTrigger.DISCARD);
  }

  confirm() {
    this.handleClose(ConfirmationDialogTrigger.CONFIRM);
  }

  render() {
    const { open } = this.state;
    const {
      dialog: { title, description, confirmLabel, discardLabel },
      Renderer,
    } = this.props;
    return (
      <div>
        <Renderer onClick={this.handleOpen} />
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="confirmation-dialog-title"
          aria-describedby="confirmation-dialog-description"
        >
          <DialogTitle id="confirmation-dialog-title">{title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="confirmation-dialog-description">
              {description}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.discard} autoFocus>
              {discardLabel}
            </Button>
            <Button onClick={this.confirm} color="primary">
              {confirmLabel}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

ConfirmationDialogTrigger.propTypes = {
  dialog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    confirmLabel: PropTypes.string.isRequired,
    discardLabel: PropTypes.string.isRequired,
  }).isRequired,
  onCloseDialog: PropTypes.func.isRequired,
  Renderer: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
};
