import { Container, Typography ,Alert} from '@mui/material'
import React, { useEffect, useState } from 'react'
import Page from '../components/Page';

  function CustomerTransactionList() {
    const [successMsg, setSuccessMsg] = useState(''); // for success msg
    const [errorMsg, setErrorMsg] = useState(''); // for error msg
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
                <Typography variant="h3" mb={5}> Customer Transaction List</Typography>
            </Container>
        </Page>
    )
  }

  export default CustomerTransactionList