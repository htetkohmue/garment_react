import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { Container, Typography ,Alert, Stack, Grid , Card,Button} from '@mui/material'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import { Info } from '@material-ui/icons';
import ApiPath from '../common/common-api/api-path/ApiPath';
import { ApiRequest } from '../common/common-api/api-request/ApiRequest';
import Page from '../components/Page';

// ----------------------------------------------
import { CustomerData,ProductData,ProductTable,TotalTable } from '../sections/@dashboard/CustomerTransaction'
import DatePicker from '../common/datepicker/DatePicker';
import { ChangeDate } from '../common/ChangeDate';

// --------------------------------------------------------------------
const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 900,
  margin: '3%',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
}));

const path = process.env.REACT_APP_BACKEND_URL;

// ----------------------------------------------------------------------
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}
  function CustomerTransaction() {
    const { t } = useTranslation();
    const [loadingOpen, setloadingOpen] = useState(false); // for values
    const [successMsg, setSuccessMsg] = useState(''); // for success msg
    const [errorMsg, setErrorMsg] = useState(''); // for error msg
    const [validatorErrorMsg, setValidatorErrorMsg] = useState([]);
    
    const [post, setPost] = useState([]);
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState([]);
    const [filterName, setFilterName] = useState('');
    const [deleteCustomerId, setDeleteCustomerId] = useState([]);
    const [customerData, setCustomerData] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const [chooseDate, setchooseDate]           = useState(()=>ChangeDate(new Date()));
    const [chooseDateError, setchooseDateError] = useState('');
    const [chooseDateErrorHelperText, setchooseDateErrorHelperText] = useState('');

    const [productSize,setproductSize]=useState('');
    const [productName,setproductName]=useState('');
    const [productQty,setProductQty]=useState('');
    const [productPrice,setProductPrice]=useState('');
    const [pName,setpName]=useState('');
    const [pSize,setpSize]=useState('');
    const [customerId,setCustomerId]=useState('');

    const [Alldata,setAlldata]=useState([]);
    const [mergedata,setMergedata]=useState([]);
    const [tableData,setTableData]=useState([]);
    const [date, setDate]           = useState(()=>ChangeDate(new Date()));

    const [productNameData,setproductNameData]=useState([]);
    const [productSizeData,setproductSizeData]=useState([]);
    const [value, setValue] = useState([]); // for values
    const [edit, setEdit] = useState(false); // for values
    

    /* Formload get Customer data */
    useEffect(() => {(async () => {
      const data = {}
      const obj = {url: ApiPath.getCustomerList, method: 'get', params:data};
      const response = await ApiRequest(obj);
      if (response.flag===true) {
        setPost(response.response_data.data);
      }
      if (response.flag===false) {
        setErrorMsg(response.message);
        setSuccessMsg("");
      } 
  })();
    }, []);

      /** edit get data function */
  const { id, setId } = useParams();
  useEffect(() => {
    (async () => {
      const data = {};
      const apiPath = ApiPath.editCustomerTranction;
      const obj = { url: `${apiPath}/${id}`, method: 'get', params: data };
      const response = await ApiRequest(obj);
      if (response.flag === true) {

        setchooseDate(response.response_data.data.tran_date);
       
        // setValue({
        //   customerId: response.response_data.data.customer_id,
        // });
        // setPost(post.filter(data =>data.customerId === response.response_data.data.customer_id));
        // setCustomerId(response.response_data.data.customer_id);

        setFilterName(response.response_data.data.name_mm);
        
        setTableData(response.response_data.data.cus_tran_data);
       
        setEdit(true);
        setloadingOpen(false);
      }
      if (id != null && response.flag === false) {
        setErrorMsg(response.message);
        setSuccessMsg('');
        setValidatorErrorMsg([]);
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

    /* filter name */
    const handleFilterByName = (event) => {
      setFilterName(event.target.value);
    };

    /* change name */
    const handleChange = (event, value) =>{
      if (value!==null) {
        setCustomerData(post);
        setPost(post.filter(data =>data.customerId === value.customerId));
        setFilterName(value.nameMm);
        setCustomerId(value.customerId);
      }
      if (value===null) {
        setPost(customerData)
        setSelectedOptions([]);
        setFilterName('');
        setCustomerId('');
      }
    }

    /* change name */
    const changeproductName = (event, value) =>{
      (async () => {
        setproductName(value.props.value);
        setpName(value.props.name);
         const data = {product_id:event.target.value}
         const obj = {url: ApiPath.getProductNameByID, method: 'post', params:data};
          const response = await ApiRequest(obj);
          if (response.flag===true) {
            setproductSizeData(response.response_data.data);
          }
          if (response.flag===false) {
            setproductSizeData("");
          }  
      })();
    }

    const changeproductsize = (event,  value) => {
      setproductSize(value.props.value);
      setpSize(value.props.name);
    }
 
  const handleChangechooseDate = (e) => {setchooseDate(e)}

  function priceRow(qty, rate) {
    return qty * rate;
  }

  function createRow(tableId,productName, productSize, productQty, productPrice,pName,pSize) {
    const total = priceRow(productQty, productPrice);
    return {tableId,productName,productSize,productQty, productPrice, total ,pName,pSize};
  }
 
  // Click Add
  const clickAdd = () => {
    console.log(pName);
    const tableId=tableData.length;
    setTableData(current => [...current, createRow(tableId,productName,productSize,productQty,productPrice,pName,pSize)]);     
  } 

  const clickSave = () => {
    (async () => {
      setloadingOpen(true);
      const data = {customer_id:customerId,product_data:tableData,total_qty:qtyTotal,total_amt:invoiceSubtotal,tran_date:chooseDate}
      const obj = {url: ApiPath.storeCustomerTranction, method: 'post', params:data};
      const response = await ApiRequest(obj);
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

  const clickUpdate = () => {
    (async () => {
      setloadingOpen(true);
      const data = {customer_id:customerId,product_data:tableData,total_qty:qtyTotal,total_amt:invoiceSubtotal,tran_date:chooseDate}
      
      const path = ApiPath.updateCustomerTranction;
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
  
  /** click delete function - cross sign */
  const deleteCustomer=(IdCustomer)=>{
      setDeleteCustomerId(IdCustomer)
      setOpen(true);
    }
  const handleDelete = (id) => {
    const deletedData= tableData.filter((word) => {
      return word.tableId !== id;
    })
    setTableData(deletedData)
  };

  const groupByName = tableData.reduce((group, product) => {
    const { productName } = product;
    group[productName] = group[productName] ?? [];
    group[productName].push(product);
    return group;
  }, []);

  function subtotal(items) {
    return items.map(({ total }) => Number(total)).reduce((sum, i) => sum + i, 0);
  }
  
  function qtytotal(items) {
    return items.map(({ productQty }) => Number(productQty)).reduce((sum, i) => sum + i, 0);
  }

  const invoiceSubtotal = subtotal(tableData);
  const qtyTotal = qtytotal(tableData);

    return (
        <Page title="Customer Tranction">
          <Container>
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
            <Typography variant="h3" mb={5}> Customer Transaction</Typography>  
            <spam>Err: When date is chosen , date format is TFormat.</spam>   
              <ContentStyle>
                <Stack spacing={4}>
                  <Stack spacing={2}>
                    <Divider textAlign="left">
                      <Chip label="Customer Data" />
                    </Divider>
                    
                  <Stack  direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <DatePicker required
                    label='Date'
                    value={chooseDate}
                    onChange={handleChangechooseDate}
                    error={chooseDateError}
                    helperText={chooseDateErrorHelperText}
                    />
                    <CustomerData  handleChange={handleChange} IdCustomer={selected} deleteCustomer={deleteCustomer} posts={post}  filterName={filterName} onFilterName={handleFilterByName}/>
                    </Stack>
                    </Stack>
                    <Stack spacing={2}>
                    <Divider textAlign="left">
                      <Chip label="Product Data" />
                    </Divider>
                      <ProductData 
                       productQty={productQty}
                       changeProductQty={(e) => setProductQty(e.target.value)}
                       productPrice={productPrice}
                       changeProductPrice={(e) => setProductPrice(e.target.value)}
                       productName={productName}
                       handleChangeproductName={changeproductName}
                       productSize={productSize}
                       handleChangeproductSize={changeproductsize}
                       productNameData={productNameData}
                       productSizeData={productSizeData}
                       pName={pName}
                       pSize={pSize}
                      />
                  </Stack>
                  <Stack alignItems="center" style={{marginTop:'2%'}}>
                    <Button type="submit" size="large" variant="contained" onClick={clickAdd}>
                      {t("Add")}
                    </Button> 
                </Stack>

                {groupByName.map((datas,key) => (
                  // <Grid container spacing={2}>
                  <Grid item xs={12} md={6} lg={10}>
                  <Card>
                  <ProductTable handleDelete={handleDelete} tableDatas={datas}/>
                  </Card>
                  {/* <br/> */}
                  {/* </Grid> */}
                  </Grid>))}
                  {tableData.length>0 && (
                    <Grid item xs={12} md={6} lg={10}>
                    <Card>
                      <TotalTable  filterName={filterName} date={date} invoiceSubtotal={invoiceSubtotal} qtyTotal={qtyTotal} />
                    </Card>
                    </Grid>
                    )}
                </Stack>  
                {tableData.length>0 && (
                <Stack alignItems="center" style={{marginTop:'2%'}}>
                   {!edit &&  <Button  type="submit" size="large" variant="contained" onClick={clickSave}>
                      {t("Save")}           
                    </Button>}
                   {edit && <Button  type="submit" size="large" variant="contained" onClick={clickUpdate}>
                      {t("Update")}    
                    </Button>}                      
                </Stack>
                )}
              </ContentStyle>
          </Container>
        </Page>
    )
  }

  export default CustomerTransaction