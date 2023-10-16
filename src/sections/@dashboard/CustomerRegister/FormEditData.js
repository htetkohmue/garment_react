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
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate,Link as RouterLink,useParams  } from 'react-router-dom';
import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ApiPath from '../../../common/common-api/api-path/ApiPath';
import { ApiRequest } from '../../../common/common-api/api-request/ApiRequest';

import DatePicker from '../../../common/datepicker/DatePicker';

export default function FormEditData(props) {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [newTown, setnewTown] = useState("");
    const [successMsg, setSuccessMsg] = useState(''); // for success msg
    const [errorMsg, setErrorMsg] = useState(''); // for error msg

    const formik = useFormik({
        initialValues: {
            customerId: props.values.customerId,
            nameEng: props.values.nameEng,
            nameMm: props.values.nameMm,
            phone: props.values.phone,
            email: props.values.email,
            nrc: props.values.nrc,
            address: props.values.address,
            townshipName: props.values.townshipName,
            status: props.values.status,
            joinDate: props.values.joinDate,
            description: props.values.description,
        },
        onSubmit: (values,{resetForm}) => {
          resetForm({values:''});
          navigate('/dashboard/customers-register', { replace: true });
        },
      });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    window.location.reload(false);
  };

  const addNewTownship = (event) => {
    (async () => {
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

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps,handleChange,handleBlur} = formik;
 
  return (
    <>
        <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Stack spacing={2} style={{ marginBottom: '20px' }}>                
                <Stack spacing={2}>
                <TextField
                    disabled
                    fullWidth
                    label="Customer ID *"
                    {...getFieldProps('customerId')}
                    error={Boolean(touched.customerId && errors.customerId)}
                    helperText={touched.customerId && errors.customerId}
                />
                <Stack  direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <FormControl fullWidth >
                    <InputLabel id="demo-simple-select-required-label">Township Name</InputLabel>
                    <Select
                    labelId="demo-simple-select-required-label"
                    id="demo-simple-select-required"
                    label="Township Name*"
                    {...getFieldProps('townshipName')}
                    error={Boolean(touched.townshipName&& errors.townshipName)}
                    helperText={touched.townshipName && errors.townshipName}
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
                    {...getFieldProps('nameEng')}
                    error={Boolean(touched.nameEng && errors.nameEng)}
                    helperText={touched.nameEng && errors.nameEng}
                />
                <TextField
                    fullWidth
                    label="Myanmar Name *"
                    {...getFieldProps('nameMm')}
                    error={Boolean(touched.nameMm && errors.nameMm)}
                    helperText={touched.nameMm && errors.nameMm}
                />
                </Stack>
                <TextField
                    fullWidth
                    label="Email"
                    {...getFieldProps('email')}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                />               
                 <TextField
                    fullWidth
                    label="Phone Number *"
                    {...getFieldProps('phone')}
                    error={Boolean(touched.phone && errors.phone)}
                    helperText={touched.phone && errors.phone}
                />
                 <TextField
                    fullWidth
                    label="NRC Number *"
                    {...getFieldProps('nrc')}
                    error={Boolean(touched.nrc && errors.nrc)}
                    helperText={touched.nrc && errors.nrc}
                />
                <TextField
                    fullWidth
                    label="Address *"
                    {...getFieldProps('address')}
                    error={Boolean(touched.address && errors.address)}
                    helperText={touched.address && errors.address}
                />
                
                <FormControl fullWidth >
                    <InputLabel id="demo-simple-select-required-label">Status</InputLabel>
                    <Select
                    labelId="demo-simple-select-required-label"
                    id="demo-simple-select-required"
                    label="Status *"
                    {...getFieldProps('status')}
                    error={Boolean(touched.status && errors.status)}
                    helperText={touched.status && errors.status}
                    >
                        <MenuItem value={1}>Active</MenuItem>
                        <MenuItem value={2}>Inactive</MenuItem>
                    </Select>
                </FormControl>
                
                {/* <DatePicker required
                    label='Date'
                    {...getFieldProps('joinDate')}
                    error={Boolean(touched.joinDate && errors.joinDate)}
                    helperText={touched.joinDate && errors.joinDate}
                /> */}
                <TextField
                    fullWidth
                    label="Description"
                    {...getFieldProps('description')}
                    error={Boolean(touched.description && errors.description)}
                    helperText={touched.description && errors.description}
                />                          
                </Stack>
            </Stack>
            <Stack spacing={3} style={{ marginBottom: '20px' }} justifyContent="center" alignItems="center">
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <Button fullWidth size="large" type="submit" variant="contained" onClick={(e) => props.updateCustomer(formik.values)}>
                        Update
                    </Button>

                    <Button fullWidth size="large" variant="contained" onClick={props.clickCancel}>
                        Cancel
                    </Button>
                </Stack>
            </Stack>
            </Form>
    </FormikProvider>
    </>
  )
}

