import {
     Container
    , Stack
    ,Button
    , FormControl
    , InputLabel
    , Select
    , MenuItem
    , FormHelperText 
    ,TextField
    ,Alert
    ,Grid
    ,Card
    ,CardHeader
    ,Box
} from '@mui/material'

import React, { useState,useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import {LocalizationProvider} from '@mui/lab';
import AdapterDateFns from '@mui/lab/modern/AdapterDateFns';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ApiPath from '../../../common/common-api/api-path/ApiPath';
import { ApiRequest } from '../../../common/common-api/api-request/ApiRequest';

import DatePicker from '../../../common/datepicker/DatePicker';


function FormData(props) {
    const { t } = useTranslation();
    const [open, setOpen] = React.useState(false);
    const [successMsg, setSuccessMsg] = useState(''); // for success msg
    const [errorMsg, setErrorMsg] = useState(''); // for error msg
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [ImageName, setImageName] = useState(null);

    useEffect(() => {
        if (selectedImage) {
          setImageUrl(URL.createObjectURL(selectedImage));
          setImageName(selectedImage.name)
        }
      }, [selectedImage]);

    useEffect(() => {
        if (props.imageCancle===false) {
            setSelectedImage(null);
            setImageUrl(null);
            setImageName(null)
        }
      });

    
  return (
    <>
        <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={8}>
               <Card>
                <Stack style={{marginBottom: '20px' ,marginTop: '20px',marginLeft: '20px',marginRight: '20px'}} direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                {/* <FormControl fullWidth >
                     <InputLabel id="demo-simple-select-required-label">{t('Raw Name')}</InputLabel>
                    <Select
                    labelId="demo-simple-select-required-label"
                    id="demo-simple-select-required"
                    value={props.fabricName}
                    label={t("Raw Name")}
                    onChange={props.handleChangeFabricName}
                    >
                    {
                        props.fabricAll.length > 0 &&
                        props.fabricAll.map((item,index)=>{
                            return(
                                <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                            )
                        })
                    }
                    </Select> */}
                    
                    <FormControl fullWidth >
                    <InputLabel id="demo-simple-select-required-label">Product Name *</InputLabel>
                    <Select
                    value={props.productName}
                    name={props.pName}
                    label={t("Product Name *")}
                    onChange={props.handleChangeproductName}
                    >
                        {props.productNameData.length >0 &&
                            props.productNameData.map((i,ind) => {
                                return( <MenuItem key={ind} value={i.id} name={i.product_name}>{ i.product_name }</MenuItem>)
                            
                            })
                        }
                    </Select>
                </FormControl>
                <FormControl fullWidth >
                    <InputLabel id="demo-simple-select-required-label">Size *</InputLabel>
                    <Select
                    labelId="demo-simple-select-required-label"
                    id="demo-simple-select-required"
                    value={props.productSize}
                    name={props.pSize}
                    label={t("Size *")}
                    onChange={props.handleChangeproductSize}
                    >
                        {props.productSizeData.length >0 &&
                            props.productSizeData.map((i,ind) => {
                                return( <MenuItem key={ind} value={i.id} name={i.size}>{ i.size }</MenuItem>)
                            
                            })
                        }
                        
                    </Select>
                </FormControl>
                </Stack>
                <Stack style={{marginBottom: '20px' ,marginTop: '20px',marginLeft: '20px',marginRight: '20px'}} direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                    fullWidth
                    label={t("Quantity")}
                    value={props.qty}
                    onChange={props.handleChangeQty}
                    error={props.qtyError}
                    helperText={props.qtyHelperText}
                />
                <TextField
                    fullWidth
                    label={t("Rate")}
                    value={props.rate}
                    onChange={props.handleChangeRate}
                    error={props.rateError}
                    helperText={props.rateHelperText}
                />
              </Stack>
              <Stack style={{marginBottom: '20px' ,marginTop: '20px',marginLeft: '20px',marginRight: '20px'}} direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              
              <Card style={{height:'90px',width:'100%'}}>
               <input accept="image/*" type="file" id="select-image" style={{ display: 'none' }} onChange={e => setSelectedImage(e.target.files[0])}/>
                <InputLabel htmlFor="select-image">
                    <Button style={{height:'50px',width:'100%'}} variant="contained" color="primary" component="span" onClick={props.clickImageUpload}>
                    {t('Upload Image')}
                    </Button>
                </InputLabel>
                <InputLabel style={{marginTop: '10px',textAlign:'center'}}>{ImageName}</InputLabel>
                </Card>
                <Card sx={{border:1}} style={{height:'200px',width:'100%'}}>
                {/* <CardHeader  title={'Photo'} /> */}
                {imageUrl && selectedImage && (
                <Box textAlign="center">
                    <img src={imageUrl} alt={selectedImage.name} height="200px" width="100%"/>
                </Box>
                )}
                </Card>
              </Stack>
              </Card>
            </Grid>
            <Grid item xs={11} md={6} lg={4}>
             <Card >
                <Stack style={{marginBottom: '20px' ,marginTop: '20px',marginLeft: '20px',marginRight: '20px'}} spacing={2}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker required
                        label={t('Date')}
                        value={props.date}
                        onChange={(newValue) => props.handleChangeDate(newValue)}
                        error={props.dateError}
                        helperText={props.dateErrorHelperText}
                    />
                    </LocalizationProvider>
                    <FormControl fullWidth >
                        <InputLabel id="demo-simple-select-required-label">{t('Tailor')} *</InputLabel>
                        <Select
                        labelId="demo-simple-select-required-label"
                        id="demo-simple-select-required"
                        value={props.tailor}
                        label={t("Tailor")}
                        onChange={props.handleChangeTailor}
                        >
                        {
                        props.tailorAll.length > 0 &&
                        props.tailorAll.map((item,index)=>{
                            return(
                                <MenuItem key={index} value={item.tailor_id}>{item.name_en}</MenuItem>
                            )
                        })
                    }
                    </Select>
                    </FormControl>
                    
              </Stack>
              </Card>
              <Card >
                <Stack spacing={3} style={{marginBottom: '50px' ,marginTop: '50px',marginLeft: '20px',marginRight: '20px'}} justifyContent="center" alignItems="center">
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <Button fullWidth size="large" variant="contained" onClick={(e) => props.clickAdd(selectedImage)}>
                            {t('Add')}
                        </Button>

                        <Button fullWidth size="large" variant="contained" onClick={props.clickCancel}>
                            {t('Cancel')}
                        </Button>
                    </Stack>
                </Stack>
              </Card>
            </Grid>
            </Grid>
    </>
  )
}

export default FormData
