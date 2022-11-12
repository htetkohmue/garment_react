import {
  Card,
  Checkbox,
  Table,
  TableCell,
  TablePagination,
  TableRow,
  Typography,
  TableContainer,
  TableBody,
  Stack,
  Button,
  Tooltip,
  IconButton,
  Alert,
  Container,
} from '@mui/material';
import { filter } from 'lodash';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import ApiPath from '../common/common-api/api-path/ApiPath';
import { ApiRequest } from '../common/common-api/api-request/ApiRequest';
import SearchNotFound from '../components/SearchNotFound';
import { ChangeDate } from '../common/ChangeDate';
import {
  FormData,
  SupplierTransactionListToolbar,
  SupplierTransactionListHead,
} from '../sections/@dashboard/SupplierTransactionList';
import Scrollbar from '../components/Scrollbar';
import Page from '../components/Page';
import Iconify from '../components/Iconify';

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

function SupplierTransactionList() {
  const { t } = useTranslation();
  const [supplierName, setSupplierName] = useState('');
  const [materialName, setMaterialName] = useState('');
  const [fromDate, setFromDate] = useState(() => ChangeDate(new Date()));
  const [toDate, setToDate] = useState(() => ChangeDate(new Date()));
  const [fromDateError, setFromDateError] = useState('');
  const [fromDateErrorHelperText, setFromDateErrorHelperText] = useState('');
  const [toDateError, setToDateError] = useState('');
  const [toDateErrorHelperText, setToDateErrorHelperText] = useState('');
  const [flag, setFlag] = useState(true);
  const [materialAPI, setMaterialAPI] = useState([]);
  const [supplierAPI, setSupplierAPI] = useState([]);
  const [resultAPI, setResultAPI] = useState([]);
  const [loadingOpen, setloadingOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState(''); // for success msg
  const [errorMsg, setErrorMsg] = useState(); // for success msg
  const [validatorErrorMsg, setValidatorErrorMsg] = useState([]);

  // table
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('id');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalRow, setTotalRow] = useState();
  // const [totalQty, setTotalQty] = useState(0);
  // const [allTotalAmount, setAllTotalAmount] = useState(0);

  let totalQty = 0;
  let allTotalAmount = 0;

  const TABLE_HEAD = [
    { id: 'id', label: 'No', alignRight: false },
    { id: 'date', label: 'Date', alignRight: false },
    { id: 'supplierNameEN', label: 'Supplier Name', alignRight: false },
    { id: 'rawName', label: 'Raw Material Name', alignRight: false },
    { id: 'price', label: 'Price', alignRight: false },
    { id: 'qty', label: 'Qty', alignRight: false },
    { id: 'totalAmount', label: 'Total Amount', alignRight: false },
    { id: 'action', label: 'Action', alignRight: false },
  ];

  const filteredData = applySortFilter(resultAPI, getComparator(order, orderBy), filterName);
  const isDataNotFound = filteredData.length === 0;
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - resultAPI.length) : 0;

  useEffect(() => {
    loadRawData();
    loadSupplierData();
  }, []);
  const loadRawData = () => {
    (async () => {
      // setloadingOpen(true);
      const obj = { url: ApiPath.searchRaws, method: 'get' };
      const response = await ApiRequest(obj);

      if (response.flag === true) {
        // console.log(response);
        setMaterialAPI(response.response_data.data);
      }
      if (response.flag === false) {
        // console.log(response)
        // setValidatorErrorMsg(response.message);
        // setErrorMsg('');
        // setSuccessMsg('');
        // setloadingOpen(false);
      }
      // clickCancel();
    })();
  };

  const loadSupplierData = () => {
    (async () => {
      // setloadingOpen(true);
      const obj = { url: ApiPath.getSupplierData, method: 'get' };
      const response = await ApiRequest(obj);
      if (response.flag === true) {
        setSupplierAPI(response.response_data.data);
      }
      if (response.flag === false) {
        // console.log(response)
        // setValidatorErrorMsg(response.message);
        // setErrorMsg('');
        // setSuccessMsg('');
        // setloadingOpen(false);
      }
      // clickCancel();
    })();
  };

  const clickSearch = () => {
    setFromDateError('');
    setFromDateErrorHelperText('');
    setToDateError('');
    setFlag(true);

    setToDateErrorHelperText('');
    if (!!fromDate === false) {
      setFromDateError(true);
      setFromDateErrorHelperText('From Date is required!');
      setFlag(false);
    }

    if (!!toDate === false) {
      setToDateError(true);
      setToDateErrorHelperText('To Date is required!');
      setFlag(false);
    }

    if (flag) {
      (async () => {
        // setloadingOpen(true);
        const data = {
          fromDate: ChangeDate(fromDate),
          toDate: ChangeDate(toDate),
          raw_id: materialName,
          supplier_id: supplierName,
          login_id: 20001,
        };
        // console.log(typeof data.fromDate)
        const obj = { url: ApiPath.searchSupplierTransaction, method: 'post', params: data };
        // console.log(obj);
        const response = await ApiRequest(obj);
        // console.log(response)
        if (response.flag === true) {
          setResultAPI(response.response_data.data);
        }
        if (response.flag === false) {
          console.log('object');
          // setValidatorErrorMsg(response.message);
          // setErrorMsg('');
          // setSuccessMsg('');
          // setloadingOpen(false);
        }
        // clickCancel();
      })();
    }
  };

  // tabel
  // const handleFilterByName = (event) => {
  //   setFilterName(event.target.value);
  // };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = resultAPI.map((n) => n.id);
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

  const clickDelete = () => {
    console.log(typeof selected);
    (async () => {
      setloadingOpen(true);
      const data = { id: selected, login_id: 20001 };

      const obj = { url: ApiPath.deleteSupplierTransaction, method: 'post', params: data };

      const response = await ApiRequest(obj);
      // console.log(response);
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
      clickSearch();
    })();
  };

  const clickEdit = (e, id) => {
    console.log(id);
    // (async () => {
    //   setloadingOpen(true);

    //   const obj = { url: `${ApiPath.EditRaws}/${id}`, method: 'post' };

    //   const response = await ApiRequest(obj);

    //   if (response.flag === true) {
    //     setName(response.response_data.data.name);
    //     setType(response.response_data.data.type);
    //     setDescription(response.response_data.data.description);
    //     setInsertMode('Update');
    //     setRawID(response.response_data.data.id);
    //     window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    //   }
    //   if (response.flag === false) {
    //     setValidatorErrorMsg(response.message);
    //     setErrorMsg('');
    //     setSuccessMsg('');
    //     setloadingOpen(false);
    //   }
    // })();
  };

  return (
    <Page title="Supplier Transaction List">
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
        <Typography variant="h3" mb={5}>
          {t('Supplier Transaction List')}
        </Typography>
        <FormData
          supplierName={supplierName}
          materialName={materialName}
          fromDate={fromDate}
          toDate={toDate}
          handleChangeSupplierName={(e) => setSupplierName(e.target.value)}
          handleChangeMaterialName={(e) => setMaterialName(e.target.value)}
          handleChangeFromDate={(e) => setFromDate(ChangeDate(e))}
          handleChangeToDate={(e) => setToDate(ChangeDate(e))}
          fromDateError={fromDateError}
          fromDateErrorHelperText={fromDateErrorHelperText}
          toDateError={toDateError}
          toDateErrorHelperText={toDateErrorHelperText}
          clickSearch={clickSearch}
          materialAPI={materialAPI}
          supplierAPI={supplierAPI}
        />

        {resultAPI.length > 0 && (
          <>
            <Card>
              {/* <SupplierTransactionListToolbar
                posts={resultAPI}
                rawIDs={selected}
              // delete={deleteRaws}
                numSelected={selected.length}
                filterName={filterName}
                onFilterName={handleFilterByName}
              /> */}

              <Scrollbar>
                <TableContainer sx={{ minWidth: 800 }}>
                  <Table>
                    <SupplierTransactionListHead
                      order={order}
                      orderBy={orderBy}
                      headLabel={TABLE_HEAD}
                      rowCount={resultAPI.length}
                      numSelected={selected.length}
                      onRequestSort={handleRequestSort}
                      onSelectAllClick={handleSelectAllClick}
                    />
                    <TableBody>
                      {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                        const { key, id, date, supplierNameEN, rawName, price, qty, totalAmount, action } = row;
                        const isItemSelected = selected.indexOf(id) !== -1;

                        totalQty += row.qty;
                        allTotalAmount += row.totalAmount;
                        return (
                          <>
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
                              <TableCell align="left">{date}</TableCell>
                              <TableCell align="left">{supplierNameEN}</TableCell>
                              <TableCell align="left">{rawName}</TableCell>
                              <TableCell align="left">{price}</TableCell>
                              <TableCell align="left">{qty}</TableCell>
                              <TableCell align="right">{totalAmount}</TableCell>
                              <TableCell align="left">
                                <Tooltip title="edit">
                                  <IconButton aria-label="edit" onClick={(e) => clickEdit(e, id)}>
                                    <Iconify icon="akar-icons:edit" />
                                  </IconButton>
                                </Tooltip>
                              </TableCell>
                            </TableRow>
                          </>
                        );
                      })}
                      <TableRow>
                        <TableCell colSpan={6}>
                          <Typography align="center" fontWeight={'bold'}>
                            {t('Total')}
                          </Typography>
                        </TableCell>
                        <TableCell>{totalQty}</TableCell>
                        <TableCell>{allTotalAmount}</TableCell>
                      </TableRow>
                      {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                          <TableCell colSpan={8} />
                        </TableRow>
                      )}
                    </TableBody>

                    {/* {isDataNotFound && (
                      <TableBody>
                        <TableRow>
                          <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                            <SearchNotFound searchQuery={"data"} />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    )} */}
                  </Table>
                </TableContainer>
              </Scrollbar>

              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={resultAPI.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Card>

            <Stack
              spacing={2}
              direction={{ xs: 'column', sm: 'row' }}
              style={{ marginTop: '20px' }}
              justifyContent="center"
              alignItems="center"
            >
              {/* <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}> */}
              <Button size="large" variant="outlined" color="error" onClick={(e) => clickDelete()}>
                {t('Delete')}
              </Button>
            </Stack>
          </>
        )}

        <Stack
          spacing={2}
          direction={{ xs: 'column', sm: 'row' }}
          style={{ marginTop: '20px' }}
          justifyContent="center"
          alignItems="center"
        >
          {isDataNotFound && <SearchNotFound searchQuery={'Supplier Transaction'} />}
        </Stack>
      </Container>
    </Page>
  );
}

export default SupplierTransactionList;
