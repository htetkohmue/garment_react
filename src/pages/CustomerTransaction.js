import { Container, Typography ,Alert, Stack, TableBody, Table, TableRow, TableCell, TableHead  , TableContainer} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import ApiPath from '../common/common-api/api-path/ApiPath';
import { ApiRequest } from '../common/common-api/api-request/ApiRequest';
import Page from '../components/Page';

// ----------------------------------------------
import { CustomerData,ProductData } from '../sections/@dashboard/CustomerTransaction'
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

  function CustomerTransaction() {
    const [loadingOpen, setloadingOpen] = useState(false); // for values
    const [successMsg, setSuccessMsg] = useState(''); // for success msg
    const [errorMsg, setErrorMsg] = useState(''); // for error msg
    
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
    // const [Adddata,setAdddata]=useState([]);
    const [Alldata,setAlldata]=useState([]);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

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
      }
      if (value===null) {
        setPost(customerData)
        setSelectedOptions([]);
        setFilterName('');
      }
    }
     /** click delete function - cross sign */
  const deleteCustomer=(IdCustomer)=>{
    setDeleteCustomerId(IdCustomer)
    setOpen(true);
  }

  const handleChangechooseDate = (e) => {setchooseDate(e)}
  
  const clickAdd = (values) => {
    const Adddata = [{
      productNames:productName,
      productSizes:productSize,
      productQty:values.productQty,
      productPrice:values.productPrice
    }]

    // const Adddata = [
    //  productName,
    //  productSize,
    //   values.productQty,
    //   values.productPrice
    // ]

    const testArr = {productNames:productName,Adddata};

     Alldata.push(testArr);
     setAlldata(Alldata);
     console.log(Alldata);
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
            <Typography variant="h3" mb={5}> Customer Transaction</Typography>     
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
                      <ProductData clickAdd={clickAdd} 
                       handleChangeproductName={(e) => setproductName(e.target.value)}
                       handleChangeproductSize={(e) => setproductSize(e.target.value)}
                      />
                  </Stack>
                </Stack>  
              </ContentStyle>
              <Stack spacing={2}>
              <Stack  direction={{ xs: 'column', sm: 'row' }} spacing={3}>

              {Alldata.length > 0 && (
                <TableContainer sx={{ minWidth: 600 }}>
                 {Alldata.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                  const {  productNames , Adddata} = row;
                  return (
                  <Card style={{width:"80%",margin: "3%"}} spacing={5}>
                  <Table id="main">
                  <TableHead>
                      {/* <TableCell align="center">No.</TableCell> */}
                      <TableCell align="center">Product Name</TableCell>
                      <TableCell align="center">Product Size</TableCell>
                      <TableCell align="left">Product Quantity</TableCell>
                      <TableCell align="left">Product Price</TableCell>
                  </TableHead>
                  <TableBody>
                  {Adddata.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                      const { key , productNames , productQty , productSizes , productPrice } = row;
                      // const isItemSelected = selected.indexOf(id) !== -1;
                      return (
                      <TableRow>
                        {/* <TableCell align="center">{key}</TableCell> */}
                        <TableCell align="center">{productNames}</TableCell>
                        <TableCell align="center">{productSizes}</TableCell>
                        <TableCell align="left">{productQty}</TableCell>
                        <TableCell align="left">{productPrice}</TableCell>
                      </TableRow>
                      );
                  })}
                  </TableBody>
                  </Table>
                  </Card>
                  );
              })}
            </TableContainer>

              )}
             

              </Stack> 
              </Stack>    
          </Container>
        </Page>
    )
  }

  export default CustomerTransaction