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

function FormData(props) {
    const [open, setOpen] = React.useState(false);
    const [newTown, setnewTown] = useState("");
    const [successMsg, setSuccessMsg] = useState(''); // for success msg
    const [errorMsg, setErrorMsg] = useState(''); // for error msg

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    window.location.reload(false);
  };

  const addNewTownship = (event) => {
    (async () => {
    console.log(newTown);
    const data = {name: newTown, login_id: 20001}
    const obj = { url: ApiPath.storeTownship, method: 'post',params: data };
    const response = await ApiRequest(obj);
    if (response.flag === true) {
        setSuccessMsg(response.response_data.message);
        setErrorMsg('');
    }
    if (response.flag === false) {
        setErrorMsg(response.message);
        setSuccessMsg('');
    }
    setnewTown('');
    })();
  };
    
  return (
    <>
        <Container>
            <Stack spacing={2} style={{ marginBottom: '20px' }}>                
                <Stack spacing={2}>
                <TextField
                    disabled
                    fullWidth
                    label="Customer ID *"
                    value={props.customerId}
                    onChange={props.handleChangecustomerId}
                    error={props.customerIdError}
                    helperText={props.customerIdHelperText}
                />
                <Stack  direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <FormControl fullWidth >
                    <InputLabel id="demo-simple-select-required-label">Township Name</InputLabel>
                    <Select
                    labelId="demo-simple-select-required-label"
                    id="demo-simple-select-required"
                    value={props.TownshipName}
                    label="Township Name *"
                    onChange={props.handleChangeTownshipName}
                    >
                    {
                        props.townshipAPI.length > 0 &&
                        props.townshipAPI.map((item,index)=>{
                            return(
                                <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                            )
                        })
                    }
                    </Select>
                    {/* <FormHelperText>Required</FormHelperText> */}
                </FormControl>
                
                <Button fullWidth size="large" variant="contained" onClick={handleClickOpen}>
                    Add New Township
                </Button>                
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
                    <DialogTitle>If Township name is not exist , add new one </DialogTitle>
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
                        value={newTown}
                        onChange={(e) => {
                            setnewTown(e.target.value);
                        }}
                    />
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={addNewTownship}>Add</Button>
                    <Button onClick={handleClose}>Close</Button>                    
                    </DialogActions>
                </Dialog>
              
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                    fullWidth
                    label="English Name *"
                    value={props.nameEng}
                    onChange={props.handleChangenameEng}
                    error={props.nameEngError}
                    helperText={props.nameEngHelperText}
                />
                <TextField
                    fullWidth
                    label="Myanmar Name *"
                    value={props.nameMm}
                    onChange={props.handleChangenameMm}
                    error={props.nameMmError}
                    helperText={props.nameMmHelperText}
                />
                </Stack>
                <TextField
                    fullWidth
                    label="Email"
                    value={props.email}
                    onChange={props.handleChangeEmail}
                />               
                 <TextField
                    fullWidth
                    label="Phone Number *"
                    value={props.phone}
                    onChange={props.handleChangephone}
                    error={props.phoneError}
                    helperText={props.phoneHelperText}
                />
                 <TextField
                    fullWidth
                    label="NRC Number *"
                    value={props.nrc}
                    onChange={props.handleChangenrc}
                    error={props.nrcError}
                    helperText={props.nrcHelperText}
                />
                <TextField
                    fullWidth
                    label="Address *"
                    value={props.address}
                    onChange={props.handleChangeaddress}
                    error={props.addressError}
                    helperText={props.addressHelperText}
                />
                
                <FormControl fullWidth >
                    <InputLabel id="demo-simple-select-required-label">Status</InputLabel>
                    <Select
                    labelId="demo-simple-select-required-label"
                    id="demo-simple-select-required"
                    value={props.status}
                    label="Status *"
                    onChange={props.handleChangestatus}
                    >
                        <MenuItem value={1}>Active</MenuItem>
                        <MenuItem value={2}>Inactive</MenuItem>
                    </Select>
                </FormControl>
                
                <DatePicker required
                    label='Join Date'
                    value={props.joinDate}
                    onChange={props.handleChangejoinDate}
                    error={props.joinDateError}
                    helperText={props.joinDateErrorHelperText}
                />
                <TextField
                    fullWidth
                    label="Description"
                    value={props.description}
                    onChange={props.handleChangeDescription}
                />                          
                </Stack>
            </Stack>
            <Stack spacing={3} style={{ marginBottom: '20px' }} justifyContent="center" alignItems="center">
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <Button fullWidth size="large" variant="contained" onClick={props.saveCustomer}>
                        Save
                    </Button>

                    <Button fullWidth size="large" variant="contained" onClick={props.clickCancel}>
                        Cancel
                    </Button>
                </Stack>
            </Stack>
      </Container>
    </>
  )
}

export default FormData
