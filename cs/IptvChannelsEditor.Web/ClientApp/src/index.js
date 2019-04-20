import './index.css'
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import App from './App';
import unregisterServiceWorker from './registerServiceWorker';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');
const bodyElement = document.getElementById('body');

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1e90ff',
    },
    secondary: {
      main: '#fff924',
    },
  },
  typography: { useNextVariants: true },
});

bodyElement.style.backgroundColor = theme.palette.primary.main;
bodyElement.style.margin = '0px';

ReactDOM.render(
  <BrowserRouter basename={baseUrl}>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </BrowserRouter>,
  rootElement
);

unregisterServiceWorker();
