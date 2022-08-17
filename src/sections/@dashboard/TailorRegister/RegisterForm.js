import * as Yup from 'yup';
import { useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate, Link as RouterLink, useParams } from 'react-router-dom';

// material
import { Stack, TextField, IconButton, InputAdornment, Typography, label } from '@mui/material';
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
      tailors_id: '',
      englishName: '',
      myanmarName: '',
      phone: '',
      nrcNo: '',
      address: '',
      description: '',
    },
    // validationSchema: RegisterSchema,
    onSubmit: (values, { resetForm }) => {
      resetForm({ values: '' });
      navigate('/dashboard/tailor-register', { replace: true });
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps, handleChange, handleBlur } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <TextField
            fullWidth
            label="Tailors ID"
            {...getFieldProps('tailors_id')}
            error={Boolean(touched.tailors_id && errors.tailors_id)}
            helperText={touched.tailors_id && errors.tailors_id}
          />
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="English Name"
              {...getFieldProps('englishName')}
              error={Boolean(touched.englishName && errors.englishName)}
              helperText={touched.englishName && errors.englishName}
            />
            <TextField
              fullWidth
              label="Myanmar Name"
              {...getFieldProps('myanmarName')}
              error={Boolean(touched.myanmarName && errors.myanmarName)}
              helperText={touched.myanmarName && errors.myanmarName}
            />
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              autoComplete="phone"
              type="phone"
              label="Phone No"
              {...getFieldProps('phone')}
              error={Boolean(touched.phone && errors.phone)}
              helperText={touched.phone && errors.phone}
            />
            <Typography style={{ color: 'red', width: '100%' }}>* get more than one comma ','</Typography>
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              autoComplete="nrc"
              label="NRC No"
              {...getFieldProps('nrcNo')}
              error={Boolean(touched.nrcNo && errors.nrcNo)}
              helperText={touched.nrcNo && errors.nrcNo}
            />
            <TextField
              fullWidth
              autoComplete="address"
              label="Address"
              {...getFieldProps('address')}
              error={Boolean(touched.address && errors.address)}
              helperText={touched.address && errors.address}
            />
          </Stack>
          <TextField fullWidth autoComplete="Description" label="Description" {...getFieldProps('description')} />
          <LoadingButton
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            onClick={(e) => props.register(formik.values)}
          >
            Register
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
