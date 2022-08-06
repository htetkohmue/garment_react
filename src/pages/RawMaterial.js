import { Link as RouterLink } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
// material
import {
  Grid,
  Button,
  Container,
  Stack,
  Typography,
  TextField,
  Card,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
  TablePagination,
  Snackbar,
  Alert,
  IconButton,
  Tooltip,
} from '@mui/material';
// import { Formik, FormikProvider } from 'formik';
import axios from 'axios';
import { filter } from 'lodash';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
import { toast, ToastContainer } from 'react-toastify';
import SearchNotFound from '../components/SearchNotFound';
import 'react-toastify/dist/ReactToastify.css';

// components
import Scrollbar from '../components/Scrollbar';
import Page from '../components/Page';
import Iconify from '../components/Iconify';
import { RawListToolbar, RawMaterialIndex, RawListHead } from '../sections/@dashboard/RawMaterial';
import { isEmpty } from '../sections/common/Validation';
import '../sections/common/style.css';

// mock
import POSTS from '../_mock/blog';

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
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function RawMaterial() {
  const path = process.env.REACT_APP_BACKEND_URL;
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [nameError, setNameError] = useState(false);
  const [nameHelperText, setNameHelperText] = useState('');
  const [rawDataAPI, setRawDataAPI] = useState([]);
  const [rawID, setRawID] = useState();
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('id');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalRow, setTotalRow] = useState();
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState([]);
  const [insertMode, setInsertMode] = useState('');
  const [rawIDs, setRawIDs] = useState([]);

  const TABLE_HEAD = [
    { id: 'id', label: 'No', alignRight: false },
    { id: 'Name', label: 'Name', alignRight: false },
    { id: 'Type', label: 'Type', alignRight: false },
    { id: 'Edit', label: 'Edit', alignRight: false },
    // { id: 'Delete', label: 'Delete', alignRight: false },
    { id: 'Description', label: 'Description', alignRight: false },
  ];

  const filteredRaws = applySortFilter(rawDataAPI, getComparator(order, orderBy), filterName);

  const isDataNotFound = filteredRaws.length === 0;
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rawDataAPI.length) : 0;

  useEffect(() => {
    setInsertMode('Register');
    // loadRawData();
  }, []);
  const loadRawData = () => {
    axios.get(`${path}/api/search-raws`).then((response) => {
      setRawDataAPI(response.data.data);
      setTotalRow(response.data.row_count);
    });
 
  };

  const nameOnChange = (e) => {
    setName(e.target.value);
    setNameError(false);
    setNameHelperText('');
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rawDataAPI.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
    console.log(selected)
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

  const clickRegister = () => {// console.log(rawID)
    if (isEmpty(name)) {
      setNameError(true);
      setNameHelperText('Raw Material Name is required!');
    } else if (!!rawID === true) {
      axios
        .put(`${path}/api/update-raws/${rawID}`, {
          name,
          type,
          description,
          login_id: 2001,
        })
        .then((response) => {
          if (response.data.status === 'NG') {
            clickCancel();
          }
          if (response.data.status === 'OK') {
            loadRawData();
            toast.success(response.data.message, { position: toast.POSITION.TOP_RIGHT });
            clickCancel();
            setSuccessMsg(response.data.message);
          }
        })
        .catch((error) => {});
    } else {
      axios
        .post(`${path}/api/raw-register`, {
          id: rawID,
          name,
          type,
          description,
          login_id: 2001,
        })
        .then((response) => {
          if (response.data.status === 'NG') {
            clickCancel();
          }
          if (response.data.status === 'OK') {console.log(response.data.message)
            // loadRawData();
            // toast.success(response.data.message, { position: toast.POSITION.TOP_RIGHT });
            toast.success(response.data.message);
            clickCancel();
            setSuccessMsg(response.data.message);
          }
        })
        .catch((error) => {});
    }
  };

  const clickCancel = () => {
    setName('');
    setType('');
    setDescription('');
    setRawID('');
    setSelected([])
  };

  // const editRaws = (e, id) => {
  //   axios
  //     .get(`${path}/api/edit-raws/${id}`, {
  //       id,
  //     })
  //     .then((response) => {
  //       if (response.data.status === 'NG') {
  //         setErrorMsg(response.data.message);
  //       }
  //       if (response.data.status === 'OK') {
  //         // console.log(response.data.data)
  //         setName(response.data.data.name);
  //         setType(response.data.data.type);
  //         setDescription(response.data.data.description);
  //         setInsertMode('Update');
  //         setRawID(response.data.data.id);
  //         window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  //       }
  //     })
  //     .catch((error) => {});
  // };

  // const deleteRaws = (id) => {
  //   axios
  //     .post(`${path}/api/delete-raws`, {
  //       id,
  //     })
  //     .then((response) => {
      
  //       if (response.data.status === 'NG') {
  //         setErrorMsg(response.data.message);
  //       }
  //       if (response.data.status === 'OK') {
  //         loadRawData();
  //         toast.success(response.data.message, { position: toast.POSITION.TOP_RIGHT });
  //         clickCancel();
  //         setSuccessMsg(response.data.message);
  //         window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  //       }
  //     })
  //     .catch((error) => {});
  // };

  return (
    <Page title="Dashboard: RawMaterial">
      <Container>
        <Typography variant="h3" mb={5}>
          Raw Material
        </Typography>
        <RawMaterialIndex
          path={path}
          name={name}
          type={type}
          description={description}
          nameError={nameError}
          nameHelperText={nameHelperText}
          nameOnChange={nameOnChange}
          setType={setType}
          setDescription={setDescription}
          clickRegister={clickRegister}
          clickCancel={clickCancel}
          insertMode={insertMode}
        />
         <ToastContainer />

        {/* <Card>
          <RawListToolbar
            posts={rawDataAPI}
            rawIDs={selected}
            deleteRaws={deleteRaws}
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <RawListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={rawDataAPI.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredRaws.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { key, id, name, type, edit, del, description } = row;
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
                        <TableCell align="left">{key}</TableCell>
                        <TableCell align="left">{name}</TableCell>
                        <TableCell align="left">{type}</TableCell>
                        <TableCell align="left">
                          <Tooltip title="edit">
                            <IconButton aria-label="edit" onClick={(e) => editRaws(e, id)}>
                           
                              <Iconify icon="akar-icons:edit" />
                            </IconButton>
                          </Tooltip>
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

                {isDataNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}

              </Table>
            </TableContainer>
          </Scrollbar>

          <ToastContainer className="toast-position" />

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rawDataAPI.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card> */}
      </Container>
    </Page>
  );
}
