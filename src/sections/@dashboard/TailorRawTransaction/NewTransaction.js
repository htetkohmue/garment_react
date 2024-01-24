import {
    Container
   , Stack
   ,Button
   , FormControl
   , InputLabel
   , Select
   , MenuItem
   , FormHelperText 
   ,TextField
   ,Alert
} from '@mui/material'

import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ApiPath from '../../../common/common-api/api-path/ApiPath';
import { ApiRequest } from '../../../common/common-api/api-request/ApiRequest';

import DatePicker from '../../../common/datepicker/DatePicker';

export default function NewTransaction(open,successMsg,errorMsg,handleClose){
    return (
        <Container>
            <Dialog open={open} onClose={handleClose} >
                    {successMsg && (
                    <Alert variant="filled" severity="info">
                        <b>{successMsg}</b>
                    </Alert>
                    )}
                    {errorMsg && (
                    <Alert variant="filled" severity="error">
                        <b>{errorMsg}</b>
                    </Alert>
                    )}
                    <DialogTitle>New Tailor Transaction </DialogTitle>
                    <DialogContent>
                    <TextField
                        required
                        autoFocus
                        margin="dense"
                        id="newTownshipName"
                        label="TownShip Name"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    </DialogContent>
                    <DialogActions>
                    <Button>Add</Button>
                    <Button onClick={handleClose}>Close</Button>                    
                    </DialogActions>
                </Dialog>
        </Container>
    );
}
