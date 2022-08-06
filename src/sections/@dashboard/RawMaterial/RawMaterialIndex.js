import { Button, Container, Grid, Stack, Textarea, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';

function RawMaterialIndex(props) {
  return (
    <>
      <Container>
        <Stack spacing={3} style={{ width: 600,marginBottom:'20px' }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              required
              label="Raw Material Name"
              value={props.name}
              onChange={props.nameOnChange}
              error={props.nameError}
              helperText={props.nameHelperText}
            />
            <TextField fullWidth label="Type" value={props.type} onChange={(e) => props.setType(e.target.value)} />
          </Stack>

          <TextField
            label="Description"
            value={props.description}
            onChange={(e) => props.setDescription(e.target.value)}
          />

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Button fullWidth size="large" variant="contained" onClick={props.clickRegister}>
              {props.insertMode}
            </Button>

            <Button fullWidth size="large" variant="outlined" onClick={props.clickCancel}>
              Cancel
            </Button>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}

export default RawMaterialIndex;
