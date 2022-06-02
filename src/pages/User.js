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
} from '@mui/material';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu , TailorIDSearch} from '../sections/@dashboard/user';
// mock
import USERLIST from '../_mock/user';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'No', alignRight: false },
  { id: 'tailorID', label: 'ID', alignRight: false },
  { id: 'nameMM', label: 'Name', alignRight: false },
  { id: 'phoneNO', label: 'Phone No', alignRight: false },
  { id: 'nrcNO', label: 'NRC No', alignRight: false },
  { id: 'address', label: 'Address', alignRight: false },
  { id: 'action', label: 'Action', alignRight: false },
  { id: 'note', label: 'Note', alignRight: false },
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
    return filter(array, (_user) => _user.nameMM.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

const path = process.env.REACT_APP_BACKEND_URL;

export default function User() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [post, setPost] = useState([]);
  const [totalRow, setTotalRow] = useState();
  const [IdTailor, setIdTailor] = useState();
  const [successMsg, setSuccessMsg] = useState(""); // for success msg
  const [errorMsg, setErrorMsg] = useState([]); // for success msg

  useEffect(() => {
    axios.get(`${path}/api/search-tailor`).then((response) => {
      setPost(response.data.data);
      setTotalRow(response.data.row_count);
    });
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
  

  const isUserNotFound = filteredUsers.length === 0;

  /** click function */
  const deleteTailor=(IdTailor)=>{
    axios
    .post(`${path}/api/delete-tailor`, {
      "tailor_id": IdTailor,
    })
    .then((response) => {
      //  if (response.data.status==='NG') {
      //   setErrorMsg(response.data.message);
      //   setSuccessMsg("");
      //  }
       if (response.data.status==='OK') {
        setSuccessMsg(response.data.message);
        window.location.reload(false);
        // setErrorMsg([]);
       }
    })
    .catch(error => {
      
    });
  }

  return (
    <Page title="User">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h3" gutterBottom>
          List of Tailors
          </Typography>
          <Button variant="contained" component={RouterLink} to="/dashboard/tailors-register" startIcon={<Iconify icon="eva:plus-fill" />}>
            New Tailor
          </Button>
        </Stack>
        <Typography style={{backgroundColor:"green",borderRadius:'10px'}}><h3 style={{color:"white"}}>{successMsg}</h3></Typography>
        <Typography align="right">Total Row : {totalRow} row(s)</Typography>
        <Card>
        <UserListToolbar posts={post} IdTailor={selected}  deleteTailor={deleteTailor} numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName}/>
        {/* <TailorIDSearch posts={post}/> */}
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={post.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row,key) => {
                    const { id,tailorID,nameMM,nameEN,phoneNO,nrcNO,address,description} = row;
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
                        <TableCell align="left">{key+1}</TableCell>
                        <TableCell align="left">{tailorID}</TableCell>
                         <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={nameMM}  />
                            <Typography variant="subtitle2" noWrap>
                              {nameMM}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{phoneNO}</TableCell>
                        <TableCell align="left">{nrcNO}</TableCell>
                        <TableCell align="left">{address}</TableCell> 
                        <TableCell align="center">
                          <UserMoreMenu IdTailor={id} deleteTailor={deleteTailor} />
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
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                  
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

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
