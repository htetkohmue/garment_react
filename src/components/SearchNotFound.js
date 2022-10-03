import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
// material
import { Paper, Typography } from '@mui/material';

// ----------------------------------------------------------------------

SearchNotFound.propTypes = {
  searchQuery: PropTypes.string,
};

export default function SearchNotFound({reloadForm, searchQuery = '', ...other }) {
  const { t } = useTranslation();
  return (
    <Paper {...other}>
      {!reloadForm &&(
      <Typography gutterBottom align="center" variant="subtitle1">
        {t('Not found')}
      </Typography>
      )}
      {!reloadForm &&(
      <Typography variant="body2" align="center">
        {t('No results found for')} &nbsp;
        <strong>&quot;{searchQuery}&quot;</strong>. {t('Try checking for typos or using complete words.')}
      </Typography>
      )}
    </Paper>
  );
}
