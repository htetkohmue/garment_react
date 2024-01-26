import { useTranslation } from 'react-i18next';

// material
import { Stack
    , TextField
    , label
    , InputLabel 
    , FormControl
    , Select
    , MenuItem } from '@mui/material';    

    export default function FormLoad(props) {
        const { t } = useTranslation();
   
        return (
            <>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <FormControl halfwidth >
                    <InputLabel id="demo-simple-select-required-label">Product Name *</InputLabel>
                    <Select
                    sx={{ width: 260 }}
                    value={props.productName}
                    name={props.pName}
                    label={t("Product Name *")}
                    onChange={props.handleChangeproductName}
                    >
                        <MenuItem key="" value="---Select---" name="">--Select--</MenuItem>
                        {props.productNameData.length >0 &&
                            props.productNameData.map((i,ind) => {
                                return( <MenuItem key={ind} value={i.id} name={i.product_name}>{ i.product_name }</MenuItem>)
                            
                            })
                        }
                    </Select>
                </FormControl>
                <FormControl halfwidth >
                    <InputLabel id="demo-simple-select-required-label">Size *</InputLabel>
                    <Select
                    sx={{ width: 260 }}
                    labelId="demo-simple-select-required-label"
                    id="demo-simple-select-required"
                    value={props.productSize}
                    name={props.pSize}
                    label={t("Size *")}
                    onChange={props.handleChangeproductSize}
                    >
                        <MenuItem key="" value="" name="">--Select--</MenuItem>
                        {props.productSizeData.length >0 &&
                            props.productSizeData.map((i,ind) => {
                                return( <MenuItem key={ind} value={i.id} name={i.size}>{ i.size }</MenuItem>)
                            
                            })
                        }
                        
                    </Select>
                </FormControl>  
                </Stack>
            </>
        );
    }