import PropTypes from 'prop-types';

// @mui
import { styled } from '@mui/material/styles';
import { Autocomplete, InputAdornment, Popper, TextField } from '@mui/material';
// components
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

const PopperStyle = styled((props) => <Popper placement="bottom-start" {...props} />)({
  width: '250px !important',
});

// ----------------------------------------------------------------------

TailorIDSearch.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default function TailorIDSearch({ posts }) {
  return (
    <Autocomplete
      style={{marginLeft:'25px'}}
      sx={{ width: 250 }}
      autoHighlight
      popupIcon={null}
      PopperComponent={PopperStyle}
      options={posts}
      getOptionLabel={(post) => post.tailorID}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search Tailor ID..."
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon={'eva:search-fill'} sx={{ ml: 1, width: 20, height: 20, color: 'red' }} />
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
}
