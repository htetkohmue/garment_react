import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText, Tooltip, Button} from '@mui/material'
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


export default function DataTable(props) {
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
      <Table sx={{ minWidth: 700}} aria-label="spanning table" >
        <TableHead style={{backgroundColor:'#80ccff'}}>
          <TableRow>
            <TableCell align="right" sx={{ borderBottom: 1 }}>{t('No')}</TableCell>
            <TableCell align="right"sx={{ borderBottom: 1 }}>{t('Date')}</TableCell>
            <TableCell align="right"sx={{ borderBottom: 1 }}>{t('Code')}</TableCell>
            <TableCell align="right"sx={{ borderBottom: 1 }}>{t('Name')}</TableCell>
            <TableCell align="right"sx={{ borderBottom: 1 }}>{t('Size')}</TableCell>
            <TableCell align="right"sx={{ borderBottom: 1 }}>{t('Cal Type')}</TableCell>
            <TableCell align="right"sx={{ borderBottom: 1 }}>{t('Raw Name')}</TableCell>
            <TableCell align="right"sx={{ borderBottom: 1 }}>{t('out qty')}</TableCell>
            <TableCell align="right"sx={{ borderBottom: 1 }}>{t('in qty')}</TableCell>
            <TableCell align="right"sx={{ borderBottom: 1 }}>{t('left qty')}</TableCell>
            <TableCell align="center"sx={{ borderBottom: 1 }} colSpan={2}>{t('Action')}</TableCell>
            {/* <TableCell align="right"sx={{ borderBottom: 1 }}>{t('Action')}</TableCell> */}
            <TableCell align="right"sx={{ borderBottom: 1 }}>{t('Remark')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((row,key) => (
            <TableRow key={key}>
                <TableCell align="center">{row.no}</TableCell>
                <TableCell align="center">{row.date}</TableCell>
                <TableCell align="center">{row.code}</TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.size}</TableCell>
                <TableCell align="center">{row.rawQty}{row.rawCombine}x{row.productPerRaw}</TableCell>
                <TableCell align="center">{row.raw1},{row.raw2}</TableCell>
                <TableCell align="center">{row.outQty}</TableCell>
                <TableCell align="center">{row.inQty}</TableCell>
                <TableCell align="center">{row.leftQty}</TableCell>
                <TableCell align="center">
                  <Tooltip title="edit">
                    {/* <IconButton component={RouterLink} to={`/dashboard/customers-transaction/${props.tableDatas.id}`}> */}
                    <IconButton>
                      <Iconify icon="akar-icons:edit" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell align="center">
                <Tooltip title="delete">
                  {/* <IconButton aria-label="delete" onClick={(event) =>props.deletePinTran(props.tableDatas.id)}> */}
                  <IconButton aria-label="delete">
                    <Iconify icon="eva:trash-2-outline" />
                  </IconButton>
                </Tooltip>
                </TableCell>
                <TableCell align="center">{row.description}</TableCell>
            </TableRow> 
          ))} 
        </TableBody>
      </Table>
    </TableContainer>
  );
}
