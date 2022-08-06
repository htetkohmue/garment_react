import { useState } from 'react';
// material
import { Container, Stack, Typography } from '@mui/material';
// components
import Page from '../components/Page';
// sections
import { ProductSearch } from '../sections/@dashboard/ProductList';
import ApiPath from '../common/common-api/api-path/ApiPath';
import {ApiRequest} from '../common/common-api/api-request/ApiRequest';


// ----------------------------------------------------------------------
export default function ProductList() {




  return (
  <Page title="Product List">
    <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Product List
        </Typography>
        <ProductSearch />

    </Container>
  </Page>
  );
}