import { Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ApiPath from '../common/common-api/api-path/ApiPath';
import { ApiRequest } from '../common/common-api/api-request/ApiRequest';
import { ChangeDate } from '../common/change-date/ChangeDate';
import { FormData } from '../sections/@dashboard/SupplierTransactionList'

function SupplierTransactionList() {
    const [supplierName, setSupplierName]   = useState('');
    const [materialName, setMaterialName]   = useState('');
    const [fromDate, setFromDate]           = useState(()=>ChangeDate(new Date()));
    const [toDate, setToDate]               = useState(()=>ChangeDate(new Date()));
    const [fromDateError, setFromDateError] = useState('');
    const [fromDateErrorHelperText, setFromDateErrorHelperText] = useState('');
    const [toDateError, setToDateError]     = useState('');
    const [toDateErrorHelperText, setToDateErrorHelperText] = useState('');
    const [flag, setFlag]                   = useState(true);
    const [materialAPI, setMaterialAPI]     = useState(true);
    
    useEffect(() => {
      loadRawData();
    }, []);
    const loadRawData = () => {
      (async () => {
        // setloadingOpen(true);
        const obj = { url: ApiPath.searchRaws, method: 'get' };
        const response = await ApiRequest(obj);

        if (response.flag === true) {console.log(response.response_data.data)
            setMaterialAPI(response.response_data.data);
        }
        if (response.flag === false) {console.log(response)
          // setValidatorErrorMsg(response.message);
          // setErrorMsg('');
          // setSuccessMsg('');
          // setloadingOpen(false);
        }
        // clickCancel();
      })();
    };

    const clickSearch = () =>{
      // console.log(ChangeDate(fromDate));
      // console.log(toDate);
      console.log(materialName)
   
      
        if (!!fromDate === false) {
          setFromDateError(true);
          setFromDateErrorHelperText('From Date is required!');
          setFlag(false);
        }

        if (!!toDate === false) {
          setToDateError(true);
          setToDateErrorHelperText('To Date is required!');
          setFlag(false);
        }

        if(flag){
          (async () => {
           // setloadingOpen(true);
            const data = { 
                          fromDate: ChangeDate(fromDate), 
                          toDate:ChangeDate(toDate), 
                          raw_id:materialName, 
                          login_id: 20001 
                        };
            const obj = { url: ApiPath.searchSupplierTransaction, method: 'post',params: data };
            console.log(obj)
            const response = await ApiRequest(obj);
      
            if (response.flag === true) {
             console.log("object")
            }
            if (response.flag === false) {console.log("object")
              // setValidatorErrorMsg(response.message);
              // setErrorMsg('');
              // setSuccessMsg('');
              // setloadingOpen(false);
            }
            // clickCancel();
          })();
        }
    }


  return (
        <>
          <Typography variant="h3" mb={5}>Supplier Transaction List</Typography>
            <FormData 
              supplierName={supplierName}
              materialName={materialName}
              fromDate={fromDate}
              toDate={toDate}
              handleChangeSupplierName={(e) => setSupplierName(e.target.value)}
              handleChangeMaterialName={(e) => setMaterialName(e.target.value)}
              handleChangeFromDate={(e) => setFromDate(e)}
              handleChangeToDate={(e) => setToDate(e)}
              fromDateError={fromDateError}
              fromDateErrorHelperText={fromDateErrorHelperText}
              toDateError={toDateError}
              toDateErrorHelperText={toDateErrorHelperText}
              clickSearch={clickSearch}
              materialAPI={materialAPI}
            />
        </>
  )
}

export default SupplierTransactionList