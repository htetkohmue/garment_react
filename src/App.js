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



// ----------------------------------------------------------------------

function App() {
    const { t, i18n } = useTranslation();
    const [open, setOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(0);
    const theme = useTheme();
    document.body.dir = i18n.dir();

    const changeLanguage = (lng) => { 
      i18n.changeLanguage(lng.value)
      document.body.dir = i18n.dir();
      theme.direction = i18n.dir();
      setSelectedOption(lng.key);
      setOpen(false);
    }
    const handleOpen = () => {
      setOpen(true);
    };
  return (
    <ThemeProvider>
      <ScrollToTop />
      <BaseOptionChartStyle />
      <Router changeLanguage={changeLanguage} selectedOption={selectedOption} open={open} handleOpen={handleOpen}  />
    </ThemeProvider>
  );
}
export default withRoot(App);
