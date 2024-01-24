import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
// material
import { useFormik, Form, FormikProvider } from 'formik';
import { styled } from '@mui/material/styles';
import { Alert, Button, Stack,Toolbar, Tooltip, IconButton,FilledInput, Typography,FormControl,InputLabel, OutlinedInput, Autocomplete, InputAdornment, Popper,Box ,TextField,MenuItem,Select  } from '@mui/material';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
// component
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

const PopperStyle = styled((props) => <Popper placement="bottom-start" {...props} />)({
  width: '260px !important',
});

// ----------------------------------------------------------------------

TailorListToolbar.propTypes = {
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

TailorListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};

export default function TailorListToolbar(props) {
   const { t } = useTranslation();
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
            <Stack direction={{ xs: 'column', sm: 'col' }} spacing={5}>
              <Divider textAlign="left" style={{marginBottom: "2%"}}>
                <Chip label="Tailor Data" />
              </Divider>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                {props.numSelected > 0 ? (
                    <Typography component="div" variant="subtitle1">
                      {props.numSelected} selected
                    </Typography>
                  ) : (
                  <Autocomplete
                  sx={{ width: 280 }}
                  autoHighlight
                  popupIcon={null}
                  PopperComponent={PopperStyle}
                  options={props.posts}
                  getOptionLabel={(post) => post.tailorId}
                  onChange={props.handleChange}
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
                {props.numSelected > 0 ? (
                    <Typography component="div" variant="subtitle1">
                      {props.numSelected} selected
                    </Typography>
                  ) : (
                    <TextField
                      disabled
                      sx={{ width: 280 }}
                      value={props.filterName}
                      onChange={props.onFilterName}
                      placeholder="Search Tailor Name..."
                      startadornment={
                        <InputAdornment position="start">
                          {/* <Iconify icon="eva:search-fill" sx={{ ml: 1, width: 20, height: 20, color: 'red' }} /> */}
                        </InputAdornment>
                      }
                    />
                  )}          
                </Stack>
                <Divider textAlign="left" style={{marginBottom: "2%",marginTop: "2%"}}>
                    <Chip label="Product Data" />
                  </Divider>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                {props.numSelected > 0 ? (
                    <Typography component="div" variant="subtitle1">
                      {props.numSelected} selected
                    </Typography>
                  ) : (
                    <FormControl halfwidth="true" >
                    <InputLabel id="demo-simple-select-required-label">Product Name *</InputLabel>
                    <Select
                    required
                    sx={{ width: 260 }}
                    value={props.productId}
                    name={props.pName}
                    label={t("Product Name")}
                    onChange={props.handleChangeproductName}
                    >
                        <MenuItem key="" value="---Select---" name="">--Select--</MenuItem>
                        {props.productNameData.length >0 &&
                           props.productNameData.map((i,ind) => {
                                return( <MenuItem key={ind} value={i.id} name={i.product_name}>{ i.product_name }</MenuItem>)
                            
                            })
                        }
                    </Select>
                </FormControl>
                  )}

                <Button size="small" variant="contained" onClick={props.addNewPName}>+</Button>
                <Dialog open={props.pNameopen} onClose={props.handlePnameClose} >
                  {props.successNewPMsg && (
                    <Alert variant="filled" severity="info">
                        <b>{props.successNewPMsg}</b>
                    </Alert>
                    )}
                    {props.errorNewPMsg && (
                    <Alert variant="filled" severity="error">
                        <b>{props.errorNewPMsg}</b>
                    </Alert>
                    )}
                    <DialogTitle>New Product Name </DialogTitle>
                    <DialogContent>
                      <TextField
                        required
                        autoFocus
                        margin="dense"
                        id="newProductName"
                        sx={{ width: 250 }}
                        label="New Product Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={props.newPname}
                        onChange={(e) => {
                            props.setNewPname(e.target.value);
                        }}
                    />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={props.addNewProduct}>Add</Button>
                      <Button onClick={props.handlePnameClose}>Close</Button>                    
                    </DialogActions>
                  </Dialog>  

                  {props.numSelected > 0 ? (
                    <Typography component="div" variant="subtitle1">
                      {props.numSelected} selected
                    </Typography>
                  ) : (
                    <FormControl halfwidth="true" >
                    <InputLabel id="demo-simple-select-required-label">Product Size *</InputLabel>
                    <Select
                    required
                    sx={{ width: 260 }}
                    value={props.productSize}
                    name={props.pSize}
                    label={t("Product Size")}
                    onChange={props.handleChangeproductSize}
                    >
                        <MenuItem key="" value="" name="">--Select--</MenuItem>
                        {props.productSizeData.length >0 &&
                            props.productSizeData.map((i,ind) => {
                                return( <MenuItem key={ind} value={i.id} name={i.size}>{ i.size }</MenuItem>)
                            
                            })
                        }
                    </Select>
                </FormControl>
                  )}

                <Button size="small" variant="contained" onClick={props.addNewPSize}>+</Button>
                <Dialog open={props.pSizeopen} onClose={props.handlePsizeClose} >
                  {props.successNewPsizeMsg && (
                    <Alert variant="filled" severity="info">
                        <b>{props.successNewPsizeMsg}</b>
                    </Alert>
                    )}
                    {props.errorNewPsizeMsg && (
                    <Alert variant="filled" severity="error">
                        <b>{props.errorNewPsizeMsg}</b>
                    </Alert>
                    )}
                    <DialogTitle>New Product Size </DialogTitle>
                    <DialogContent>
                    <FormControl halfwidth="true" >
                      <InputLabel id="demo-simple-select-required-label">Size *</InputLabel>
                        <Select
                          required
                          sx={{ width: 260 }}
                          value={props.sizeId}
                          name={props.sizeName}
                          label={t("Size")}
                          onChange={props.handleChangeSize}
                        >
                        <MenuItem key="" value="" name="">--Select--</MenuItem>
                        {props.sizesAll.length >0 &&
                            props.sizesAll.map((i,ind) => {
                                return( <MenuItem key={ind} value={i.id} name={i.size}>{ i.size }</MenuItem>)
                            
                            })
                        }
                    </Select>
                    </FormControl>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={props.addNewProductSize}>Add</Button>
                      <Button onClick={props.handlePsizeClose}>Close</Button>                    
                    </DialogActions>
                  </Dialog> 
                </Stack>
                </Stack>
              </Form>
              </FormikProvider>
  
  );
}
