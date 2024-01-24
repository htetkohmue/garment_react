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
import { CheckBox } from '@material-ui/icons';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Page from '../components/Page';
// sections
import { DateSearch, NewTransactionForm, OldDataSearchForm, DataTableForm, TailorListToolbar, Loading } from '../sections/@dashboard/TailorRawTransaction';
import ApiPath from '../common/common-api/api-path/ApiPath';
import { ApiRequest } from '../common/common-api/api-request/ApiRequest';
import { ChangeDate } from '../common/ChangeDate';

// ----------------------------------------------------------------------
const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 600,
  margin: '70px',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
}));

const path = process.env.REACT_APP_BACKEND_URL;
// ----------------------------------------------------------------------
export default function TailorRawTransaction() {
    const { t } = useTranslation();
    const defaultPerPage = ApiPath.defaultPerPage;
    const [checked, setChecked] = useState(false);
    const [successMsg, setSuccessMsg] = useState(''); // for success msg
    const [validatorErrorMsg, setValidatorErrorMsg] = useState([]); // for valid msg
    const [errorMsg, setErrorMsg] = useState(''); // for error msg
    const [successNewPMsg, setSuccessNewPMsg] = useState(''); // for success msg
    const [errorNewPMsg, setErrorNewPMsg] = useState(''); // for error msg
    const [successNewPsizeMsg, setSuccessNewPsizeMsg] = useState(''); // for success msg
    const [errorNewPsizeMsg, setErrorNewPsizeMsg] = useState(''); // for error msg
    const [successTranMsg, setSuccessTranMsg] = useState(''); // for success msg
    const [errorTranMsg, setErrorTranMsg] = useState(''); // for error msg
    const [values, setValues] = useState([]); // for values
    const [edit, setEdit] = useState(false); // for values
    const [newTran, setNewTran] = useState(false); // for values
    const [loadingOpen, setloadingOpen] = useState(false); // for values

    const [post, setPost] = useState([]);
    const [searchTailorId, setSearchTailorId] = useState("");
    const [tailorData, setTailorData] = useState([]);
    const [deleteTailorId, setDeleteTailorId] = useState([]);
    const [filterName, setFilterName] = useState('');
    const [selected, setSelected] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [open, setOpen] = useState(false);
    const [pNameopen, setPnameOpen] = useState(false);
    const [pSizeopen, setPsizeOpen] = useState(false);
    const [totalRow, setTotalRow] = useState();
    const [productNameData,setproductNameData]=useState([]);
    const [start, setStart] =useState(()=>ChangeDate(new Date()));
    const [end, setEnd] =useState(()=>ChangeDate(new Date()));
    const [pName,setpName]=useState('');
    const [productId,setproductId]=useState('');
    const [pSize,setpSize]=useState('');
    const [productSize,setproductSize]=useState('');
    const [productSizeData,setproductSizeData]=useState([]);
    const [newPname,setNewPname]=useState('');  
    const [sizesAll,setSizesAll]=useState(''); 
    const [sizeId,setSizeId]=useState('');   
    const [sizeName,setSizeName]=useState('');   
    const [categories,setCategories]=useState(''); 
    const [tranDate, setTrantDate] =useState(()=>ChangeDate(new Date()));
    const [categoryId,setCategoryId]=useState('');
    const [categoryName,setCategoryName]=useState('');
    const [rawsData,setRawsData]=useState('');
    const [raw1Id,setRaw1Id]=useState('');
    const [raw1Name,setRaw1Name]=useState('');
    const [raw2Id,setRaw2Id]=useState('');
    const [raw2Name,setRaw2Name]=useState('');
    const [totalQty,setTotalQty]=useState('');
    const [number,setNumber]=useState('');
    const [productPerRaw,setProductPerRaw]=useState(''); 
    const [description,setDescription]=useState('');
    const [tailorTranAPI,setTailorTranAPI]=useState(''); 

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

      /* Get all sizes */
      useEffect(() => {
        (async () => {
           setloadingOpen(true);
          const obj = { url: ApiPath.getSizes, method: 'get' };
          const response = await ApiRequest(obj);
          if (response.flag === true) {
            setSizesAll(response.response_data.data);
          }
        })();
      }, []);

         /* Get all categories */
         useEffect(() => {
          (async () => {
             setloadingOpen(true);
            const obj = { url: ApiPath.getCategories, method: 'get' };
            const response = await ApiRequest(obj);
            if (response.flag === true) {
              setCategories(response.response_data.data);
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

      /* Formload get Raws */
      useEffect(() => {(async () => {
        const data = {}
        const obj = {url: ApiPath.searchRaws, method: 'get', params:data};
        const response = await ApiRequest(obj);
        if (response.flag===true) {
          setRawsData(response.response_data.data);
        }
        if (response.flag===false) {
          setErrorMsg(response.message);
          setSuccessMsg("");
        } 
      })();
      }, []);

         /* change name */
       const changeproductName = (event, value) =>{
        (async () => {
          setproductId(value.props.value);
          setpName(value.props.name);
           const data = {product_id:event.target.value}
           const obj = {url: ApiPath.getProductNameByID, method: 'post', params:data};
            const response = await ApiRequest(obj);
            if (response.flag===true) {
              console.log(response.response_data.data);
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
      
      const ChangeSize = (event,  value) => {
        setSizeId(value.props.value);
        setSizeName(value.props.name);
      }

      const changeCategory = (event,  value) => {
        setCategoryId(value.props.value);
        setCategoryName(value.props.name);
      }

      const changeRaw1 = (event,  value) => {
        setRaw1Id(value.props.value);
        setRaw1Name(value.props.name);
      }
      const changeRaw2 = (event,  value) => {
        setRaw2Id(value.props.value);
        setRaw2Name(value.props.name);
      }
      

    /** click delete function */
    const selectedFromDate=(date)=>{
      setStart(ChangeDate(date))
    }

    /** click delete function */
    const selectedToDate=(date)=>{
      setEnd(ChangeDate(date))
    }
     /** click delete function */
     const selectedDate=(date)=>{
      setTrantDate(ChangeDate(date))
    }
    
    const handleFilterByName = (event) => {
      setFilterName(event.target.value);
    };

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

    const GotoSearch = () => {        
      setOpen(false);
      setloadingOpen(true);
      (async () => {
         const data = {tailor_id:searchTailorId,tailor_name:filterName,"start_date":start,"end_date":end,"product_id":productId,"size_id":sizeId, language:"en"};
         const obj = { url: ApiPath.searchTailorRaw, method: 'post', params: data };
         const response = await ApiRequest(obj);
        
        if (response.flag === true) {
          setTailorTranAPI(response.response_data.data);
          setTotalRow(response.response_data.row_count);
          setSelected([]);
          setErrorMsg("");
          setloadingOpen(false);
        }
        if (response.flag === false) {
          // setValidatorErrorMsg(response.message);
          setTailorTranAPI([]);
          setTotalRow();
          setErrorMsg(response.message);
          setSuccessMsg("");
          setloadingOpen(false);
        }
      })();
    }
    
    const addNewTransaction = () => {   
      setOpen(true);
    }
    const handleClose = () => {
      setOpen(false);
      setErrorTranMsg("");
      setSuccessTranMsg("");
      window.location.reload(false);
    };

    const addNewPName = () => {   
      setPnameOpen(true);
    }   
    const handlePnameClose = () => {
      setPnameOpen(false);
      setErrorNewPMsg("");
      setSuccessNewPMsg("");
      window.location.reload(false);
    };

    const addNewPSize = () => {   
      setPsizeOpen(true);
    }
    const handlePsizeClose = () => {
      setPsizeOpen(false);
      setErrorNewPsizeMsg("");
      setSuccessNewPsizeMsg("");
      window.location.reload(false);
    };

     // Function to handle checkbox state changes
    const checkHandleChange = (event) => {
      setChecked(event.target.checked);
    };

    const addNewProduct = () => {
      setOpen(false);
      setloadingOpen(true);
      (async () => {
         const data = {product_name:newPname, language:"en"};
         console.log(data);
         const obj = { url: ApiPath.createProduct, method: 'post', params: data };
         const response = await ApiRequest(obj);
        
        if (response.flag === true) {
          setErrorNewPMsg("");
          setSuccessNewPMsg(response.response_data.message);
          setloadingOpen(false);
        }
        if (response.flag === false) {
          // setValidatorErrorMsg(response.message);
          setErrorNewPMsg(response.message);
          setSuccessNewPMsg("");
          setloadingOpen(false);
        }
      })();
      setNewPname("");
    };
    const addNewProductSize = () => {
      (async () => {
         const data = {product_id:productId,size_id: sizeId,language:"en"};
         const obj = { url: ApiPath.createProductSize, method: 'post', params: data };
         const response = await ApiRequest(obj);
        
        if (response.flag === true) {
          setErrorNewPsizeMsg("");
          setSuccessNewPsizeMsg(response.response_data.message);
          setloadingOpen(false);
        }
        if (response.flag === false) {
          // setValidatorErrorMsg(response.message);
          setErrorNewPsizeMsg(response.message);
          setSuccessNewPsizeMsg("");
          setloadingOpen(false);
        }
      })();
      setNewPname("");
    };

    const addTailorTransaction = () => {
      (async () => {
      const data = {tailor_id:searchTailorId,date: tranDate,product_id:productId,size_id:productSize,category_id:categoryId,raw1_id:raw1Id,raw2_id:raw2Id,raw_qty:number,product_per_raws:productPerRaw,total_product_qty:totalQty,checkBox:checked,startDate:start,endDate:end,des:description,language:"en"};// out and totalQty are same
      const obj = { url: ApiPath.createTailorRawTransaction, method: 'post', params: data };
         const response = await ApiRequest(obj);
        
        if (response.flag === true) {
          setErrorTranMsg("");
          setSuccessTranMsg(response.response_data.message);
          setloadingOpen(false);
        }
        if (response.flag === false) {
          // setValidatorErrorMsg(response.message);
          setErrorTranMsg(response.message);
          setSuccessTranMsg("");
          setloadingOpen(false);
        }
      })();
    }
    
    return (
        <Page title="Register">
          <Container>
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
          {/* {loadingOpen && (<Loading loadingOpen={loadingOpen} />)} */}
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              {!edit && (
                <Typography variant="h3" gutterBottom>
                  {t('Tailor Raw Transaction Register')}
                </Typography>
              )}
              {edit && (
                <Typography variant="h3" gutterBottom>
                 {t('Tailor Raw Transaction Updating')}
                </Typography>
              )}
            </Stack>
            <Stack style={{marginBottom: "2%"}} spacing={2}>
                <Divider textAlign="left">
                  <Chip label="Choose Date" />
                </Divider> 
                <DateSearch 
                start={start} 
                end={end} 
                selectedFromDate={selectedFromDate} 
                selectedToDate={selectedToDate} 
                />
            </Stack>
              <Stack style={{marginBottom: "2%"}} spacing={2}>
                <TailorListToolbar  
                handleChange={handleChange}  
                posts={post} 
                IdTailor={selected}  
                deleteTailor={deleteTailor} 
                numSelected={selected.length} 
                filterName={filterName} 
                onFilterName={handleFilterByName}
                productNameData={productNameData}
                productId={productId}
                handleChangeproductName={changeproductName}
                pName={pName}
                addNewPName={addNewPName}
                pNameopen={pNameopen}
                handlePnameClose={handlePnameClose}
                newPname={newPname}
                setNewPname={setNewPname}
                addNewProduct={addNewProduct}
                successNewPMsg={successNewPMsg}
                errorNewPMsg={errorNewPMsg}
                productSize={productSize}
                pSize={pSize}
                handleChangeproductSize={changeproductsize}
                productSizeData={productSizeData}
                addNewPSize={addNewPSize}
                handlePsizeClose={handlePsizeClose}
                pSizeopen={pSizeopen}
                sizesAll={sizesAll}
                addNewProductSize={addNewProductSize}
                sizeId={sizeId}
                sizeName={sizeName}
                handleChangeSize={ChangeSize}
                successNewPsizeMsg={successNewPsizeMsg}
                errorNewPsizeMsg={errorNewPsizeMsg}

                />
            </Stack>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} style={{marginTop:'2%',marginLeft:"22%"}}>        
              <Button style={{marginTop:"2%"}}  size="large" variant="contained" onClick={GotoSearch} >
                Search
              </Button>
              <Button style={{marginTop:"2%"}}  size="large" variant="contained" onClick={addNewTransaction} >
                New Transaction
              </Button>
              <Dialog open={open} onClose={handleClose} >
                    {successTranMsg && (
                    <Alert variant="filled" severity="info">
                        <b>{successTranMsg}</b>
                    </Alert>
                    )}
                    {errorTranMsg && (
                    <Alert variant="filled" severity="error">
                        <b>{errorTranMsg}</b>
                    </Alert>
                    )}
                    <DialogTitle>Tailor New Transaction </DialogTitle>
                    <DialogContent>
                      <Stack spacing={2}>
                        <Stack marginTop={2}>
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                              label={t("From Date")}
                              value={tranDate}
                              onChange={(newValue) => selectedDate(newValue)}
                              renderInput={(params) => <TextField {...params} />}
                            />
                          </LocalizationProvider>
                        </Stack>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <FormControl fullWidth >
                          <InputLabel id="demo-simple-select-required-label">Product Name *</InputLabel>
                          <Select
                          value={productId}
                          name={pName}
                          label={t("Product Name *")}
                          onChange={changeproductName}
                          >
                              <MenuItem key="" value="---Select---" name="">--Select--</MenuItem>
                              {productNameData.length >0 &&
                                productNameData.map((i,ind) => {
                                      return( <MenuItem key={ind} value={i.id} name={i.product_name}>{ i.product_name }</MenuItem>)
                                  
                                  })
                              }
                          </Select>
                          </FormControl>
                        </Stack>
                        <Stack>
                        <FormControl fullWidth >
                        <InputLabel id="demo-simple-select-required-label">Size *</InputLabel>
                        <Select
                        labelId="demo-simple-select-required-label"
                        id="demo-simple-select-required"
                        value={productSize}
                        name={pSize}
                        label={t("Size *")}
                        onChange={changeproductsize}
                        >
                            <MenuItem key="" value="" name="">--Select--</MenuItem>
                            {productSizeData.length >0 &&
                                productSizeData.map((i,ind) => {
                                    return( <MenuItem key={ind} value={i.id} name={i.size}>{ i.size }</MenuItem>)
                                
                                })
                            }
                            
                        </Select>
                          </FormControl>
                        </Stack>
                        <Stack>
                        <FormControl fullWidth >
                          <InputLabel id="demo-simple-select-required-label">category *</InputLabel>
                          <Select
                          labelId="demo-simple-select-required-label"
                          id="demo-simple-select-required"
                          value={categoryId}
                          name={categoryName}
                          label={t("Category *")}
                          onChange={changeCategory}
                          >
                              <MenuItem key="" value="" name="">--Select--</MenuItem>
                              {categories.length >0 &&
                                  categories.map((i,ind) => {
                                      return( <MenuItem key={ind} value={i.id} name={i.name}>{ i.name }</MenuItem>)
                                  
                                  })
                              }
                              
                          </Select>
                          </FormControl>
                        </Stack>
                        <Stack  direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                          <FormControl fullWidth >
                            <InputLabel id="demo-simple-select-required-label">Fabric 1 *</InputLabel>
                            <Select
                            labelId="demo-simple-select-required-label"
                            id="demo-simple-select-required"
                            value={raw1Id}
                            name={raw1Name}
                            label={t("Fabric 1 *")}
                            onChange={changeRaw1}
                            >
                              <MenuItem key="" value="" name="">--Select--</MenuItem>
                              {rawsData.length >0 &&
                                  rawsData.map((i,ind) => {
                                      return( <MenuItem key={ind} value={i.id} name={i.name}>{ i.name }</MenuItem>)
                                  
                                  })
                              }
                          </Select>
                          </FormControl>
                          <FormControl fullWidth >
                            <InputLabel id="demo-simple-select-required-label">Fabric 2 </InputLabel>
                            <Select
                            labelId="demo-simple-select-required-label"
                            id="demo-simple-select-required"
                            value={raw2Id}
                            name={raw2Name}
                            label={t("Fabric 1 *")}
                            onChange={changeRaw2}
                            >
                              <MenuItem key="" value="" name="">--Select--</MenuItem>
                              {rawsData.length >0 &&
                                  rawsData.map((i,ind) => {
                                      return( <MenuItem key={ind} value={i.id} name={i.name}>{ i.name }</MenuItem>)
                                  
                                  })
                              }
                          </Select>
                          </FormControl>
                        </Stack>
                        <Stack  direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                          <TextField
                            sx={{ width: 150 }}
                            label={t("Number *")}
                            onChange={(e) => {
                              setNumber(e.target.value);
                            }}
                          />
                          <div style={{marginTop:"4%"}}>X</div>
                          <TextField
                            sx={{ width: 150 }}
                            label={t("Each Qty *")}
                            onChange={(e) => {
                              setProductPerRaw(e.target.value);
                              setTotalQty(e.target.value * number);
                          }}
                          />
                          <div style={{marginTop:"4%"}}>=</div>
                          <TextField
                            disabled
                            sx={{ width: 150 }}
                            label={t("Total qty *")}
                            value={totalQty}
                          />
                        </Stack>
                        <Stack>
                        <TextField
                            sx={{ width: 150 }}
                            label={t("Description")}
                            onChange={(e) => {
                              setDescription(e.target.value);
                            }}
                          />
                        </Stack>
                        <div>
                          {/* Checkbox with label */}
                          <FormControlLabel
                            control={<Checkbox checked={checked} onChange={checkHandleChange} />}
                            label="Combined Remaining"
                          />
                        </div>
                        
                      </Stack>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={addTailorTransaction}>Add</Button>
                    <Button onClick={handleClose}>Close</Button>                    
                    </DialogActions>
                </Dialog>
            </Stack>
            <Stack style={{marginTop:"4%"}}>
            {tailorTranAPI.length>0 && (
              <Grid item xs={12} md={6} lg={10}>
              <Card>
                <DataTableForm  filterName={filterName} data={tailorTranAPI} />
              </Card>
              </Grid>
              )}
            </Stack>
            {/* <ContentStyle>
              {!edit && <NewTransactionForm />}
              {edit && <NewTransactionForm  values={values} />}
            </ContentStyle> */}
              
          </Container>
        </Page>
      );
}