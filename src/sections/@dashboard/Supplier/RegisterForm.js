/* import css */
import * as yup from 'yup';
import { useFormik, Form, FormikProvider, useFormikContext } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// material
import { Stack, Button, TextField } from '@mui/material';
import '../../../css/common.css';

export default function RegisterForm(props) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const RegisterSchema = yup.object().shape({
    nameMm: yup.string().min(2, t('Too short')).max(50, t('Too long')).required(t('Enter your name in Myanmar')),
    nameEn: yup.string().min(2, t('Too short')).max(50, t('Too long')).required(t('Enter your name in English')),
    phoneNo: yup.string().min(6).required(t('Enter your phone number')),
    email: yup.string().email(t('Enter valid email')),
    address: yup.string().required(t('Enter your address')),
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      nameMm: props.editSupplier.name_mm || '',
      nameEn: props.editSupplier.name_en || '',
      phoneNo: props.editSupplier.phone_no || '',
      email: props.editSupplier.email || '',
      businessName: props.editSupplier.businessName || '',
      address: props.editSupplier.address || '',
      description: props.editSupplier.description || '',
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
            label={t('Name (Myanmar)')}
            {...getFieldProps('nameMm')}
            error={Boolean(touched.nameMm && errors.nameMm)}
            helperText={touched.nameMm && errors.nameMm}
          />
          <TextField
            fullWidth
            label={t('Name (English)')}
            {...getFieldProps('nameEn')}
            error={Boolean(touched.nameEn && errors.nameEn)}
            helperText={touched.nameEn && errors.nameEn}
          />

          <TextField
            fullWidth
            label={t('Phone No')}
            {...getFieldProps('phoneNo')}
            error={Boolean(touched.phoneNo && errors.phoneNo)}
            helperText={touched.phoneNo && errors.phoneNo}
          />
          <TextField fullWidth label={t('Email')} {...getFieldProps('email')} />
          <TextField fullWidth label={t('Company')} {...getFieldProps('businessName')} />
          <TextField
            fullWidth
            label={t('Address')}
            {...getFieldProps('address')}
            error={Boolean(touched.address && errors.address)}
            helperText={touched.address && errors.address}
          />
          <TextField fullWidth label={t('Description')} {...getFieldProps('description')} />
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
                {t('Update')}
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
                {t('Save')}
              </Button>
            )}
          </Stack>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
