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

          return (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700}} aria-label="spanning table">
                <TableHead sx={{ backgroundColor: '#42f58d'}}>
                  <TableRow>
                    <TableCell align="center" >{t('Date')}</TableCell>
                    <TableCell align="center">{t('Tailor Name')}</TableCell>
                    <TableCell align="center">{t('Total Quantity')}</TableCell>
                    <TableCell align="center">{t('Total Kyats')}</TableCell>
                    
                  </TableRow>
                </TableHead>
                <TableBody>
                <TableRow key={1}>
                    <TableCell align="center" >{props.date}</TableCell>
                    <TableCell align="center" >{props.tailor}</TableCell>
                    <TableCell align="center" >{props.qtyTotal}</TableCell>
                    <TableCell align="center" >{props.invoiceSubtotal}</TableCell>
                </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          );
        }
        