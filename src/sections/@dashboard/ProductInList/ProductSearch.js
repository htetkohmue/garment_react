import * as Yup from 'yup';
import { useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate,Link as RouterLink,useParams  } from 'react-router-dom';

// material
import PropTypes from 'prop-types';
import { Stack, TextField,Select,InputLabel,MenuItem,FormControl,styled,Autocomplete,InputAdornment,Popper} from '@mui/material';
import { DatePicker,LocalizationProvider} from '@mui/lab';
import AdapterDateFns from '@mui/lab/modern/AdapterDateFns';
// component
import Iconify from '../../../components/Iconify';
import { ChangeDate } from '../Common/ChangeDate';

//------------------------------------------------------------

const PopperStyle = styled((props) => <Popper placement="bottom-start" {...props} />)({
  width: '250px !important',
});

// ----------------------------------------------------------------------

SearchFilter.propTypes = {
  end: PropTypes.string,
  start: PropTypes.string,
  selectedFromDate: PropTypes.func,
  selectedToDate: PropTypes.func,
};

//--------------------------------------------------------

export default function SearchFilter({ end,start,selectedFromDate,selectedToDate }){
  const navigate = useNavigate();
  const RegisterSchema = Yup.object().shape({
    tailorID: Yup.string().required('Tailor ID is required'),
    tailorName: Yup.string().required('Tailor name is required'),
    fromDate: Yup.string().required('From Date is required'),
    toDate: Yup.string().required('To Date is required'),
  });

  const formik = useFormik({
    initialValues: {
      startDate: '',
      $endDate: '',
      tailorId :'',
      tailorName:'',
      language: ''
    },
   // validationSchema: RegisterSchema,
    onSubmit: (values,{resetForm}) => {
      resetForm({values:''});
      navigate('dashboard/product-in-list', { replace: true });
    },
  });

  const [Fromvalue, FromsetValue] = useState(()=>ChangeDate(new Date()));
  const [Tovalue, TosetValue] = useState(()=>ChangeDate(new Date()));

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps,handleChange,handleBlur} = formik;
 
    return (
      <FormikProvider value={formik}>
        <Form  autoComplete="on" noValidate onSubmit={handleSubmit}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="From Date"
                value={start}
                onChange={(newValue) => selectedFromDate(newValue)}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="To Date"
                value={end}
                onChange={(newValue) => selectedToDate(newValue)}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Stack>
        </Form>
        
      </FormikProvider>


          //     <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>     
          //     <FormControl>
          //       <InputLabel id="tailor_id_label">Tailor ID</InputLabel>
          //       <Select
          //         labelId="tailor_id_label"
          //         id="tailorId"
          //         value={tailorId}
          //         label="Tailor ID"
          //         onChange={handleChange}
          //         {...getFieldProps('tailorId')}
          //         >
          //           {/* <MenuItem value={10}>2001</MenuItem>
          //           <MenuItem value={20}>2002</MenuItem>
          //           <MenuItem value={30}>2003</MenuItem> */}
          //       </Select>
          //     </FormControl>
          //     <TextField id='tailorName'  value={tailorName}  label="Tailor Name"  {...getFieldProps('tailorName')} />              
          //     </Stack>
          //     <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          //     <LoadingButton type="submit" variant="contained">
          //     Search
          //     </LoadingButton>
          //     </Stack>
          //     <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          //     <LoadingButton type="submit" variant="contained" loading={isSubmitting} onClick={(e) => props.register(formik.values)} >
          //     Search
          //   </LoadingButton>
          //   </Stack>
          //   </Stack>
          // </Form>
          // </FormikProvider>


   
  );
}