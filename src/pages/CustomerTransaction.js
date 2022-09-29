import { Container, Typography ,Alert, Stack} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Page from '../components/Page';
// ----------------------------------------------
import { FilterData,ProductData } from '../sections/@dashboard/CustomerTransaction'
import { ChangeDate } from '../common/ChangeDate';

// --------------------------------------------------------------------
const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 800,
  margin: '5%',
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
          
            <ContentStyle>
            <Stack spacing={4}>
            <Stack spacing={2}>
              <Divider textAlign="left">
                <Chip label="Tailor Data" />
              </Divider>
              <FilterData 
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
           
          </Container>
        </Page>
    )
  }

  export default CustomerTransaction