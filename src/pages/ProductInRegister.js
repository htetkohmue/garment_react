import { faker } from '@faker-js/faker';
// @mui
import { useTheme,createTheme, ThemeProvider,styled} from '@mui/material/styles';
import React, { useEffect, useState } from 'react'
import { Grid, Container, Typography ,TextField , Card, CardHeaderTypeMap,Box, Stack,InputLabel,
  Button } from '@mui/material';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import { useTranslation } from 'react-i18next';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';

import ApiPath from '../common/common-api/api-path/ApiPath';
import { ApiRequest } from '../common/common-api/api-request/ApiRequest';
import { ChangeDate } from '../common/ChangeDate';
import { ProductFormData,ProductTable,TotalTable } from '../sections/@dashboard/ProductInRegister'




// ----------------------------------------------------------------------

export default function ProductInRegister() {
  
  const theme = useTheme();
  const { t } = useTranslation();
  const defaultPerPage = ApiPath.defaultPerPage;
  const [successMsg, setSuccessMsg] = useState(''); // for success msg
  const [validatorErrorMsg, setValidatorErrorMsg] = useState([]); // for valid msg
  const [errorMsg, setErrorMsg] = useState(''); // for error msg
  const [values, setValues] = useState([]); // for values
  const [edit, setEdit] = useState(false); // for values
  const [loadingOpen, setloadingOpen] = useState(false); // for values

  const [townshipAPI, settownshipAPI]     = useState(true);
  const [fabricName, setFabricName]   = useState('');
  const [size, setSize]   = useState('');
  const [qty, setQty]   = useState('');
  const [rate, setRate]   = useState('');
  const [tailor, setTailor]   = useState('');
  const [townshipName, setTownshipName]   = useState('');
  const [date, setDate]           = useState(()=>ChangeDate(new Date()));
  const [dateError, setDateError] = useState('');
  const [dateErrorHelperText, setDateErrorHelperText] = useState('');
  const [status, setStatus]   = useState('');
  const [customerId, setCustomerId]   = useState('');
  const [nameMm, setNameMm]   = useState('');
  const [nameEng, setNameEng]   = useState('');
  const [email, setEmail]   = useState('');   
  const [phone, setPhone]   = useState('');
  const [nrc, setNrc]   = useState('');
  const [address, setAddress]   = useState('');
  const [flag, setFlag]   = useState(''); 
  const [description, setDescription]   = useState(''); 

  const [tableData, setTableData]   = useState([]);  
  const [imageUrl, setImageUrl]   = useState('');
  const [imageName, setImageName]   = useState('');
  const [imageArr, setImageArr]   = useState([]);
  const [totalTableData, setTotalTableData]   = useState([]);
  const [imageCancle, setImageCancle]   = useState(true);

  const darkTheme = createTheme({ palette: { mode: 'dark' } });
  const lightTheme = createTheme({ palette: { mode: 'light' } });
    
    
    useEffect(() => {
      (async () => {
         setloadingOpen(true);
        const obj = { url: ApiPath.getTownship, method: 'get' };
        const response = await ApiRequest(obj);
        if (response.flag === true) {
            settownshipAPI(response.response_data.data);
        }
      })();
    }, []);

    useEffect(() => {
      (async () => {
         setloadingOpen(true);
        const obj = { url: ApiPath.getCustomerId, method: 'get' };
        const response = await ApiRequest(obj);
        if (response.flag === true) {
          setCustomerId(response.response_data.data);
        }
      })();
    }, []);

   
    const clickCancel = () => {
      setFabricName('');
      setSize('');
      setQty('');
      setRate('');
      setTailor('');
      setDate('');
      setAddress('');
      setStatus('');
      setDescription('');
      setImageCancle(false);
    };


    function priceRow(qty: number, rate: number) {
      return qty * rate;
    }

    function createRow(tableId:number , name:string, size:string, qty: number, rate: number,imageUrl:string,imageName:string) {
      const price = priceRow(qty, rate);
      return {tableId,name,size,qty, rate, price ,imageUrl,imageName};
    }

    const clickAdd = (image) => {
      const tableId=tableData.length;
      setImageUrl(URL.createObjectURL(image));
      setImageName(image.name)
      setImageArr(current => [...current,{imageUrl:URL.createObjectURL(image),imageName:image.name,name:fabricName}]);
      setTableData(current => [...current, createRow(tableId,fabricName,size,qty,rate,URL.createObjectURL(image),image.name)]);
      setTotalTableData(current => [...current, createRow(tableId,fabricName,size,qty,rate,URL.createObjectURL(image),image.name)]);
    };

    const handleDelete = (id) => {
      const deletedData= tableData.filter((word) => {
        return word.tableId !== id;
      })
      setTableData(deletedData)
    };

    const groupByName = tableData.reduce((group, product) => {
      const { name } = product;
      group[name] = group[name] ?? [];
      group[name].push(product);
      return group;
    }, []);

    const groupByImage = imageArr.reduce((group, image) => {
      const { name } = image;
      group[name] = group[name] ?? [];
      group[name] = [];
      group[name].push(image);
      return group;
    }, []);

    const clickImageUpload = () => {
      setImageCancle(true);
    };

    function subtotal(items) {
      return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
    }
    
    function qtytotal(items) {
      return items.map(({ qty }) => Number(qty)).reduce((sum, i) => sum + i, 0);
    }
  
    const invoiceSubtotal = subtotal(tableData);
    const qtyTotal = qtytotal(tableData);

    
  
  return (
   
    <Page title="ProductInRegister">
      <Container maxWidth="xl"  >
          <Typography variant="h3" gutterBottom>
              {t('Fabric Return Registration')}
          </Typography>
          <br/>
          <Grid item xs={12} md={12} lg={12}>
          <ProductFormData 
              fabricName={fabricName}
              handleChangeFabricName={(e) => setFabricName(e.target.value)}
              size={size}
              handleChangeSize={(e) => setSize(e.target.value)} 
              qty={qty}
              handleChangeQty={(e) => setQty(e.target.value.replace(/[^0-9]/g, ''))} 
              rate={rate}
              handleChangeRate={(e) => setRate(e.target.value.replace(/[^0-9]/g, ''))} 
              tailor={tailor}
              handleChangeTailor={(e) => setTailor(e.target.value)} 
              date={date}
              handleChangeDate={(e) => setDate(ChangeDate(e))}  
              dateError={dateError}
              dateErrorHelperText={dateErrorHelperText}
              clickImageUpload={clickImageUpload}
              imageCancle={imageCancle}
              clickAdd={clickAdd}
              clickCancel={clickCancel}
              townshipAPI={townshipAPI}
            />
          </Grid>
          <br/>
          <br/>
          {groupByName.map((datas,key) => (
            <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={10}>
            <Card>
            <ProductTable handleDelete={handleDelete} tableDatas={datas}/>
            </Card>
            <br/>
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
              <Card>
                <Box textAlign="center">
                {groupByImage[key].map((imageData,key) => (
                  <img src={imageData.imageUrl} alt={imageData.imageName} height="200px" width="100%"/>))}
                </Box>
              </Card>
              <br/>
              </Grid>
            </Grid>))}
            {tableData.length>0 && (
            <Grid item xs={12} md={6} lg={10}>
            <Card>
              <TotalTable  tailor={tailor} date={date} invoiceSubtotal={invoiceSubtotal} qtyTotal={qtyTotal} />
            </Card>
            </Grid>
             )}
            <br/>
            {tableData.length>0 && (
            <Stack style={{marginBottom: '10px' ,marginTop: '10px',marginLeft: '10px',marginRight: '10px'}} justifyContent="center" alignItems="center">
                <Stack direction={{ xs: 'column', sm: 'row' }} >
                    <Button fullWidth size="large" variant="contained" onClick={clickAdd}>
                        {t('Save')}
                    </Button>
                </Stack>
            </Stack>)}
           
             
      </Container>
    </Page>
   
  );
}
