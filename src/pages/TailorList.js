import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState,useEffect} from 'react';
import axios from "axios";
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  CircularProgress,
  Alert
} from '@mui/material';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { TailorListHead, TailorListToolbar, TailorMoreMenu ,AlertDialogSlide,Loading} from '../sections/@dashboard/TailorList';
import ApiPath from '../common/common-api/api-path/ApiPath';
import {ApiRequest} from '../common/common-api/api-request/ApiRequest';


// mock

// ----------------------------------------------------------------------
const TABLE_HEAD = [
  { id: 'no', label: 'No', alignRight: false },
  { id: 'tailorId', label: 'ID', alignRight: false },
  { id: 'nameMm', label: 'Name', alignRight: false },
  { id: 'phoneNo', label: 'Phone No', alignRight: false },
  { id: 'nrcNo', label: 'NRC No', alignRight: false },
  { id: 'address', label: 'Address', alignRight: false },
  { id: 'action', label: 'Action', alignRight: false },
  { id: 'description', label: 'Note', alignRight: false },
];

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
  if (query) {
    return filter(array, (_user) => _user.nameMm.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

const path = process.env.REACT_APP_BACKEND_URL;

export default function User() {
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

  const filteredUsers = applySortFilter(post, getComparator(order, orderBy), filterName);

  const reloadForm = filterName.trim().length===0;
  const isUserNotFound = filteredUsers.length===0;


  const handleChange = (event, value) =>{
    if (value!==null) {
      setTailorData(post);
      setPost(post.filter(data =>data.tailorId === value.tailorId));
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

  return (
    <Page title="User">
      <Container>
      {loadingOpen && (<Loading loadingOpen={loadingOpen} />)}
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h3" gutterBottom>
          List of Tailors
          </Typography>
          <Button variant="contained" component={RouterLink} to="/dashboard/tailors-register" startIcon={<Iconify icon="eva:plus-fill" />}>
            New Tailor
          </Button>
        </Stack>
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
        <Typography align="right">Total Row : {post.length} row(s)</Typography>
        <Card>
        <TailorListToolbar  handleChange={handleChange}  posts={post} IdTailor={selected}  deleteTailor={deleteTailor} numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName}/>
        {/* <TailorIDSearch posts={post}/> */}
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TailorListHead
                  order={order}
                  isUserNotFound={isUserNotFound}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={post.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row,key) => {
                    const {no,id,tailorId,nameMm,nameEn,phoneNo,nrcNo,address,description} = row;
                    const isItemSelected = selected.indexOf(id) !== -1;
                    return (
                      <TableRow
                        hover
                        key={id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                       >
                        <TableCell padding="checkbox">
                          <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, id)} />
                        </TableCell>
                        <TableCell align="left">{no}</TableCell>
                        <TableCell align="left">{tailorId}</TableCell>
                         <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={nameMm}  />
                            <Typography variant="subtitle2" noWrap>
                              {nameMm}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{phoneNo}</TableCell>
                        <TableCell align="left">{nrcNo}</TableCell>
                        <TableCell align="left">{address}</TableCell> 
                        <TableCell align="left">
                          <TailorMoreMenu open={open} IdTailor={id} deleteTailor={deleteTailor} />
                        </TableCell>
                        <TableCell align="left">{description}</TableCell> 
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={8} />
                    </TableRow>
                  )}
                </TableBody>
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={8} sx={{ py: 3 }}>
                        <SearchNotFound reloadForm={reloadForm} searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}               
              </Table>
            </TableContainer>
          </Scrollbar>
      
          {open && (<AlertDialogSlide open={open} Agree={Agree} handleClose={handleClose} deleteTailorId={deleteTailorId}/>)}

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
      </Container>
    </Page>
    
  );
}
