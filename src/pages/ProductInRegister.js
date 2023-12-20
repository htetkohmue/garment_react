
// @mui
import { useTheme,createTheme, ThemeProvider,styled} from '@mui/material/styles';
import React, { useEffect, useState } from 'react'
import { Link as RouterLink, useParams } from 'react-router-dom';
import { Grid, Container, Typography ,Alert , Card, Box, Stack, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
// components
import Page from '../components/Page';
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
  // const [values, setValues] = useState([]); // for values
  // const [post, setPost] = useState([]); // for values
  const [edit, setEdit] = useState(false); // for values
  const [loadingOpen, setloadingOpen] = useState(false); // for values

  const [productNameAll, setProductNameAll]   = useState([]);
  const [open, setOpen] = useState(false);
  const [fabricName, setFabricName]   = useState('');
  const [sizesAll, setSizesAll]   = useState('');
  const [size, setSize]   = useState('');
  const [qty, setQty]   = useState('');
  const [rate, setRate]   = useState('');
  const [tailorAll, setTailorAll]   = useState([]);
  const [tailor, setTailor]   = useState('');
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

  const [productSize,setProductSize]=useState('');
  const [productName,setProductName]=useState('');
  const [productQty,setProductQty]=useState('');
  const [productPrice,setProductPrice]=useState('');
  const [pName,setpName]=useState('');
  const [pSize,setpSize]=useState('');
  const [productNameData,setproductNameData]=useState([]);
  const [productSizeData,setProductSizeData]=useState([]);
  const [ProductInAPI, setProductInAPI] = useState([]);

  const darkTheme = createTheme({ palette: { mode: 'dark' } });
  const lightTheme = createTheme({ palette: { mode: 'light' } });
    
    
    useEffect(() => {
      (async () => {
         setloadingOpen(true);
        const obj = { url: ApiPath.getProductAll, method: 'get' };
        const response = await ApiRequest(obj);
        if (response.flag === true) {
            setProductName(response.response_data.data);
        }
      })();
    }, []);

    useEffect(() => {
      (async () => {
         setloadingOpen(true);
        const obj = { url: ApiPath.getTailorAll, method: 'get' };
        const response = await ApiRequest(obj);
        if (response.flag === true) {
          setTailorAll(response.response_data.data);
        }
      })();
    }, []);
    
    /* Formload get Products Name */
    useEffect(() => {(async () => {
      const data = {}
      const obj = {url: ApiPath.getProductNames, method: 'get', params:data};
      const response = await ApiRequest(obj);
      if (response.flag===true) {
        setproductNameData(response.response_data.data);
      }
      if (response.flag===false) {
        setErrorMsg(response.message);
        setSuccessMsg("");
      } 
  })();
    }, []);

    // Edit
    const { id, setId } = useParams();
    useEffect(() => {
      setOpen(false);
      setloadingOpen(true);
      (async () => {
        const data = {language:"en"};
        const apiPath = ApiPath.editProductIn;
        const obj = { url: `${apiPath}/${id}`, method: 'get', params: data };
        const response = await ApiRequest(obj);
        if (id != null && response.flag === true) {
          setEdit(true);
          setDate(response.response_data.data.date);
       
          // setValues({
          //   customerId: response.response_data.data.customer_id,
          // });
          // setPost(post.filter(data =>data.customerId === response.response_data.data.customer_id));
          // setCustomerId(response.response_data.data.customer_id);

          setImageUrl(response.response_data.data.imageUrl);
          setImageName(response.response_data.data.imageName);
          setTailor(response.response_data.data.name_mm);
          setTableData(response.response_data.data.product_tran_data);
          setTotalTableData(response.response_data.data.product_tran_data);
          
          setErrorMsg("");
          setloadingOpen(false);
        }
        if (id != null && response.flag === false) {
          setErrorMsg(response.message);
          setSuccessMsg("");
          setloadingOpen(false);
        }
      })();
    }, []);

    // update
    

    /* change name */
    const changeproductName = (event, value) =>{
      (async () => {
        setProductName(value.props.value);
        setpName(value.props.name);
         const data = {product_id:event.target.value}
         const obj = {url: ApiPath.getProductNameByID, method: 'post', params:data};
          const response = await ApiRequest(obj);
          if (response.flag===true) {
            setProductSizeData(response.response_data.data);
          }
          if (response.flag===false) {
            setProductSizeData("");
          }  
      })();
    }

    const changeproductsize = (event,  value) => {
      setProductSize(value.props.value);
      setpSize(value.props.name);
    }

   
    const clickCancel = () => {
      // setFabricName('');
      setSize('');
      setQty('');
      setRate('');
      setTailor('');
      setProductName('');
      setDate('');
      setAddress('');
      setStatus('');
      setDescription('');
      setImageCancle(false);
    };


    function priceRow(qty, rate) {
      return qty * rate;
    }

    function createRow(tableId , name, size, qty, rate,imageUrl,imageName,pName,pSize) {
      const price = priceRow(qty, rate);
      return {tableId,name,size,qty, rate, price ,imageUrl,imageName,pName,pSize};
    }

    const clickAdd = (image) => {
      const tableId=tableData.length;
      setImageUrl(URL.createObjectURL(image));
      setImageName(image.name)
      setImageArr(current => [...current,{imageUrl:URL.createObjectURL(image),imageName:image.name,name:productName}]);
      setTableData(current => [...current, createRow(tableId,productName,productSize,qty,rate,URL.createObjectURL(image),image.name,pName,pSize)]);
      setTotalTableData(current => [...current, createRow(tableId,productName,productSize,qty,rate,URL.createObjectURL(image),image.name,pName,pSize)]);
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

    // Save Data
    const clickSave = () => {
      (async () => {
        setloadingOpen(true);
        const data = {tailor_id:tailor,product_data:tableData,total_qty:qtyTotal,total_amt:invoiceSubtotal,inDate:date}
        const obj = {url: ApiPath.storeProductIn, method: 'post', params:data};
        const response = await ApiRequest(obj);
        if (response.flag===true) {
          setSuccessMsg(response.response_data.message);
          setValidatorErrorMsg([]);
          setErrorMsg('');
          setTableData([]);
          setSize('');
          setQty('');
          setRate('');
          setTailor('');
          setProductName('');
          setDate('');
          setImageCancle(false);
          setloadingOpen(false);
       }
       if (response.flag===false) {
        setValidatorErrorMsg(response.message);
        setErrorMsg(response.response_data.message);
        setSuccessMsg('');
        setloadingOpen(false);
       } 
      })();
    }
  
    // update
    const clickUpdate  = () => {
      (async () => {
        const data = {tailor_id:tailor,product_data:tableData,total_qty:qtyTotal,total_amt:invoiceSubtotal,inDate:date}
        const path = ApiPath.updateProductIn;
        const obj = { url: `${path}/${id}`, method: 'put', params: data };
        const response = await ApiRequest(obj);
        console.log(response);
        if (response.flag===true) {
          setSuccessMsg(response.response_data.message);
          setValidatorErrorMsg([]);
          setErrorMsg('');
          setTableData([]);
          setloadingOpen(false);
       }
       if (response.flag===false) {
        setValidatorErrorMsg(response.message);
        setErrorMsg(response.response_data.message);
        setSuccessMsg('');
        setloadingOpen(false);
       } 
      })();
    }

  return (
   
    <Page title="ProductInRegister">
      <Container maxWidth="xl"  >
            {successMsg && (
            <Alert variant="filled" severity="info">
                <b>{successMsg}</b>
            </Alert>
            )}
            {errorMsg && (
            <Alert variant="filled" severity="error">
                <b>{errorMsg}</b>
            </Alert>
            )}
          <Typography variant="h3" gutterBottom>
              {t('Product In Registration')}
          </Typography>
          <br/>
          <Grid item xs={12} md={12} lg={12}>
          <ProductFormData 
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
              tailorAll={tailorAll}

              productName={productName}
              handleChangeproductName={changeproductName}
              productSize={productSize}
              handleChangeproductSize={changeproductsize}
              productNameData={productNameData}
              productSizeData={productSizeData}
              pName={pName}
              pSize={pSize}
              edit={edit}
              // post={post}
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
                {!edit && (groupByImage[key].map((imageData,key) => (
                  <img src={imageData.imageUrl} alt={imageData.imageName} height="200px" width="100%"/>)))
                }
                </Box>
              </Card>
              <br/>
              </Grid>
            </Grid>))}
            {tableData.length>0 && (
            <Grid container>
            <Grid item xs={12} md={6} lg={10}>
            <Card>
              <TotalTable  tailor={tailor} date={date} invoiceSubtotal={invoiceSubtotal} qtyTotal={qtyTotal} />
            </Card>
            </Grid>
            </Grid>
             )}
            <br/>
            {tableData.length>0 && (
           
            <Stack style={{marginBottom: '10px' ,marginTop: '10px',marginLeft: '10px',marginRight: '10px'}} justifyContent="center" alignItems="center">
                <Stack direction={{ xs: 'column', sm: 'row' }} >
                {!edit &&  <Button  type="submit" size="large" variant="contained" onClick={clickSave}>
                      {t("Save")}           
                    </Button>}
                {edit && <Button  type="submit" size="large" variant="contained" onClick={clickUpdate}>
                  {t("Update")}    
                </Button>}     
                </Stack>
            </Stack>)} 
      </Container>
    </Page>
   
  );
}
