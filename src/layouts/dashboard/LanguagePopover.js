import { useRef, useState } from 'react';
// material
import { alpha } from '@mui/material/styles';
import { Box, MenuItem, Stack, IconButton } from '@mui/material';
// components
import MenuPopover from '../../components/MenuPopover';

// ----------------------------------------------------------------------

const LANGS = [
  {
    value: 'en',
    label: 'English',
    icon: '/static/icons/gb.svg',
  },
  {
    value: 'mm',
    label: 'Myanmar',
    icon: '/static/icons/Myanmar-19.svg',
  },
];

// ----------------------------------------------------------------------

export default function LanguagePopover(props) {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(props.props.props.open);
  const [selectedOption, setSelectedOption] = useState(props.props.props.selectedOption);
  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={(e) => props.props.props.handleOpen()}
        sx={{
          padding: 0,
          width: 50,
          height: 50,
          ...(open && {
            bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
          }),
        }}
      >
        <img src={LANGS[props.props.props.selectedOption].icon} alt={LANGS[props.props.props.selectedOption].label} />
      </IconButton>

      <MenuPopover
        open={props.props.props.open}
        anchorEl={anchorRef.current}
        sx={{
          mt: 1.5,
          ml: 0.75,
          width: 180,
          '& .MuiMenuItem-root': { px: 1, typography: 'body2', borderRadius: 0.75 },
        }}
        >
        <Stack spacing={0.75}>
          {LANGS.map((option,key) => (
            <MenuItem key={option.value} selected={option.value === LANGS[0].value} 
            onClick={(e) => props.props.props.changeLanguage({'key':key,'value':option.value})}>
              <Box component="img" alt={option.label} src={option.icon} sx={{ width: 28, mr: 2 }} />
              {option.label}
            </MenuItem>
          ))}
        </Stack>
      </MenuPopover>
    </>
  );
}
