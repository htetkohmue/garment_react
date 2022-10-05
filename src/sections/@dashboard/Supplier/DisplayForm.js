import * as React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
// import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
// import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

/* import css */
import '../../../css/common.css';

export default function DisplayForm(props) {
  const { t } = useTranslation();
  return props.supplierData.length > 0 ? (
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell align="center">{t('No.')}</TableCell>
          <TableCell align="left">{t('Name')}</TableCell>
          <TableCell align="left">{t('Phone No')}</TableCell>
          <TableCell align="left">{t('Company')}</TableCell>
          <TableCell align="left">{t('Address')}</TableCell>
          <TableCell align="left">{t('Description')}</TableCell>
          <TableCell align="center" colSpan={2}>
            {t('Action')}
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {props.supplierData.map((row) => (
          <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell align="center">{row.no}.</TableCell>
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
                {t('Edit')}
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
                {t('Delete')}
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ) : (
    <div>
      <h3 align="center" style={{ color: 'red' }}>
        {t('Data not found...')}
      </h3>
    </div>
  );
}
