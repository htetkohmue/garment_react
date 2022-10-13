import { Link as RouterLink, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
// @mui
import { styled } from '@mui/material/styles';
import { Stack, Card, Link, Container, Typography, Alert } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Page from '../components/Page';
// sections
import { RegisterForm, DisplayForm } from '../sections/@dashboard/Supplier';
import ApiPath from '../common/common-api/api-path/ApiPath';
import { ApiRequest } from '../common/common-api/api-request/ApiRequest';

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

export default function Supplier() {
  const { t } = useTranslation();
  const defaultPerPage = ApiPath.defaultPerPage;
  const [successMsg, setSuccessMsg] = useState(''); // for success msg
  const [validatorErrorMsg, setValidatorErrorMsg] = useState([]); // for valid msg
  const [errorMsg, setErrorMsg] = useState(''); // for error msg
  const [supplierData, setSupplierData] = useState([]); // for values
  const [editSupplier, setEditSupplier] = useState(false); // for values

  useEffect(() => {
    (async () => {
      const data = {};
      const obj = { url: ApiPath.getSupplierData, method: 'get' };
      const response = await ApiRequest(obj);
      if (response.flag === true) {
        setSupplierData(response.response_data.data);
      }
    })();
  }, []);

  /** register function */
  const register = (values) => {
    (async () => {
      const data = {
        name_mm: values.nameMm,
        name_en: values.nameEn,
        phone_no: values.phoneNo,
        email: values.email,
        businessName: values.businessName,
        address: values.address,
        description: values.description,
        login_id: 1000,
      };
      const obj = { url: ApiPath.storeSupplierData, method: 'post', params: data };
      const response = await ApiRequest(obj);
      if (response.flag === true) {
        setSuccessMsg(response.response_data.message);
        supplierData.push(response.response_data.data);
        setValidatorErrorMsg([]);
        setErrorMsg('');
      }
      if (response.flag === false) {
        setValidatorErrorMsg(response.message);
        setErrorMsg('');
        setSuccessMsg('');
      }
    })();
  };
  /** update function */
  const update = (values) => {
    (async () => {
      const data = {
        id: editSupplier.id,
        name_mm: values.nameMm,
        name_en: values.nameEn,
        phone_no: values.phoneNo,
        email: values.email,
        businessName: values.businessName,
        address: values.address,
        description: values.description,
        login_id: 1000,
      };
      const obj = { url: ApiPath.editSupplierData, method: 'post', params: data };
      const response = await ApiRequest(obj);
      if (response.flag === true) {
        setSuccessMsg(response.response_data.message);
        response.response_data.data.no = editSupplier.no;
        supplierData[editSupplier.no - 1] = response.response_data.data;
        setEditSupplier(false);
        setValidatorErrorMsg([]);
        setErrorMsg('');
      }
      if (response.flag === false) {
        setValidatorErrorMsg(response.message);
        setErrorMsg('');
        setSuccessMsg('');
      }
    })();
  };

  /** remove function */
  const remove = (value) => {
    (async () => {
      const data = {
        id: value,
      };
      const obj = { url: ApiPath.removeSupplierData, method: 'post', params: data };
      const response = await ApiRequest(obj);
      if (response.flag === true) {
        setSuccessMsg(response.response_data.message);
        setSupplierData(
          supplierData.filter((row) => {
            return !(row.id === value);
          })
        );
        setValidatorErrorMsg([]);
        setErrorMsg('');
      }
      if (response.flag === false) {
        setValidatorErrorMsg(response.response_data.message);
        setErrorMsg('');
        setSuccessMsg('');
      }
    })();
  };

  return (
    <Page title="Supplier Register">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {!editSupplier && (
            <Typography variant="h3" gutterBottom>
              {t('Supplier Registration')}
            </Typography>
          )}
          {editSupplier && (
            <Typography variant="h3" gutterBottom>
              {t('Supplier Updating')}
            </Typography>
          )}
        </Stack>
        {/* <div style={{ backgroundColor: 'red', borderRadius: '10px' }}> */}
        {/* {validatorErrorMsg.map((data, index) => {
            return (
              <div key={index} style={{ color: 'white' }}>
                {data}
              </div>
            );
          })} */}
        {/* </div> */}
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
        {validatorErrorMsg.length === 1 && (
          <Alert variant="filled" severity="error">
            <b>
              {' '}
              {validatorErrorMsg.map((data, index) => {
                return (
                  <div key={index} style={{ color: 'white' }}>
                    {data}
                  </div>
                );
              })}
            </b>
          </Alert>
        )}
        {/* <div style={{ backgroundColor: 'red', borderRadius: '10px' }}>
          <h3 style={{ color: 'white' }}>{errorMsg}</h3>
        </div>
        <div style={{ backgroundColor: 'green', borderRadius: '10px' }}>
          <h3 style={{ color: 'white' }}>{successMsg}</h3>
        </div> */}
        <ContentStyle>
          <RegisterForm register={register} update={update} editSupplier={editSupplier} />
          <DisplayForm
            supplierData={supplierData}
            justifySelf="center"
            setEditSupplier={setEditSupplier}
            remove={remove}
            errorMsg={errorMsg}
          />
        </ContentStyle>
      </Container>
    </Page>
  );
}
