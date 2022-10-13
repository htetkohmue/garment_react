import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTranslation } from 'react-i18next';

export default function AlertDialogSlide(props) {
  const [open, setOpen] = React.useState(props.open);
  const { t } = useTranslation();
  return (
    <div>
      <Dialog
        open={open}
        keepMounted
        onClose={(e) => props.handleClose()}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{props.dialogTitle}</DialogTitle>
       {props.dialogContent && (<DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {props.dialogContent}
          </DialogContentText>
        </DialogContent>)}
        <DialogActions>
          <Button onClick={(e) => props.handleClose()}>{t('Disagree')}</Button>
          <Button onClick={(e) => props.Agree(props.data)}>{t('Agree')}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
