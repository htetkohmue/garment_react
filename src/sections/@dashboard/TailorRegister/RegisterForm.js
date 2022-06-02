import * as Yup from 'yup';
import { useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate,Link as RouterLink  } from 'react-router-dom';
// material
import { Stack, TextField, IconButton, InputAdornment,Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

export default function TailorsRegisterForm(props) {
  const navigate = useNavigate();

  const RegisterSchema = Yup.object().shape({
    englishName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('English name required'),
    myanmarName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Myanmar name required'),
    phone: Yup.string().required('Phone no is required'),
    nrcNo: Yup.string().required('NRC no is required'),
    address: Yup.string().required('Address is required'),
  });

  const formik = useFormik({
    initialValues: {
      englishName: '',
      myanmarName: '',
      phone: '',
      nrcNo: '',
      address:''
    },
    validationSchema: RegisterSchema,
    onSubmit: () => {
      navigate('/dashboard/app', { replace: true });
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={4}>
         <TextField
              fullWidth
              label="Tailors ID"
              // {...getFieldProps('tailors_id')}
              // error={Boolean(touched.tailors_id && errors.tailors_id)}
              // helperText={touched.tailors_id && errors.tailors_id}
              value={props.tailorsID}
              onChange={props.changeID}
            />
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="English Name"
              // {...getFieldProps('englishName')}
              // error={Boolean(touched.englishName && errors.englishName)}
              // helperText={touched.englishName && errors.englishName}
              value={props.tailorsEngName}
              onChange={props.changeEngName}
            />
            <TextField
              fullWidth
              label="Myanmar Name"
              // {...getFieldProps('myanmarName')}
              // error={Boolean(touched.myanmarName && errors.myanmarName)}
              // helperText={touched.myanmarName && errors.myanmarName}
              value={props.tailorsMyanmarName}
              onChange={props.changeMyanmarName}
            />
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField
            style={{width:'290px'}}
            autoComplete="phone"
            type="phone"
            label="Phone No"
            // {...getFieldProps('phone')}
            // error={Boolean(touched.phone && errors.phone)}
            // helperText={touched.phone && errors.phone}
            value={props.phone}
            onChange={props.changePhone}
          />
          <Typography fullWidth style={{color:'red'}} >
          * get more than one comma ','
          </Typography>
           </Stack>
           <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
           <TextField
            fullWidth
            autoComplete="nrc"
            label="NRC No"
            // {...getFieldProps('nrcNo')}
            // error={Boolean(touched.nrcNo && errors.nrcNo)}
            // helperText={touched.nrcNo && errors.nrcNo}
            value={props.nrcNo}
            onChange={props.changeNrcNo}
          />
           <TextField
            fullWidth
            autoComplete="address"
            label="Address"
            // {...getFieldProps('address')}
            // error={Boolean(touched.address && errors.address)}
            // helperText={touched.address && errors.address}
            value   ={props.address}
            onChange={props.changeAddress}
          />
          </Stack>
          <TextField
            fullWidth
            value={props.description}
            onChange={props.changeDescription}
            autoComplete="Description"
            label="Description"
          
          />
          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting} onClick={props.register} component={RouterLink} to="/dashboard/tailors-register">
            Register
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
