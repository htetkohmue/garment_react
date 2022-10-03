import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate, Link as RouterLink, useParams } from 'react-router-dom';

// material
import { Stack, TextField, IconButton, InputAdornment, label } from '@mui/material';
import DatePicker from '../../../common/datepicker/DatePicker';

export default function CustomerData(props) {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
          date: '',
          customer_id: '',
          customer_name: ''
        },
        // validationSchema: RegisterSchema,
        onSubmit: (values, { resetForm }) => {
          resetForm({ values: '' });
          // navigate('/dashboard/tailors-register', { replace: true });
        },
      });
    
      const { errors, touched, handleSubmit, isSubmitting, getFieldProps, handleChange, handleBlur } = formik;

    return (
        <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Stack spacing={4}>
                 <DatePicker required
                    label='Date'
                    value={props.date}
                    onChange={props.handleChangeDate}
                    error={props.dateError}
                    helperText={props.dateErrorHelperText}
                />   
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <TextField
                    fullWidth
                    label="Customer ID"
                    {...getFieldProps('customer_id')}
                    error={Boolean(touched.customer_id && errors.customer_id)}
                    helperText={touched.customer_id && errors.customer_id}
                />  
                <TextField
                    fullWidth
                    label="Customer Name"
                    {...getFieldProps('customer_name')}
                    error={Boolean(touched.customer_id && errors.customer_id)}
                    helperText={touched.customer_id && errors.customer_id}
                />  
                </Stack>
            </Stack>               
            </Form>        
        </FormikProvider>
    )
}