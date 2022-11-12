import { Container, Stack,Button, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import DatePicker from '../../../common/datepicker/DatePicker';


function FormData(props) {
    
    const {t} = useTranslation();
  return (
    <>
        <Container>
            <Stack spacing={3} style={{ marginBottom: '20px' }}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <DatePicker required
                        label={("From Date")}
                        value={props.fromDate}
                        onChange={props.handleChangeFromDate}
                        error={props.fromDateError}
                        helperText={props.fromDateErrorHelperText}
                    />
                   
                    <DatePicker required
                        label='To Date'
                        value={props.toDate}
                        onChange={props.handleChangeToDate}
                        error={props.toDateError}
                        helperText={props.toDateErrorHelperText}
                    />
                    
                </Stack>
                

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <FormControl fullWidth >
                    <InputLabel id="demo-simple-select-required-label">{t("Supplier Name")}</InputLabel>
                    <Select
                    labelId="demo-simple-select-required-label"
                    id="demo-simple-select-required"
                    value={props.supplierName}
                    label="Supplier Name *"
                    onChange={props.handleChangeSupplierName}
                    >
                       {
                            props.supplierAPI.length > 0 &&
                            props.supplierAPI.map((item,index)=>{
                                return(
                                    <MenuItem key={index} value={item.id}>{item.name_en}</MenuItem>
                                )
                            })
                        }
                    </Select>
                </FormControl>

                <FormControl fullWidth >
                    <InputLabel id="demo-simple-select-required-label">{t("Raw Material Name")}</InputLabel>
                    <Select
                    labelId="demo-simple-select-required-label"
                    id="demo-simple-select-required"
                    value={props.materialName}
                    label={t("Raw Material Name")}
                    onChange={props.handleChangeMaterialName}
                    >
                    {
                        props.materialAPI.length > 0 &&
                        props.materialAPI.map((item,index)=>{
                            return(
                                <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                            )
                        })
                    }
                    </Select>
                    {/* <FormHelperText>Required</FormHelperText> */}
                </FormControl>
                </Stack>
            </Stack>

            <Stack spacing={3} style={{ marginBottom: '20px' }} justifyContent="center" alignItems="center">
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <Button fullWidth size="large" variant="contained" onClick={props.clickSearch}>
                        {t("Search")}
                    </Button>

                    {/* <Button fullWidth size="large" variant="outlined" onClick={props.clickCancel}>
                    Cancel
                    </Button> */}
                </Stack>
            </Stack>
      </Container>
    </>
  )
}

export default FormData
