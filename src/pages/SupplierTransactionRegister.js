import { Link as RouterLink, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
// @mui
import { styled } from '@mui/material/styles';
import { MenuItem, Stack, Card, Link, Container, Typography ,Alert, Button, TextField, Select, InputLabel, FormControl, Grid} from '@mui/material';
import { DatePicker,LocalizationProvider} from '@mui/lab';
import AdapterDateFns from '@mui/lab/modern/AdapterDateFns';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

// components 
import Page from '../components/Page';
// sections
import {  DisplayForm } from '../sections/@dashboard/SupplierTrasactionRegister';
import ApiPath from '../common/common-api/api-path/ApiPath';
import { ApiRequest } from '../common/common-api/api-request/ApiRequest';
import { ChangeDate } from '../common/ChangeDate';
// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 600,
  margin: '30px',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
}));

const path = process.env.REACT_APP_BACKEND_URL;
// ----------------------------------------------------------------------

export default function SupplierTransactionRegister() {
    const { t } = useTranslation();
    const defaultPerPage = ApiPath.defaultPerPage;
    const [successMsg, setSuccessMsg] = useState(''); // for success msg
    const [validatorErrorMsg, setValidatorErrorMsg] = useState([]); // for valid msg
    const [errorMsg, setErrorMsg] = useState(''); // for error msg
    const [edit, setEdit] = useState(false); // for values    
    const [tranDate, setTrantDate] =useState(()=>ChangeDate(new Date()));

    const [numberPkg, setNumberPkg] = useState('');
    const [rawQty, setRawQty] = useState('');
    const [rawPrice, setRawPrice] = useState('');
    const [totalAmt, setTotalAmt] = useState('');
    const [supplierId, setSupplierId] = useState('');
    const [supplierName, setSupplierName] = useState('');
    const [supplierData, setSupplierData] = useState([]); 
    const [totalRow, setTotalRow] = useState(0);  
    const [rawId, setRawId] = useState('');
    const [rawName, setRawName] = useState(''); 
    const [rawData, setRawData] = useState([]); 
    const [supplierTranAPI, setSupplierTranAPI] = useState([]);
    
    /* Formload get tailor data */
    useEffect(() => {
      (async () => {
        const data = {language:"en"};
        const obj = { url: ApiPath.getSupplierData, method: 'get' };
        const response = await ApiRequest(obj);
        if (response.flag === true) {
          setSupplierData(response.response_data.data);
        }
      })();
    }, []);

       /* Formload get tailor data */
       useEffect(() => {
        (async () => {
          const data = {language:"en"};
          const obj = { url: ApiPath.searchRaws, method: 'get' };
          const response = await ApiRequest(obj);
          if (response.flag === true) {
            setRawData(response.response_data.data);
          }
        })();
      }, []);
     
    /** click delete function */
     const selectedDate=(date)=>{
      setTrantDate(ChangeDate(date))
    }

    const changeSupplierName = (event,  value) => {
      setSupplierId(value.props.value);
      setSupplierName(value.props.name);
    }

    const changeRawMaterials = (event,  value) => {
      setRawId(value.props.value);
      setRawName(value.props.name);
    }

    const SaveSupplierTransaction = () => {
      (async () => {
        const data = {date:tranDate,supplier_id:supplierId,raw_id:rawId,qty_pkg:numberPkg,qty:rawQty,price:rawPrice,total_amount:totalAmt}
        const obj = { url: ApiPath.storeSupplierTransaction, method: 'post', params: data };
        const response = await ApiRequest(obj);
        
        if (response.flag === true) {
          setSuccessMsg(response.response_data.message);
          // setTotalRow(response.response_data.row_count);
          // setSelected([]);
          setErrorMsg("");
          // setloadingOpen(false);
        }
        if (response.flag === false) {
          // setValidatorErrorMsg(response.message);
          // setSupplierTranAPI([]);
          // setTotalRow();
          setErrorMsg(response.message);
          setSuccessMsg("");
          // setloadingOpen(false);
        }
      })(); 
    }

    const supplierTransactionData = () => {
      (async () => {
        const data = {}
        const obj = { url: ApiPath.getSupplierTransaction, method: 'get', params: data };
        const response = await ApiRequest(obj);
        
        if (response.flag === true) {
          setSuccessMsg(response.response_data.message);
          // setTotalRow(response.response_data.row_count);
          // setSelected([]);
          setErrorMsg("");
          // setloadingOpen(false);
        }
        if (response.flag === false) {
          // setValidatorErrorMsg(response.message);
          // setSupplierTranAPI([]);
          // setTotalRow();
          setErrorMsg(response.message);
          setSuccessMsg("");
          // setloadingOpen(false);
        }
      })();
    }

    return (
        <Page title="Register">
          <ContentStyle>
          {successMsg && (
                <Alert variant="filled" severity="success">
                  <b>{successMsg}</b>
                </Alert>
              )}
              {errorMsg && (
                <Alert variant="filled" severity="error">
                <b>{errorMsg}</b>
              </Alert>
              )}
              {validatorErrorMsg.length!==0 && (
                <Alert variant="filled" severity="error">
                <b> {validatorErrorMsg.map((data, index) => {
                return (
                  <div key={index} style={{ color: 'white' }}>
                    {data}
                  </div>
                );
              })}</b>
              </Alert>
              )}
               <Stack direction="row" alignItems="center" justifyContent="space-between">
              {!edit && (
                <Typography variant="h3" gutterBottom>
                  {t('Supplier Transaction Register')}
                </Typography>
              )}
              {edit && (
                <Typography variant="h3" gutterBottom>
                 {t('Supplier Transaction Updating')}
                </Typography>
              )}
            </Stack>
            <Stack spacing={2}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label={t("From Date")}
                  value={tranDate}
                  onChange={(newValue) => selectedDate(newValue)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <FormControl fullWidth >
              <InputLabel id="demo-simple-select-required-label">Supplier Name *</InputLabel>
                <Select
                label={t("Supplier Name *")}
                labelId="demo-simple-select-required-label"
                id="demo-simple-select-required"
                value={supplierId}
                name={supplierName}
                onChange={changeSupplierName}
                  >
                    <MenuItem key="" value="" name="">--Select--</MenuItem>
                    {supplierData.length >0 &&
                        supplierData.map((i,ind) => {
                            return( <MenuItem key={ind} value={i.id} name={i.name_mm}>{ i.name_mm }</MenuItem>)
                        
                        })
                    }
                </Select>
              </FormControl>
              <FormControl fullWidth >
              <InputLabel id="demo-simple-select-required-label">Raw Materials *</InputLabel>
                <Select
                label={t("Raw Materials *")}
                labelId="demo-simple-select-required-label"
                id="demo-simple-select-required"
                value={rawId}
                name={rawName}
                onChange={changeRawMaterials}
                  >
                    <MenuItem key="" value="" name="">--Select--</MenuItem>
                    {rawData.length >0 &&
                        rawData.map((i,ind) => {
                            return( <MenuItem key={ind} value={i.id} name={i.name}>{ i.name }</MenuItem>)
                        
                        })
                    }
                </Select>
              </FormControl>
              <TextField
               label={t("Number of Packages *")}
               onChange={(e) => {
                 setNumberPkg(e.target.value);
               }}/>
              <TextField
               label={t("Qty *")}
               onChange={(e) => {
                 setRawQty(e.target.value);
               }}/>
              <TextField 
               label={t("Price *")}
               onChange={(e) => {
                 setRawPrice(e.target.value);
                 setTotalAmt(rawQty * e.target.value);
               }}/>
              <TextField
                label={t("Total Amount *")}
                value={totalAmt}
              />
              <Button 
              style={{marginLeft: "30%"}} 
              sx={{ width: 150 }} 
              size="large" 
              variant="contained" 
              onClick={SaveSupplierTransaction}>
              {t('Save')}
              </Button>
            </Stack>
          </ContentStyle>
        </Page>
    );
}