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
// import axios from 'axios';
import { filter } from 'lodash';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import { toast, ToastContainer } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import Loading from '../common/LoadingPage/Loading';
import ApiPath from '../common/common-api/api-path/ApiPath';
import { ApiRequest } from '../common/common-api/api-request/ApiRequest';

import SearchNotFound from '../components/SearchNotFound';

// components
import Scrollbar from '../components/Scrollbar';
import Page from '../components/Page';
import Iconify from '../components/Iconify';
import { RawListToolbar, RawMaterialIndex, RawListHead } from '../sections/@dashboard/RawMaterial';
import { isEmpty } from '../common/Validation/Validation';
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
  const { t } = useTranslation();
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
  const [errorMsg, setErrorMsg] = useState('');
  const [insertMode, setInsertMode] = useState('');
  const [rawIDs, setRawIDs] = useState([]);
  const [validatorErrorMsg, setValidatorErrorMsg] = useState([]);
  const [loadingOpen, setloadingOpen] = useState(false);

  const TABLE_HEAD = [
    { id: 'id', label: 'No', alignRight: false },
    { id: 'Name', label: 'Name', alignRight: false },
    { id: 'Type', label: 'Types', alignRight: false },
    { id: 'Edit', label: 'Edit', alignRight: false },
    { id: 'Delete', label: 'Delete', alignRight: false },
    { id: 'Description', label: 'Description', alignRight: false },
  ];

  const filteredRaws = applySortFilter(rawDataAPI, getComparator(order, orderBy), filterName);

  const isDataNotFound = filteredRaws.length === 0;
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rawDataAPI.length) : 0;

  useEffect(() => {
    setInsertMode('Register');
    loadRawData();
  }, []);
  const loadRawData = () => {
    (async () => {
      setloadingOpen(true);
      const obj = { url: ApiPath.searchRaws, method: 'get' };
      const response = await ApiRequest(obj);

      if (response.flag === true) {
        setRawDataAPI(response.response_data.data);
        setTotalRow(response.response_data.row_count);
      }
      if (response.flag === false) {
        setValidatorErrorMsg(response.message);
        setErrorMsg('');
        setSuccessMsg('');
        
      }
      setloadingOpen(false);
      clickCancel();
    })();
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
    console.log(selected);
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

  const clickRegister = () => {
    if (!!name === false) {
      setNameError(true);
      setNameHelperText('Raw Material Name is required!');
    } else if (!!rawID === true) {
      (async () => {
        setloadingOpen(true);
        const data = { id: rawID, name, type, description, login_id: 20001 };
        const obj = { url: `${ApiPath.UpdateRaws}/${rawID}`, method: 'put', params: data };
        const response = await ApiRequest(obj);
        loadRawData();
       
        if (response.flag === true) {
          setSuccessMsg(response.response_data.message);
          setValidatorErrorMsg([]);
          setErrorMsg('');
          setloadingOpen(false);
        }
        if (response.flag === false) {
          setValidatorErrorMsg(response.message);
          setErrorMsg('');
          setSuccessMsg('');
          setloadingOpen(false);
        }
        setInsertMode('Register');
      })();
    } else {
      (async () => {
        setloadingOpen(true);
        const data = { id: rawID, name, type, description, login_id: 20001 };

        const obj = { url: ApiPath.storeRaws, method: 'post', params: data };
        const response = await ApiRequest(obj);
        loadRawData(); console.log(response)
        if (response.flag === true) {
          setSuccessMsg(response.response_data.message);
          setValidatorErrorMsg([]);
          setErrorMsg('');
          setloadingOpen(false);
        }
        if (response.flag === false) {
          setValidatorErrorMsg('');
          setErrorMsg(response.message);
          setSuccessMsg('');
          setloadingOpen(false);
        }
      })();
    }
    clickCancel();

    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  const clickCancel = () => {
    setName('');
    setType('');
    setDescription('');
    setRawID('');
    setSelected([]);
  };

  const editRaws = (e, id) => {
    (async () => {
      setloadingOpen(true);

      const obj = { url: `${ApiPath.EditRaws}/${id}`, method: 'post' };

      const response = await ApiRequest(obj);

      if (response.flag === true) {
        setName(response.response_data.data.name);
        setType(response.response_data.data.type);
        setDescription(response.response_data.data.description);
        setInsertMode('Update');
        setRawID(response.response_data.data.id);
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }
      if (response.flag === false) {
        setValidatorErrorMsg(response.message);
        setErrorMsg('');
        setSuccessMsg('');
      }
      setloadingOpen(false);
    })();
  };

  const deleteRaws = (id) => {
    (async () => {
      setloadingOpen(true);
      const data = { id, login_id: 20001 };

      const obj = { url: ApiPath.DeleteRaws, method: 'post', params: data };

      const response = await ApiRequest(obj);

      if (response.flag === true) {
        setSuccessMsg(response.response_data.message);
        setValidatorErrorMsg([]);
        setErrorMsg('');
        setloadingOpen(false);
      }
      if (response.flag === false) {
        setValidatorErrorMsg(response.message);
        setErrorMsg('');
        setSuccessMsg('');
        setloadingOpen(false);
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      clickCancel();
      loadRawData();
    })();
  };

  return (
    <Page title="Dashboard: RawMaterial">
      <Container>
      {loadingOpen && (<Loading loadingOpen={loadingOpen} />)}
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
        <Typography variant="h3" mb={5}>
          {t("Raw Material")}
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
        {/* <ToastContainer /> */}
        {rawDataAPI.length > 0 && (
          <Card>
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
                          <TableCell align="left">
                            <Tooltip title="delete">
                              <IconButton aria-label="delete" onClick={(e) => deleteRaws([id])}>
                                <Iconify icon="eva:trash-2-outline" />
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

            {/* <ToastContainer className="toast-position" /> */}

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={rawDataAPI.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        )}
      </Container>
    </Page>
  );
}
