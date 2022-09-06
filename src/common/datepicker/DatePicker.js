import { DesktopDatePicker, LocalizationProvider } from '@mui/lab'
import AdapterDateFns from '@mui/lab/modern/AdapterDateFns'
import { Stack,TextField } from '@mui/material'
import React, { useState } from 'react'

function DatePicker(props) {
   
  return (
    <>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker 
              label = {props.label}
              renderInput={(params)=>
                <TextField {...params} fullWidth
                  error={!!props.error === true && props.error}
                  helperText={props.helperText.length > 0 ? props.helperText : ""}
                />
              }
              value={props.value}
              onChange={props.onChange}
              inputFormat="yyyy-MM-dd"
            />
         
        </LocalizationProvider>
    </>
  )
}

export default DatePicker
