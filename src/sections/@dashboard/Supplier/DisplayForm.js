import * as React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';
// import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
// import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

/* import css */
import '../../../css/common.css';

export default function DisplayForm(props) {
  return props.supplierData.length > 0 ? (
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell align="center">စဥ်</TableCell>
          <TableCell align="left">အမည်</TableCell>
          <TableCell align="left">ဖုန်းနံပါတ်</TableCell>
          <TableCell align="left">ကုမ္ပဏီ/စက်ရုံ</TableCell>
          <TableCell align="left">လိပ်စာ</TableCell>
          <TableCell align="left">မှတ်ချက်</TableCell>
          <TableCell align="center" colSpan={2}>
            လုပ်ဆောင်ချက်
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {props.supplierData.map((row) => (
          <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell align="center">{row.no}</TableCell>
            <TableCell align="left">{row.name_mm}</TableCell>
            <TableCell align="left">{row.phone_no}</TableCell>
            <TableCell align="left">{row.company}</TableCell>
            <TableCell align="left">{row.address}</TableCell>
            <TableCell align="left">{row.comment}</TableCell>
            <TableCell align="center">
              <Button
                variant="contained"
                // startIcon={<EditOutlinedIcon />}
                className="button"
                style={{ width: '100px', fontSize: 'small', boxSizing: 'small' }}
                onClick={(e) => props.setEditSupplier(row)}
              >
                ပြင်မည်
              </Button>
            </TableCell>
            <TableCell align="center">
              <Button
                variant="contained"
                // startIcon={<DeleteOutlineIcon />}
                className="button delete-button"
                style={{ width: '100px', fontSize: 'small', boxSizing: 'small' }}
                onClick={(e) => props.remove(row.id)}
              >
                ဖျက်မည်
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ) : (
    <div>
      <h3 align="center" style={{ color: 'red' }}>
        အချက်အလက် မရှိသေးပါ။
      </h3>
    </div>
  );
}
