// import * as yup from 'yup';
// import { useState } from 'react';
// import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate,Link as RouterLink,useParams  } from 'react-router-dom';

import React from "react";
import ReactDOM from "react-dom";
import { useFormik, Form, FormikProvider } from 'formik';
import * as yup from 'yup';
import { Stack, Button, TextField } from '@mui/material';

// material
// import { Stack, TextField,  Button } from '@mui/material';
// import { LoadingButton } from '@mui/lab';
// component
// import Iconify from '../../../components/Iconify';

/* import css */
import "../../../css/common.css";

// ----------------------------------------------------------------------

export default function RegisterForm(props) {
  const navigate = useNavigate();
  // const RegisterSchema = Yup.object().shape({
  //   englishName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('English name required'),
  //   myanmarName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Myanmar name required'),
  //   phone: Yup.string().required('Phone no is required'),
  //   nrcNo: Yup.string().required('NRC no is required'),
  //   address: Yup.string().required('Address is required'),
  // });
  const RegisterSchema = yup.object().shape({
    nameMm: yup
      .string()
      .min(2, "Too short")
      .max(50, "Too long")
      .required("Enter your name in Myanmar"),
    nameEn: yup
      .string()
      .min(2, "Too short")
      .max(50, "Too long")
      .required("Enter your name in English"),
    phoneNo: yup
      .string()
      .min(8)
      .required("Enter your phone number"),
    email: yup
      .string()
      .email("Enter valid email"),
    address: yup
      .string()
      .required("Enter your address"),
    });
  const formik = useFormik({
    initialValues: {
      nameMm: '',
      nameEn: '',
      phoneNo: '',
      email: '',
      company: '',
      address: '',
      comment: '',
    },
    validationSchema: RegisterSchema,
    onSubmit: (values, {resetForm}) => {
      resetForm({values:''});
      navigate('/dashboard/supplier', { replace: true });
    },
    // onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
    // },
  });
 
  const { errors, touched, handleSubmit, isSubmitting, getFieldProps, handleChange, handleBlur } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={4}>
        <TextField
          fullWidth
          label="အမည်"
          {...getFieldProps("nameMm")}
          error={Boolean(touched.nameMm && errors.nameMm)}
          helperText={touched.nameMm && errors.nameMm}             
        />
        <TextField
          fullWidth
          label="အမည် (English)"
          {...getFieldProps("nameEn")}
          error={Boolean(touched.nameEn && errors.nameEn)}
          helperText={touched.nameEn && errors.nameMm}          
        />
        <TextField
          fullWidth
          label="ဖုန်းနံပါတ်"
          {...getFieldProps("phoneNo")}
          error={Boolean(touched.phoneNo && errors.phoneNo)}
          helperText={touched.phoneNo && errors.phoneNo}
        />
        <TextField
          fullWidth
          label="အီးမေးလ်"
          {...getFieldProps("email")}          
        />
        <TextField
          fullWidth
          label="ကုမ္ပဏီ/စက်ရုံ"
          {...getFieldProps("company")}         
        />
        <TextField
          fullWidth
          label="လိပ်စာ"
          {...getFieldProps("address")}
          error={Boolean(touched.address && errors.address)}
          helperText={touched.address && errors.address}         
        />
        <TextField
          fullWidth
          label="မှတ်ချက်"
          {...getFieldProps("comment")}          
        />
          {/* <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="English Name"
              // {...getFieldProps('englishName')}
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
          <Typography  style={{color:'red',width:'100%'}} >
          * get more than one comma ','
          </Typography>
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
          <TextField
          fullWidth
            autoComplete="Description"
            label="Description"
            {...getFieldProps('description')}
          
          /> */}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="right"
>
            <Button size="large" type="submit" variant="contained" className="button" style={{width: "100px", boxSizing: "small"}} onClick={(e) => props.register(formik.values)}>
            သိမ်းမည်
            </Button>
            <Button size="large" type="submit" variant="contained" className="button" style={{width: "100px", boxSizing: "small"}}>
            ပယ်ဖျက်မည်
            </Button>
            {/* <LoadingButton  size="large" type="submit" variant="contained" loading={isSubmitting} onClick={(e) => props.register(formik.values)}  className="button" style={{width:"100px"}}>
            သိမ်းမည်
            </LoadingButton> */}
            {/* <LoadingButton  size="large" type="submit" variant="contained" loading={isSubmitting} onClick={(e) => props.register(formik.values)} className="button" style={{width:"100px"}}>
            ပယ်ဖျက်မည်
            </LoadingButton> */}
          </Stack>
        </Stack>
      </Form>
    </FormikProvider>
    
  );
}
