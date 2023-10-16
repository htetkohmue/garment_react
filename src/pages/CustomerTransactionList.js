import { useTranslation } from 'react-i18next';
import { Container, Typography ,Alert, Stack, Grid , Card,Button} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import ApiPath from '../common/common-api/api-path/ApiPath';
import { ApiRequest } from '../common/common-api/api-request/ApiRequest';
import Page from '../components/Page';

// ----------------------------------------------
import { CustomerData,FormLoad,ProductTable,TotalTable,AlertDialogSlide } from '../sections/@dashboard/CustomerTransactionList'
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
  function CustomerTransactionList() {
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
    const [deleteCusTranId, setDeleteCusTranId] = useState([]);

    const [chooseFromDate, setchooseFromDate]       = useState(()=>ChangeDate(new Date()));
    const [chooseToDate, setchooseToDate]           = useState(()=>ChangeDate(new Date()));
    const [chooseFromDateError, setchooseFromDateError] = useState('');
    const [chooseToDateError, setchooseToDateError] = useState('');
    const [chooseFromDateErrorHelperText, setchooseFromDateErrorHelperText] = useState('');
    const [chooseToDateErrorHelperText, setchooseToDateErrorHelperText] = useState('');

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
    const [Id,setId]=useState([]);
    
    

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

     /** click delete function for searchbox - cross sign */
    const deleteCustomer=(IdCustomer)=>{
      setDeleteCustomerId(IdCustomer)
      setOpen(true);
    }

    /** Delete function Start */
     /** Clear table */
     const deleteCusTran = (id) => {
      setDeleteCusTranId(id);
      setOpen(true);
    };

    /** to Delete Customer Data */
    const Agree = (deleteCusTranId) => {    
      setOpen(false);
      setloadingOpen(true);
      (async () => {
        const data = {"id": deleteCusTranId}
        const obj = {url: ApiPath.deleteCustomerTranction, method: 'post', params:data};
        const response = await ApiRequest(obj);
        if (response.flag===true) {
          
          const deletedData= tableData.filter((word) => {
            // return only not same table id that want to delete 
            return word.id !== deleteCusTranId;
          })
          setTableData(deletedData)

          setSuccessMsg(response.response_data.message);
          setPost(post.filter(item => !deleteCusTranId.includes(item.id)));
          setSelected([]);
          setErrorMsg("");
          setloadingOpen(false);
        }
        if (response.flag===false) {
          setErrorMsg(response.message);
          setSuccessMsg("");
          setloadingOpen(false);
        } 
      })();
    };

     /** close alert box function */
    const handleClose = () => {
      setOpen(false);
    };
 
  const handleChangechooseFromDate = (e) => {setchooseFromDate(e)}
  const handleChangechooseToDate = (e) => {setchooseToDate(e)}

  // Click Add
  const clickSearch = () => {
    (async () => {
      setloadingOpen(true);
      const data = {customer_id:customerId,product_name:productName,product_size:productSize,from_date:chooseFromDate,to_date:chooseToDate}
      const obj = {url: ApiPath.searchCustomerTranction, method: 'post', params:data};
      const response = await ApiRequest(obj);
      console.log( response);
      if (response.flag===true) {
        setSuccessMsg('');
        setValidatorErrorMsg([]);
        setErrorMsg('');
        setTableData(response.response_data.data);
        setloadingOpen(false);
      }
      if (response.flag===false) {
        setValidatorErrorMsg(response.message);
        setErrorMsg(response.message);
        setSuccessMsg('');
        setTableData([]);
        setloadingOpen(false);
      } 
    })();     
  } 

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
            <Typography variant="h3" mb={5}> Customer Transaction List</Typography>
              {/* <ContentStyle> */}
                <Stack spacing={2}>
                  <Stack spacing={2}>
                     <Divider textAlign="left">
                      <Chip label="Customer Data" />
                    </Divider>
                    <CustomerData  handleChange={handleChange} IdCustomer={selected} deleteCustomer={deleteCustomer} posts={post}  filterName={filterName} onFilterName={handleFilterByName}/>
                    </Stack>
                    <Divider textAlign="left">
                      <Chip label="Choose Date" />
                    </Divider>                    
                  <Stack  direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <DatePicker required
                    label='From Date'
                    value={chooseFromDate}
                    onChange={handleChangechooseFromDate}
                    error={chooseFromDateError}
                    helperText={chooseFromDateErrorHelperText}
                    />
                    <DatePicker required
                    label='To Date'
                    value={chooseToDate}
                    onChange={handleChangechooseToDate}
                    error={chooseToDateError}
                    helperText={chooseToDateErrorHelperText}
                    />
                     </Stack>
                    <Stack spacing={2}>
                    <Divider textAlign="left">
                      <Chip label="Product Data" />
                    </Divider>
                      <FormLoad 
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
                    <Button 
                    type="submit"
                    size="large" 
                    variant="contained"
                    onClick={clickSearch}>
                      {t("Search")}
                    </Button> 
                </Stack>
                {tableData.map((datas,key) => (
                  <Grid item xs={12} md={6} lg={10}>
                  <Card>
                  <ProductTable deleteCusTran={deleteCusTran}  tableDatas={datas}/>
                  </Card>
                  </Grid>))}
                  {tableData.length>0 && (
                    <Grid item xs={12} md={6} lg={10}>
                    <Card>
                      <TotalTable  filterName={filterName} tableDatas={tableData} />
                    </Card>
                    </Grid>
                    )}
                </Stack>
                {open && (<AlertDialogSlide open={open} Agree={Agree} handleClose={handleClose} deleteCusTranId={deleteCusTranId}/>)}
              {/* </ContentStyle> */}
          </Container>
        </Page>
    )
  }

  export default CustomerTransactionList