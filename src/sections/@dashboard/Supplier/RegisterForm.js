/* import css */
import * as yup from 'yup';
import { useFormik, Form, FormikProvider, useFormikContext } from 'formik';
import { useNavigate } from 'react-router-dom';

// material
import { Stack, Button, TextField } from '@mui/material';
import '../../../css/common.css';

export default function RegisterForm(props) {
  const navigate = useNavigate();
  const RegisterSchema = yup.object().shape({
    nameMm: yup.string().min(2, 'Too short').max(50, 'Too long').required('Enter your name in Myanmar'),
    nameEn: yup.string().min(2, 'Too short').max(50, 'Too long').required('Enter your name in English'),
    phoneNo: yup.string().min(8).required('Enter your phone number'),
    email: yup.string().email('Enter valid email'),
    address: yup.string().required('Enter your address'),
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      nameMm: props.editSupplier.name_mm || '',
      nameEn: props.editSupplier.name_en || '',
      phoneNo: props.editSupplier.phone_no || '',
      email: props.editSupplier.email || '',
      company: props.editSupplier.company || '',
      address: props.editSupplier.address || '',
      comment: props.editSupplier.comment || '',
    },
    validationSchema: RegisterSchema,
    onSubmit: (values, { resetForm }) => {
      resetForm({ values: '' });
      navigate('/dashboard/supplier', { replace: true });
    },
  });

  // const onChange = (e) => {
  //   // console.log(e.target.name);
  //   const name = e.target.name;
  //   const val = e.target.value;
  //   props.setEditSupplier((prevState) => {
  //     return {
  //       ...prevState,
  //       [name]: val,
  //     };
  //   });
  // };

  const { errors, touched, handleSubmit, getFieldProps, handleChange } = formik;

  // const { setFieldValue } = useFormikContext();
  // const handleChange = (option) => {
  //   setFieldValue(props.name, option);
  // };
  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <TextField
            fullWidth
            label="အမည်"
            {...getFieldProps('nameMm')}
            error={Boolean(touched.nameMm && errors.nameMm)}
            helperText={touched.nameMm && errors.nameMm}
          />
          <TextField
            fullWidth
            label="အမည် (English)"
            {...getFieldProps('nameEn')}
            error={Boolean(touched.nameEn && errors.nameEn)}
            helperText={touched.nameEn && errors.nameEn}
          />

          <TextField
            fullWidth
            label="ဖုန်းနံပါတ်"
            {...getFieldProps('phoneNo')}
            error={Boolean(touched.phoneNo && errors.phoneNo)}
            helperText={touched.phoneNo && errors.phoneNo}
          />
          <TextField fullWidth label="အီးမေးလ်" {...getFieldProps('email')} />
          <TextField fullWidth label="ကုမ္ပဏီ/စက်ရုံ" {...getFieldProps('company')} />
          <TextField
            fullWidth
            label="လိပ်စာ"
            {...getFieldProps('address')}
            error={Boolean(touched.address && errors.address)}
            helperText={touched.address && errors.address}
          />
          <TextField fullWidth label="မှတ်ချက်" {...getFieldProps('comment')} />
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="right">
            {props.editSupplier ? (
              <Button
                size="large"
                type="submit"
                variant="contained"
                className="button"
                style={{ width: '100px', boxSizing: 'small' }}
                onClick={(e) => props.update(formik.values)}
              >
                ပြင်မည်
              </Button>
            ) : (
              <Button
                size="large"
                type="submit"
                variant="contained"
                className="button"
                style={{ width: '100px', boxSizing: 'small' }}
                onClick={(e) => props.register(formik.values)}
              >
                သိမ်းမည်
              </Button>
            )}
          </Stack>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
