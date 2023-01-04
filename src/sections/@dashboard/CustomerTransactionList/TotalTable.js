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
        
        
        export default function TotalTable(props) {
          const { t } = useTranslation();

           function subtotal(items) {
              return items.map(({ totalAmt }) => totalAmt).reduce((sum, i) => sum + i, 0);
            }
            
            function qtytotal(items) {
              return items.map(({ totalQty }) => Number(totalQty)).reduce((sum, i) => sum + i, 0);
            }

            const invoiceSubtotal = subtotal(props.tableDatas);
            const qtyTotal = qtytotal(props.tableDatas);

          return (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700}} aria-label="spanning table">
                <TableHead sx={{ backgroundColor: '#42f58d'}}>
                  <TableRow>
                    <TableCell align="center" >{t('Date')}</TableCell>
                    <TableCell align="center">{t('Customer Name')}</TableCell>
                    <TableCell align="center">{t('Total Quantity')}</TableCell>
                    <TableCell align="center">{t('Total Kyats')}</TableCell>
                    
                  </TableRow>
                </TableHead>
                <TableBody>
                {props.tableDatas.map((row,key) => (
                <TableRow key={1}>
                    <TableCell align="center" >{row.tran_date}</TableCell>
                    <TableCell align="center" >{row.name_mm}</TableCell>
                    <TableCell align="center" >{row.totalQty}</TableCell>
                    <TableCell align="center" >{row.totalAmt}</TableCell>
                </TableRow>
                ))}
                <TableRow >
                <TableCell align="center" colSpan={2} style={{color:'bold'}}><b>{t('Total')}</b></TableCell>
                <TableCell align="center" ><b>{qtyTotal}</b></TableCell>
                <TableCell align="center" ><b>{invoiceSubtotal}</b></TableCell>
              </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          );
        }
        