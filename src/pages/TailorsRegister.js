import { Link as RouterLink, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
// @mui
import { styled } from '@mui/material/styles';
import { Stack, Card, Link, Container, Typography ,Alert} from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Page from '../components/Page';
// sections
import { TailorsRegisterForm, TailorsEditForm,Loading } from '../sections/@dashboard/TailorRegister';
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

export default function TailorsRegister() {
  const { t } = useTranslation();
  const defaultPerPage = ApiPath.defaultPerPage;
  const [successMsg, setSuccessMsg] = useState(''); // for success msg
  const [validatorErrorMsg, setValidatorErrorMsg] = useState([]); // for valid msg
  const [errorMsg, setErrorMsg] = useState(''); // for error msg
  const [values, setValues] = useState([]); // for values
  const [edit, setEdit] = useState(false); // for values
  const [loadingOpen, setloadingOpen] = useState(false); // for values

  /** edit get data function */
  const { id, setId } = useParams();
  useEffect(() => {
    (async () => {
      const data = {};
      const apiPath = ApiPath.editTailorData;
      const obj = { url: `${apiPath}/${id}`, method: 'get', params: data };
      const response = await ApiRequest(obj);
      if (response.flag === true) {
        setValues({
          tailors_id: response.response_data.data.tailor_id,
          englishName: response.response_data.data.name_mm,
          myanmarName: response.response_data.data.name_en,
          phone: response.response_data.data.phone_no,
          nrcNo: response.response_data.data.nrc_no,
          address: response.response_data.data.address,
          description: response.response_data.data.description,
        });
        setEdit(true);
        setloadingOpen(false);
      }
      if (id != null && response.flag === false) {
        setErrorMsg(response.message);
        setSuccessMsg('');
        setValidatorErrorMsg([]);
      }
    })();
  }, []);

  /** register function */
  const register = (values) => {
    (async () => {
      const data = {
        tailor_id: values.tailors_id,
        name_mm: values.englishName,
        name_en: values.myanmarName,
        phone_no: values.phone,
        nrc_no: values.nrcNo,
        address: values.address,
        description: values.description,
        login_id: 10001,
        language:localStorage.getItem('selectedLanguageName')
      };
      const obj = { url: ApiPath.storeTailorData, method: 'post', params: data };
      const response = await ApiRequest(obj);
      if (response.flag === true) {
        setSuccessMsg(response.response_data.message);
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
        tailor_id: values.tailors_id,
        name_mm: values.englishName,
        name_en: values.myanmarName,
        phone_no: values.phone,
        nrc_no: values.nrcNo,
        address: values.address,
        description: values.description,
        login_id: 10001,
        language:localStorage.getItem('selectedLanguageName')
      };
      const apiPath = ApiPath.updateTailorData;
      const obj = { url: `${apiPath}/${id}`, method: 'put', params: data };
      const response = await ApiRequest(obj);
      if (response.flag === true) {
        setSuccessMsg(response.response_data.message);
        setValidatorErrorMsg([]);
        setErrorMsg('');
        setEdit(false);
        setloadingOpen(false);
      }
      if (response.flag === false) {
        setErrorMsg(response.message);
        setValidatorErrorMsg([]);
        setSuccessMsg('');
      }
    })();
  };
  return (
    <Page title="Register">
      <Container>
      {loadingOpen && (<Loading loadingOpen={loadingOpen} />)}
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {!edit && (
            <Typography variant="h3" gutterBottom>
              {t('Tailor Registration')}
            </Typography>
          )}
          {edit && (
            <Typography variant="h3" gutterBottom>
             {t('Tailor Updating')}
            </Typography>
          )}
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
        <ContentStyle>
          {!edit && <TailorsRegisterForm register={register} />}
          {edit && <TailorsEditForm update={update} values={values} />}
        </ContentStyle>
      </Container>
    </Page>
  );
}
