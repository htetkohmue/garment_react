import { Container, Typography ,Alert, Stack} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import { border } from '@mui/system';
import Page from '../components/Page';
// ----------------------------------------------
import { CustomerData,ProductData } from '../sections/@dashboard/CustomerTransaction'
import { ChangeDate } from '../common/ChangeDate';

// --------------------------------------------------------------------
const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 450,
  margin: '3%',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
}));

const path = process.env.REACT_APP_BACKEND_URL;

// ----------------------------------------------------------------------

  function CustomerTransaction() {
    const [successMsg, setSuccessMsg] = useState(''); // for success msg
    const [errorMsg, setErrorMsg] = useState(''); // for error msg
    const [date, setDate] = useState(''); // for error msg
    const [dateError, setDateError] = useState('');
    const [dateErrorHelperText, setDateErrorHelperText] = useState('');

    const register = ()=>{
      setSuccessMsg('');
    }

    // const chosenDate = (date) => {
    //   setDate(ChangeDate(date))
    // }

    return (
        <Page title="Customer Tranction">
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
            <Typography variant="h3" mb={5}> Customer Transaction</Typography> 
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>      
              <ContentStyle>
                <Stack spacing={4}>
                  <Stack spacing={2}>
                    <Divider textAlign="left">
                      <Chip label="Tailor Data" />
                    </Divider>
                    <CustomerData 
                      register={register}
                      date={date}  
                      handleChangeDate={(e) => setDate(e)} 
                      dateError={dateError}
                      dateErrorHelperText={dateErrorHelperText}
                        />
                    </Stack>
                    <Stack spacing={2}>
                    <Divider textAlign="left">
                      <Chip label="Product Data" />
                    </Divider>
                      <ProductData />
                  </Stack>
                </Stack>  
              </ContentStyle>
                <Stack  alignItems="center" style={{border: "1px solid #919eab"}} maxHeight="30%">                  
                <CustomerData 
                      register={register}
                      date={date}  
                      handleChangeDate={(e) => setDate(e)} 
                      dateError={dateError}
                      dateErrorHelperText={dateErrorHelperText}
                        />
                        <CustomerData 
                      register={register}
                      date={date}  
                      handleChangeDate={(e) => setDate(e)} 
                      dateError={dateError}
                      dateErrorHelperText={dateErrorHelperText}
                        />
                        <CustomerData 
                      register={register}
                      date={date}  
                      handleChangeDate={(e) => setDate(e)} 
                      dateError={dateError}
                      dateErrorHelperText={dateErrorHelperText}
                        />
                         <CustomerData 
                      register={register}
                      date={date}  
                      handleChangeDate={(e) => setDate(e)} 
                      dateError={dateError}
                      dateErrorHelperText={dateErrorHelperText}
                        />
                         <CustomerData 
                      register={register}
                      date={date}  
                      handleChangeDate={(e) => setDate(e)} 
                      dateError={dateError}
                      dateErrorHelperText={dateErrorHelperText}
                        />
                       
                </Stack>
            </Stack>           
          </Container>
        </Page>
    )
  }

  export default CustomerTransaction