import { filter } from 'lodash';
import { useState,useEffect } from 'react';
import { useFormik } from 'formik';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
// material
import { Container
  , Stack
  , Typography
  , Button
  , Card
  , TableContainer
  , Table
  , TableBody
  , TableRow
  , TableCell
  , Checkbox 
  , IconButton
  , Tooltip
  , Alert
  ,Tab 
  ,TablePagination } from '@mui/material';
import {LoadingButton } from '@mui/lab';
import Iconify from '../components/Iconify';
// components
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
// sections
import { ProductSearch,TailorListToolbar,ProductInHead ,AlertDialogSlide,Loading } from '../sections/@dashboard/ProductInList';
import ApiPath from '../common/common-api/api-path/ApiPath';
import {ApiRequest} from '../common/common-api/api-request/ApiRequest';
import { ChangeDate } from '../common/ChangeDate';


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
  
  const path = process.env.REACT_APP_BACKEND_URL;
  
  export default function ProductList(props) {
    const navigate = useNavigate();
    const defaultPerPage = ApiPath.defaultPerPage;
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [selected, setSelected] = useState([]);
    const [orderBy, setOrderBy] = useState('id');
    const [filterName, setFilterName] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [post, setPost] = useState([]);
    const [totalRow, setTotalRow] = useState();
    const [IdTailor, setIdTailor] = useState();
    const [successMsg, setSuccessMsg] = useState(""); // for success msg
    const [errorMsg, setErrorMsg] = useState(); // for success msg
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [tailorData, setTailorData] = useState([]);
    const [open, setOpen] = useState(false);
    const [deleteTailorId, setDeleteTailorId] = useState([]);
    const [loadingOpen, setloadingOpen] = useState(false); // for values
    const [ProductInAPI, setProductInAPI] = useState([]);
    const [validatorErrorMsg, setValidatorErrorMsg] = useState([]);

    const [start, setStart] =useState(()=>ChangeDate(new Date()));
    const [end, setEnd] =useState(()=>ChangeDate(new Date()));
    const [searchTailorId, setSearchTailorId] = useState();   


    const TABLE_HEAD = [
      // { id: 'id', label: 'No', alignRight: false },
      { id: 'productName', label: 'Name', alignRight: false },
      { id: 'size', label: 'size', alignRight: false },
      { id: 'Price', label: 'Price', alignRight: false },
      { id: 'qty', label: 'Qty', alignRight: false },
      { id: 'totalAmount', label: 'Kyats', alignRight: false },
    ];
  
    /* Formload get tailor data */
    useEffect(() => {(async () => {
      const data = {}
      const obj = {url: ApiPath.getTailorData, method: 'get', params:data};
      const response = await ApiRequest(obj);
      if (response.flag===true) {
        setPost(response.response_data.data);
        setTotalRow(response.response_data.row_count);
      }
      if (response.flag===false) {
        setErrorMsg(response.message);
        setSuccessMsg("");
      } 
  })();
    }, []);
  
    const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };
  
    const handleSelectAllClick = (event) => {
      if (event.target.checked) {
        const newSelecteds = post.map((n) => n.id);
        setSelected(newSelecteds);
        return;
      }
      setSelected([]);
    };
  
    const handleClick = (event, name) => {
      const selectedIndex = selected.indexOf(name);
      let newSelected = [];
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, name);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
      }
      setSelected(newSelected);
    };
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  
    const handleFilterByName = (event) => {
      setFilterName(event.target.value);
    };
  
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - post.length) : 0;  

    const filteredProductIn = applySortFilter(ProductInAPI, getComparator(order, orderBy), filterName);
  
    const reloadForm = filterName.trim().length===0;
  
  
    const handleChange = (event, value) =>{
      if (value!==null) {
        setTailorData(post);
        setPost(post.filter(data =>data.tailorId === value.tailorId));
        setSearchTailorId(value.tailorId);
        setFilterName(value.nameMm);
      }
      if (value===null) {
        setPost(tailorData)
        setSelectedOptions([]);
        setFilterName('');
      }     
    }
  
    /** click delete function */
    const deleteTailor=(IdTailor)=>{
      setDeleteTailorId(IdTailor)
      setOpen(true);
    }

     /** close alert box function */
    const handleClose = () => {
      setOpen(false);
    };
     /** alert Delete  Agree function */
     /** to Delete Tailor Data */
     const Agree = (deleteTailorId) => {
      setOpen(false);
      setloadingOpen(true);
      (async () => {
        const data = {"tailor_id": deleteTailorId}
        const obj = {url: ApiPath.deleteTailorData, method: 'post', params:data};
        const response = await ApiRequest(obj);
        if (response.flag===true) {
          setSuccessMsg(response.response_data.message);
          setPost(post.filter(item => !deleteTailorId.includes(item.id)));
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

  /** click delete function */
  const selectedFromDate=(date)=>{
    setStart(ChangeDate(date))
  }

   /** click delete function */
   const selectedToDate=(date)=>{
    setEnd(ChangeDate(date))
  }
    const GotoSearch = () => {   
      setOpen(false);
      setloadingOpen(true);
      (async () => {
        const data = {tailor_id:searchTailorId,tailor_name:filterName,"start_date":start,"end_date":end, language:"en"};
        const obj = { url: ApiPath.searchProductIn, method: 'post', params: data };
        const response = await ApiRequest(obj);
        if (response.flag === true) {
          setProductInAPI(response.response_data.data);console.log(ProductInAPI);
          setTotalRow(response.response_data.row_count);
          setSelected([]);
          setErrorMsg("");
          setloadingOpen(false);
        }
        if (response.flag === false) {
          // setValidatorErrorMsg(response.message);
          setProductInAPI([]);
          setTotalRow();
          setErrorMsg(response.message);
          setSuccessMsg("");
          setloadingOpen(false);
        }
      })();
    }
    
    const editProductIn = (event, tailorId, EditDate) => {   
      setOpen(false);
      setloadingOpen(true);
      (async () => {
        const data = {tailor_id:tailorId, Date:EditDate, language:"en"};
        const obj = { url: ApiPath.searchProductIn, method: 'post', params: data };
        const response = await ApiRequest(obj);
        if (response.flag === true) {
          setSuccessMsg(response.response_data.message);
          setErrorMsg("");
          setloadingOpen(false);
        }
        if (response.flag === false) {
          setErrorMsg(response.message);
          setSuccessMsg("");
          setloadingOpen(false);
        }
      })();
    }

    const deleteProductIn = (event, tailorId, deleteDate) => {   
      setOpen(false);
      setloadingOpen(true);
      (async () => {
        const data = {tailor_id:tailorId, Date:deleteDate, language:"en"};
        const obj = { url: ApiPath.searchProductIn, method: 'post', params: data };
        const response = await ApiRequest(obj);
        if (response.flag === true) {
          setSuccessMsg(response.response_data.message);
          setErrorMsg("");
          setloadingOpen(false);
        }
        if (response.flag === false) {
          setErrorMsg(response.message);
          setSuccessMsg("");
          setloadingOpen(false);
        }
      })();
    }

  return (
  <Page title="Product List">
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
        <Typography variant="h4" sx={{ mb: 5 }}>
          Product List
        </Typography>
        <Stack style={{marginBottom: "2%"}}>
            <ProductSearch 
            start={start} 
            end={end} 
            selectedFromDate={selectedFromDate} 
            selectedToDate={selectedToDate} 
            />
        </Stack>
        <Stack style={{marginBottom: "2%"}}>
            <TailorListToolbar  
            handleChange={handleChange}  
            posts={post} 
            IdTailor={selected}  
            deleteTailor={deleteTailor} 
            numSelected={selected.length} 
            filterName={filterName} 
            onFilterName={handleFilterByName}
            />
        </Stack>
         <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>          
          <Button style={{marginLeft:"19%",marginBottom:"2%"}}  size="large" variant="contained" onClick={GotoSearch} >
           Search
        </Button>
      </Stack>
      <stack style={{marginTop: "3%"}}>
        
      {ProductInAPI.length > 0 && (
        <Card>
          <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                    {filteredProductIn.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                      const { key , id , Date , tailorId , name , totalQty , totalAmt,allData} = row;
                      const isItemSelected = selected.indexOf(id) !== -1;
                      return (
                        <Table style={{margin: "1%",border: "1px solid #919eab", width: "98%",borderRadius:'10px'}} id="main">
                          <TableBody>
                          <TableRow 
                          key={id}
                          tabIndex={-1}                          
                          selected={isItemSelected}
                          aria-checked={isItemSelected}>

                          <TableCell align="left" rowSpan={4} width="2%">{key}</TableCell>
                          <TableCell align="left" rowSpan={4}  width="10%">{Date}</TableCell>
                          <TableCell align="left">{tailorId} -  {name}</TableCell>
                          <TableCell align="right" width="4%">
                          <Tooltip title="edit">
                              <IconButton aria-label="edit" onClick={(event) => editProductIn(event, tailorId, Date)}>
                                <Iconify icon="akar-icons:edit" />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                          <TableCell align="right" width="4%">
                          <Tooltip title="delete">
                              <IconButton aria-label="delete" onClick={(event) => deleteProductIn(event, tailorId, Date)}>
                                <Iconify icon="eva:trash-2-outline" />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                          </TableRow>
                          <TableRow>
                          
                          <Table id="sub">
                            <ProductInHead
                                order={order}
                                orderBy={orderBy}
                                headLabel={TABLE_HEAD}
                                numSelected={selected.length}
                                onRequestSort={handleRequestSort}
                                onSelectAllClick={handleSelectAllClick}
                              />
                            <TableBody>
                            {/* filteredProductIn.key.allData */}
                          {allData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                              const {  productName, size ,  price , qty , totalAmount } = row;
                              const isItemSelected = selected.indexOf(id) !== -1;
                              return (
                                  <TableRow>
                                    {/* <TableCell align="left">{id}</TableCell> */}
                                    <TableCell align="left">{productName}</TableCell>
                                    <TableCell align="left">{size}</TableCell>
                                    <TableCell align="left">{price}</TableCell>
                                    <TableCell align="left">{qty}</TableCell>
                                    <TableCell align="left">{totalAmount}</TableCell>
                                  </TableRow>
                              );
                            })}
                            <TableRow>
                                <TableCell align="center">Total</TableCell>
                                <TableCell align="left">-</TableCell>
                                <TableCell align="left">-</TableCell>
                                <TableCell align="left">{totalQty}</TableCell>
                                <TableCell align="left">{totalAmt}</TableCell>
                            </TableRow>
                             </TableBody>
                            </Table>
                           </TableRow>
                                                   
                          <TableRow>
                              <TableCell align="center">{key}</TableCell>
                              <TableCell align="right">
                                  <Tooltip title="Print">
                                    <IconButton aria-label="Print" >
                                      <Iconify icon="oi:print" />
                                    </IconButton>
                                </Tooltip>
                               </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      );
                    })}
              </TableContainer>
              </Scrollbar>
              {open && (<AlertDialogSlide open={open} Agree={Agree} handleClose={handleClose}/>)}

              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={post.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
          </Card>
      )}
      </stack>
    </Container>
  </Page>
  );
}