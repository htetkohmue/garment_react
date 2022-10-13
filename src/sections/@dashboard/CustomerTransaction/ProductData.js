import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate, Link as RouterLink, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

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
    const { t } = useTranslation();

    const formik = useFormik({
        initialValues: {
            productName: '',// get only camel case
            productSize: '',
            productPrice: '',
            productQty:''
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
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <FormControl fullWidth >
                    <InputLabel id="demo-simple-select-required-label">Product Name *</InputLabel>
                    <Select
                    labelId="demo-simple-select-required-label"
                    id="demo-simple-select-required"
                    value={props.productName}
                    label={t("Product Name *")}
                    onChange={props.handleChangeproductName}
                    >
                        <MenuItem value={1}>AAA</MenuItem>
                        <MenuItem value={2}>BBB</MenuItem>
                        <MenuItem value={3}>CCC</MenuItem>
                        <MenuItem value={4}>DDD</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth >
                    <InputLabel id="demo-simple-select-required-label">Size *</InputLabel>
                    <Select
                    labelId="demo-simple-select-required-label"
                    id="demo-simple-select-required"
                    value={props.productSize}
                    label={t("Size *")}
                    onChange={props.handleChangeproductSize}
                    >
                        <MenuItem value={1}>S</MenuItem>
                        <MenuItem value={2}>M</MenuItem>
                        <MenuItem value={3}>L</MenuItem>
                        <MenuItem value={4}>XL</MenuItem>
                    </Select>
                </FormControl>
                    <TextField
                    fullWidth
                    label={t("Quantity *")}
                    {...getFieldProps('productQty')}
                    error={Boolean(touched.productQty && errors.productQty)}
                    helperText={touched.productQty && errors.productQty}
                />  
                <TextField
                    fullWidth
                    label={t("Price *")}
                    {...getFieldProps('productPrice')}
                    error={Boolean(touched.productPrice && errors.productPrice)}
                    helperText={touched.productPrice && errors.productPrice}
                />  
                </Stack>
                <Stack alignItems="center" style={{marginTop:'2%'}}>
                    <Button 
                    type="submit"
                    size="large" 
                    variant="contained" 
                    loading={isSubmitting}
                    onClick={(e) => props.clickAdd(formik.values)}>
                      {t("Add")}
                    </Button> 
                </Stack>              
            </Form>        
        </FormikProvider>
    )
}