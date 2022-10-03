import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Typography } from '@mui/material';
import { useTheme } from '@material-ui/core/styles';
import withRoot from './withRoot'
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';
import  Loading from './common/LoadingPage/Loading';



// ----------------------------------------------------------------------

function App() {
    const { t, i18n } = useTranslation();
    const [open, setOpen] = useState(false);
    const [loadingOpen, setloadingOpen] = useState(false); // for values
    const theme = useTheme();
    document.body.dir = i18n.dir();

    const changeLanguage = (lng) => { 
      localStorage.setItem('selectedLanguageKey',lng.key);
      i18n.changeLanguage(lng.value)
      document.body.dir = i18n.dir();
      theme.direction = i18n.dir();
      setOpen(false);
      setloadingOpen(true);
      setTimeout(() => {
        setloadingOpen(false);
      }, 500)
    }
    const handleOpen = () => {
      setOpen(true);
    };
  return (
    <ThemeProvider>
      {loadingOpen && (<Loading loadingOpen={loadingOpen} />)}
      <ScrollToTop />
      <BaseOptionChartStyle />
      <Router changeLanguage={changeLanguage} open={open} handleOpen={handleOpen}  />
    </ThemeProvider>
  );
}
export default withRoot(App);
