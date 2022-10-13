import { useRef,useState,useEffect} from 'react';
// material
import { alpha } from '@mui/material/styles';
import { Box, MenuItem, Stack, IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';
// components
import MenuPopover from '../../components/MenuPopover';


export default function LanguagePopover(props) {
  const { t } = useTranslation();
  // ----------------------------------------------------------------------

  const LANGS = [
    {
      value: 'en',
      label: t('English'),
      icon: '/static/icons/gb.svg',
    },
    {
      value: 'mm',
      label: t('Myanmar'),
      icon: '/static/icons/Myanmar-19.svg',
    },
  ];

  // ----------------------------------------------------------------------
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(props.props.props.open);
  const [selectedLanguageKey, setSelectedLanguageKey] = useState(0);
  useEffect(() => {
    if (localStorage.getItem('selectedLanguageKey')===null) {
      setSelectedLanguageKey(0);
      localStorage.setItem('selectedLanguageName',LANGS[0].value);
    }else{
      setSelectedLanguageKey(localStorage.getItem('selectedLanguageKey'));
      localStorage.setItem('selectedLanguageName',LANGS[localStorage.getItem('selectedLanguageKey')].value);
    }
  });
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
        <img src={LANGS[selectedLanguageKey].icon} alt={LANGS[selectedLanguageKey].label} />
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
            <MenuItem key={option.value} selected={option.value === LANGS[selectedLanguageKey].value} 
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
