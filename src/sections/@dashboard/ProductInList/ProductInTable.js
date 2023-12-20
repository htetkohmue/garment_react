import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText, Tooltip} from '@mui/material'
import * as React from 'react';
import { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
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
import Iconify from '../../../components/Iconify';


export default function ProductInTable(props) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const ref                 = useRef(null);
  const [open, setOpen] = useState(false);
  const [editCusTran, seteditCusTran] = useState([]);
  const [deleteCusTran, setdeleteCusTran] = useState([]);
  const [deleteId, setDeleteId] = useState([]);
  const [Id, setId] = useState([]);
 
  return (
    <TableContainer component={Paper}>
      <Table>
      <TableRow> 
          <TableCell align="left" rowSpan={4}>{props.tableDatas.date}</TableCell>
          <TableCell align="left">{props.tableDatas.tailor_id} - {props.tableDatas.name_mm}</TableCell>
          <TableCell align="right" width="4%">
            
          <Tooltip title="edit">
            {/* continue */}
              <IconButton component={RouterLink} to={`/dashboard/product-in-register/${props.tableDatas.id}`}>
                <Iconify icon="akar-icons:edit" />
              </IconButton>
            </Tooltip>
          </TableCell>
          <TableCell align="right" width="4%">
          <Tooltip title="delete">
              <IconButton aria-label="delete" onClick={(event) =>props.deletePinTran(props.tableDatas.id)}>
                <Iconify icon="eva:trash-2-outline" />
              </IconButton>
            </Tooltip>
          </TableCell>
         
      </TableRow>
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
            {/* <TableCell align="left"sx={{ borderBottom: 1 }}>{t('Action')} </TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.tableDatas.product_tran_data.map((row,key) => (
            <TableRow key={key}>
              <TableCell align="right" sx={key===props.tableDatas.length-1?{borderBottom:1}:{}}>{key+1}</TableCell>
              <TableCell align="right" sx={key===props.tableDatas.length-1?{borderBottom:1}:{}}>{row.product_id}</TableCell>
              <TableCell align="right" sx={key===props.tableDatas.length-1?{borderBottom:1}:{}}>{row.product_name}</TableCell>
              <TableCell align="right" sx={key===props.tableDatas.length-1?{borderBottom:1}:{}}>{row.size_id}</TableCell>
              <TableCell align="right" sx={key===props.tableDatas.length-1?{borderBottom:1}:{}}>{row.size_name}</TableCell>
              <TableCell align="right" sx={key===props.tableDatas.length-1?{borderBottom:1}:{}}>{row.qty}</TableCell>
              <TableCell align="right" sx={key===props.tableDatas.length-1?{borderBottom:1}:{}}>{row.price}</TableCell>
              <TableCell align="right" sx={key===props.tableDatas.length-1?{borderBottom:1}:{}}>=</TableCell>
              <TableCell align="right"  sx={key===props.tableDatas.length-1?{borderBottom:1}:{}}>{row.amount}</TableCell>
              {/* <TableCell align="center"  sx={key===props.tableDatas.length-1?{borderBottom:1}:{}}>
                <IconButton ref={ref} onClick={() => setIsOpen(true)}>
                  <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
                </IconButton>
                <Menu
                  open={isOpen}
                  anchorEl={ref.current}
                  onClose={() => setIsOpen(false)}
                  PaperProps={{
                    sx: { width: 200, maxWidth: '100%' },
                  }}
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                  <MenuItem sx={{ color: 'text.secondary' }}>
                    <ListItemIcon>
                      <Iconify icon="eva:trash-2-outline" width={24} height={24} />
                    </ListItemIcon>
                    <ListItemText primary="Delete"  onClick={(e) => props.handleDelete(row.customer_transaction_id)} primaryTypographyProps={{ variant: 'body2' }} />
                  </MenuItem>
                  <MenuItem component={RouterLink} to={`/dashboard/customers-transaction/${Id}`} sx={{ color: 'text.secondary' }}>
                    <ListItemIcon>
                      <Iconify icon="eva:edit-fill" width={24} height={24} />
                    </ListItemIcon>
                    <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
                  </MenuItem>
                </Menu>              
              </TableCell> */}
            </TableRow>
          ))}
          <TableRow >
            <TableCell align="right" colSpan={5} style={{color:'bold'}}><b>{t('Total')}</b></TableCell>
            <TableCell align="right" ><b>{props.tableDatas.totalQty}</b></TableCell>
            <TableCell colSpan={2} > </TableCell>
            <TableCell align="right" ><b>{props.tableDatas.totalAmt}</b></TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <TableRow>
        <TableCell>{props.tableDatas.voucher_no}</TableCell>
        <TableCell align="right">
          <Tooltip title="Print">
            <IconButton aria-label="Print" >
              <Iconify icon="oi:print" />
            </IconButton>
        </Tooltip>
        </TableCell>
      </TableRow>
      </Table>
    </TableContainer>
  );
}
