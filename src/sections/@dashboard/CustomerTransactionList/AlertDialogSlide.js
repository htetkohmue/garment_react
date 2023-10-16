import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function AlertDialogSlide(props) {
  const [open, setOpen] = React.useState(props.open);
  return (
    <div>
      <Dialog
        open={open}
        keepMounted
        onClose={(e) => props.handleClose()}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Do you really want to delete this Customer Transaction Data?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Deleting Customer Transaction Data
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={(e) => props.handleClose()}>Disagree</Button>
          <Button onClick={(e) => props.Agree(props.deleteCusTranId)}>Agree</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
