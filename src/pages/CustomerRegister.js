import { Container, Typography ,Alert} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import ApiPath from '../common/common-api/api-path/ApiPath';
import { ApiRequest } from '../common/common-api/api-request/ApiRequest';
import { ChangeDate } from '../common/change-date/ChangeDate';
import { FormData } from '../sections/@dashboard/CustomerRegister'
import Page from '../components/Page';

// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
    maxWidth: 600,
    margin: '5%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  }));
  
  const path = process.env.REACT_APP_BACKEND_URL;
  
  // ----------------------------------------------------------------------

function CustomerRegister() {
  const defaultPerPage = ApiPath.defaultPerPage;
  const [successMsg, setSuccessMsg] = useState(''); // for success msg
  const [validatorErrorMsg, setValidatorErrorMsg] = useState([]); // for valid msg
  const [errorMsg, setErrorMsg] = useState(''); // for error msg
  const [values, setValues] = useState([]); // for values
  const [edit, setEdit] = useState(false); // for values
  const [loadingOpen, setloadingOpen] = useState(false); // for values

    const [townshipAPI, settownshipAPI]     = useState(true);
    const [townshipName, setTownshipName]   = useState('');
    const [joinDate, setJoinDate]           = useState(()=>ChangeDate(new Date()));
    const [joinDateError, setJoinDateError] = useState('');
    const [joinDateErrorHelperText, setJoinDateErrorHelperText] = useState('');
    const [status, setStatus]   = useState('');
    const [customerId, setCustomerId]   = useState('');
    const [nameMm, setNameMm]   = useState('');
    const [nameEng, setNameEng]   = useState('');
    const [email, setEmail]   = useState('');   
    const [phone, setPhone]   = useState('');
    const [nrc, setNrc]   = useState('');
    const [address, setAddress]   = useState('');
    const [flag, setFlag]   = useState(''); 
    const [description, setDescription]   = useState(''); 
       
    
    useEffect(() => {
      (async () => {
         setloadingOpen(true);
        const obj = { url: ApiPath.getTownship, method: 'get' };
        const response = await ApiRequest(obj);
        if (response.flag === true) {
            settownshipAPI(response.response_data.data);
        }
      })();
    }, []);

    useEffect(() => {
      (async () => {
         setloadingOpen(true);
        const obj = { url: ApiPath.getCustomerId, method: 'get' };
        const response = await ApiRequest(obj);
        if (response.flag === true) {
          setCustomerId(response.response_data.data);
        }
      })();
    }, []);

    const saveCustomer = () =>{
      (async () => {            
        setloadingOpen(true);
        const data = { 
                      customer_id: customerId,
                      name_mm: nameMm,
                      name_en:  nameEng,
                      mail:  email,
                      phone_no:  phone,
                      nrc_no:  nrc,
                      addresses: address,
                      township_name: townshipName,
                      statuses: status,
                      join_date: ChangeDate(joinDate),
                      descriptions: description,
                      login_id: 20001 
                    };
        const obj = { url: ApiPath.storeCustomer, method: 'post',params: data };
        const response = await ApiRequest(obj);
  
        if (response.flag === true) {
          setSuccessMsg(response.response_data.message);
          setValidatorErrorMsg([]);
          setErrorMsg('');
          setEdit(false);
          setloadingOpen(false);
          clickCancel();
        }
        if (response.flag === false) {
          setErrorMsg(response.message);
          setValidatorErrorMsg([]);
          setSuccessMsg('');
          setloadingOpen(false);
        }
      })();
    }

    const clickCancel = () => {
      setCustomerId('');
      setNameEng('');
      setNameMm('');
      setEmail('');
      setPhone('');
      setNrc('');
      setAddress('');
      setStatus('');
      setDescription('');
    };

  return (
        <>
         <Page title="Customer Register">
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
          <Typography variant="h3" mb={5}> Customer Register</Typography>
          <ContentStyle>
            <FormData 
              townshipName={townshipName}
              handleChangeTownshipName={(e) => setTownshipName(e.target.value)} 
              customerId={customerId}
              handleChangecustomerId={(e) => setCustomerId(e.target.value)}
              nameMm={nameMm}
              handleChangenameMm={(e) => setNameMm(e.target.value)}
              nameEng={nameEng}
              handleChangenameEng={(e) => setNameEng(e.target.value)}
              email={email}
              handleChangeEmail={(e) => setEmail(e.target.value)}
              phone={phone}
              handleChangephone={(e) => setPhone(e.target.value)}
              nrc={nrc}
              handleChangenrc={(e) => setNrc(e.target.value)}
              address={address}
              handleChangeaddress={(e) => setAddress(e.target.value)}
              status={status}
              handleChangestatus={(e) => setStatus(e.target.value)}
              joinDate={joinDate}
              handleChangejoinDate={(e) => setJoinDate(e)}             
              joinDateError={joinDateError}
              joinDateErrorHelperText={joinDateErrorHelperText}
              description={description}              
              handleChangeDescription={(e) => setDescription(e.target.value)}
              saveCustomer={saveCustomer}
              clickCancel={clickCancel}
              townshipAPI={townshipAPI}
            />
            </ContentStyle>
        </Container>
        </Page>
        </>
  )
}

export default CustomerRegister
