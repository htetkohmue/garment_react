import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate, Link as RouterLink, useParams } from 'react-router-dom';

// material
import { Stack
    , TextField
    , IconButton
    , InputAdornment
    , label
    ,Button
    , FormControl
    , InputLabel
    , Select
    , MenuItem } from '@mui/material';

export default function FilterData(props) {
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
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
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
                </Stack>
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
                <Button size="medium" variant="contained" >
                    Add
                </Button> 

            </Stack>               
            </Form>        
        </FormikProvider>
    )
}