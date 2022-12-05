import {
  Container
 , Stack
 ,Button
 , FormControl
 , InputLabel
 , Select
 , MenuItem
 , FormHelperText 
 ,TextField
 ,Alert
 ,Grid
 ,Card
 ,CardHeader
 ,Box
} from '@mui/material'
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import { borderBottom } from '@mui/system';


export default function ProductTable(props) {
  const { t } = useTranslation();

  function subtotal(items) {
    return items.map(({ total }) => total).reduce((sum, i) => sum + i, 0);
  }
  
  function qtytotal(items) {
    return items.map(({ productQty }) => Number(productQty)).reduce((sum, i) => sum + i, 0);
  }

  const invoiceSubtotal = subtotal(props.tableDatas);
  const qtyTotal = qtytotal(props.tableDatas); 
  
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700}} aria-label="spanning table">
        <TableHead style={{backgroundColor:'#80ccff'}}>
          <TableRow>
            <TableCell align="right" sx={{ borderBottom: 1 }}>{t('No')}</TableCell>
            <TableCell align="right"sx={{ borderBottom: 1 }}>{t('ID')}</TableCell>
            <TableCell align="right"sx={{ borderBottom: 1 }}>{t('Name')}</TableCell>
            <TableCell align="right"sx={{ borderBottom: 1 }}>{t('Size ID')}</TableCell>
            <TableCell align="right"sx={{ borderBottom: 1 }}>{t('Size')}</TableCell>
            <TableCell align="right"sx={{ borderBottom: 1 }}>{t('Quantity')}</TableCell>
            <TableCell align="right"sx={{ borderBottom: 1 }}>{t('Rate')}</TableCell>
            <TableCell align="right"sx={{ borderBottom: 1 }}> </TableCell>
            <TableCell align="right"sx={{ borderBottom: 1 }}>{t('Kyat')}</TableCell>
            <TableCell align="left"sx={{ borderBottom: 1 }}> </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.tableDatas.map((row,key) => (
            <TableRow key={key}>
              <TableCell align="right" sx={key===props.tableDatas.length-1?{borderBottom:1}:{}}>{key+1}</TableCell>
              <TableCell align="right" sx={key===props.tableDatas.length-1?{borderBottom:1}:{}}>{row.productName}</TableCell>
              <TableCell align="right" sx={key===props.tableDatas.length-1?{borderBottom:1}:{}}>{row.pName}</TableCell>
              <TableCell align="right" sx={key===props.tableDatas.length-1?{borderBottom:1}:{}}>{row.productSize}</TableCell>
              <TableCell align="right" sx={key===props.tableDatas.length-1?{borderBottom:1}:{}}>{row.pSize}</TableCell>
              <TableCell align="right" sx={key===props.tableDatas.length-1?{borderBottom:1}:{}}>{row.productQty}</TableCell>
              <TableCell align="right" sx={key===props.tableDatas.length-1?{borderBottom:1}:{}}>{row.productPrice}</TableCell>
              <TableCell align="right" sx={key===props.tableDatas.length-1?{borderBottom:1}:{}}>=</TableCell>
              <TableCell align="right"  sx={key===props.tableDatas.length-1?{borderBottom:1}:{}}>{row.total}</TableCell>
              <TableCell align="center" sx={key===props.tableDatas.length-1?{borderBottom:1}:{}}>
              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={(e) => props.handleDelete(row.tableId)}
              >Remove</Button>
          </TableCell>
            </TableRow>
          ))}
          <TableRow >
            <TableCell align="right" colSpan={5} style={{color:'bold'}}><b>{t('Total')}</b></TableCell>
            <TableCell align="right" ><b>{qtyTotal}</b></TableCell>
            <TableCell colSpan={2} > </TableCell>
            <TableCell align="right" ><b>{invoiceSubtotal}</b></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}