import { Button, Container, Grid, Stack, Textarea, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

function RawMaterialIndex(props) {
  const {t} = useTranslation();
  return (
    <>
      <Container>
        <Stack spacing={3} style={{ marginBottom: '20px' }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              required
              label={t("Raw Material Name")}
              value={props.name}
              onChange={props.nameOnChange}
              error={props.nameError}
              helperText={props.nameHelperText}
            />
            <TextField fullWidth label={t("Types")} value={props.type} onChange={(e) => props.setType(e.target.value)} />
          </Stack>

          <TextField
            label={t("Description")}
            value={props.description}
            onChange={(e) => props.setDescription(e.target.value)}
          />
        </Stack>

        <Stack spacing={3} style={{ marginBottom: '20px' }} justifyContent="center" alignItems="center">
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
            <Button fullWidth size="large" variant="contained" onClick={props.clickRegister}>
              {t(props.insertMode)}
            </Button>
          
            {/* <Button fullWidth size="large" variant="outlined" onClick={props.clickCancel}>
              Cancel
            </Button> */}
          </Stack>
        </Stack>
      </Container>
    </>
  );
}

export default RawMaterialIndex;
