import PropTypes from 'prop-types';
// material
import { useFormik, Form, FormikProvider } from 'formik';
import { styled } from '@mui/material/styles';
import { Stack,Toolbar, Tooltip, IconButton,FilledInput, Typography,FormControl,InputLabel, OutlinedInput, Autocomplete, InputAdornment, Popper,Box ,TextField  } from '@mui/material';
// component
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

const PopperStyle = styled((props) => <Popper placement="bottom-start" {...props} />)({
  width: '260px !important',
});

// ----------------------------------------------------------------------

UserListToolbar.propTypes = {
  posts: PropTypes.array.isRequired,
};


const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 100,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 260,
  marginLeft:`150px !important`,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[600_70]} !important`,
  },
}));

// ----------------------------------------------------------------------

UserListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};

export default function UserListToolbar({ numSelected, filterName, onFilterName,IdTailor,deleteTailor,
  posts,handleChange}) {

    const formik = useFormik({
      initialValues: {
        tailorId :'',
        tailorName:'',
      },
      // validationSchema: RegisterSchema,
       // onSubmit: (values,{resetForm}) => {
      //   resetForm({values:''});
      //   navigate('dashboard/product-in-list', { replace: true });
      // },
    });
    const { handleSubmit} = formik;

  return (
    // <RootStyle
    //   sx={{
    //     ...(numSelected > 0 && {
    //       color: 'primary.main',
    //       bgcolor: 'primary.lighter',
    //     }),
    //   }}
    // >
    <FormikProvider value={formik}>
          <Form  autoComplete="on" noValidate onSubmit={handleSubmit}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                {numSelected > 0 ? (
                    <Typography component="div" variant="subtitle1">
                      {numSelected} selected
                    </Typography>
                  ) : (
                  <Autocomplete
                  sx={{ width: 260 }}
                  autoHighlight
                  popupIcon={null}
                  PopperComponent={PopperStyle}
                  options={posts}
                  getOptionLabel={(post) => post.tailorId}
                  onChange={handleChange}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  renderInput={(params) => (
                    <TextField
                    {...params}
                      placeholder="Search Tailor ID..."
                      InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                              <InputAdornment position="start">
                                <Iconify icon={'eva:search-fill'} sx={{ ml: 1, width: 20, height: 20, color: 'red' }} />
                              </InputAdornment>
                            ),
                          }}
                    />
                  )}
                  />
                  )}
                {numSelected > 0 ? (
                    <Typography component="div" variant="subtitle1">
                      {numSelected} selected
                    </Typography>
                  ) : (
                    <TextField
                      disabled
                      sx={{ width: 260 }}
                      value={filterName}
                      onChange={onFilterName}
                      placeholder="Search Tailor Name..."
                      startAdornment={
                        <InputAdornment position="start">
                          {/* <Iconify icon="eva:search-fill" sx={{ ml: 1, width: 20, height: 20, color: 'red' }} /> */}
                        </InputAdornment>
                      }
                    />
                  )}
                  {numSelected > 0 ? (
                    <Tooltip title="Delete">
                      <IconButton  onClick={(e) => deleteTailor(IdTailor)}>
                        <Iconify icon="eva:trash-2-fill" />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <Tooltip title="Filter list">
                      <IconButton >
                        <Iconify icon="ic:round-filter-list" />
                      </IconButton>
                    </Tooltip>
                  )}
                </Stack>
              </Form>
              </FormikProvider>
  
  );
}
