import PropTypes from 'prop-types';
// material
import { styled } from '@mui/material/styles';
import { Toolbar, Tooltip, IconButton, Typography, OutlinedInput, Autocomplete, InputAdornment, Popper, TextField  } from '@mui/material';
// component
import Iconify from '../../../components/Iconify';


// ----------------------------------------------------------------------

const PopperStyle = styled((props) => <Popper placement="bottom-start" {...props} />)({
  width: '260px !important',
});

// ----------------------------------------------------------------------

UserListToolbar.propTypes = {
  posts: PropTypes.array.isRequired,
};


const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 260,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&.Mui-focused': { width: 320, boxShadow: theme.customShadows.z8 },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[600_70]} !important`,
  },
}));

// ----------------------------------------------------------------------



UserListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};

export default function UserListToolbar({ numSelected, filterName, onFilterName,IdTailor,deleteTailor,
  posts,handleChange}) {

  return (
    <RootStyle
      sx={{
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter',
        }),
      }}
    >

    {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <SearchStyle
          value={filterName}
          onChange={onFilterName}
          placeholder="Search Tailor Name..."
          startAdornment={
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
            </InputAdornment>
          }
        />
      )}

      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
       <Autocomplete
      sx={{ width: 260 }}
      autoHighlight
      popupIcon={null}
      PopperComponent={PopperStyle}
      options={posts}
      getOptionLabel={(post) => post.tailorId}
      onChange={handleChange}
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
      )}
      
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton  onClick={(e) => deleteTailor(IdTailor)}>
            <Iconify icon="eva:trash-2-fill" />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton >
            <Iconify icon="ic:round-filter-list" />
          </IconButton>
        </Tooltip>
      )}
    </RootStyle>
  );
}
