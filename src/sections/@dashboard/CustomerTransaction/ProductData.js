import { useTranslation } from 'react-i18next';

// material
import { Stack
    , TextField
    , label
    , InputLabel 
    , FormControl
    , Select
    , MenuItem } from '@mui/material';    

    export default function ProductData(props) {
        const { t } = useTranslation();
   
        return (
            <>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <FormControl fullWidth >
                    <InputLabel id="demo-simple-select-required-label">Product Name *</InputLabel>
                    <Select
                    value={props.productName}
                    label={t("Product Name *")}
                    onChange={props.handleChangeproductName}
                    >
                        {props.productNameData.length >0 &&
                            props.productNameData.map((i,ind) => {
                                return( <MenuItem key={ind} value={i.id}>{ i.product_name }</MenuItem>)
                            
                            })
                        }
                    </Select>
                </FormControl>
                <FormControl fullWidth >
                    <InputLabel id="demo-simple-select-required-label">Size *</InputLabel>
                    <Select
                    labelId="demo-simple-select-required-label"
                    id="demo-simple-select-required"
                    value={props.productSize}
                    label={t("Size *")}
                    onChange={props.handleChangeproductSize}
                    >
                        {props.productSizeData.length >0 &&
                            props.productSizeData.map((i,ind) => {
                                return( <MenuItem key={ind} value={i.id}>{ i.size }</MenuItem>)
                            
                            })
                        }
                        
                    </Select>
                </FormControl>
                    <TextField
                    fullWidth
                    label={t("Quantity *")}
                    value={props.productQty}
                    onChange={props.changeProductQty}
                />  
                <TextField
                    fullWidth
                    label={t("Price *")}
                    value={props.productPrice}
                    onChange={props.changeProductPrice}
                />  
                </Stack>
            </>
        );
    }