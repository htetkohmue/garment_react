import PropTypes from 'prop-types';
// material
import { styled } from '@mui/material/styles';
// import { Toolbar, Tooltip, IconButton,FilledInput, Typography,FormControl,InputLabel, OutlinedInput, Autocomplete, InputAdornment, Popper,Box ,TextField  } from '@mui/material';
import { Toolbar,Typography, OutlinedInput, Autocomplete, InputAdornment, Popper,Box ,TextField  } from '@mui/material';

// component
import Iconify from '../../../components/Iconify';
import DatePicker from '../../../common/datepicker/DatePicker';

// ----------------------------------------------------------------------

const PopperStyle = styled((props) => <Popper placement="bottom-start" {...props} />)({
  width: '260px !important',
});

// ----------------------------------------------------------------------

CustomerData.propTypes = {
  posts: PropTypes.array.isRequired,
};


const RootStyle = styled(Toolbar)(({ theme }) => ({
//   height: 100,
  display: 'flex',
//   justifyContent: 'space-between', far two text box
  padding: theme.spacing(0, 1, 0, 3),
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 260,
  marginLeft:`50px !important`,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[600_70]} !important`,
  },
}));

// ----------------------------------------------------------------------



CustomerData.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};

export default function CustomerData({ date,numSelected, filterName, onFilterName,IdCustomer,deleteCustomer,
  posts,handleChange}) {

    console.log(numSelected);

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
       <Autocomplete
      sx={{ width: 260 }}
      autoHighlight
      popupIcon={null}
      PopperComponent={PopperStyle}
      options={posts}
      getOptionLabel={(post) => post.customerId}
      onChange={handleChange}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderInput={(params) => (
        <TextField
        {...params}
          placeholder="Search Customer ID..."
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
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <SearchStyle
          disabled
          value={filterName}
          onChange={onFilterName}
          placeholder="Search Customer Name..."
        />
      )}
      
    </RootStyle>
  );
}
