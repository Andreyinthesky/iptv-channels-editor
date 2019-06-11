import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import App from './App';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1e90ff',
    },
    secondary: {
      main: '#fff924',
    },
  },
  overrides: {
    MuiTableCell: {
      root: {
        padding: '4px 12px 4px 24px',
      },
      body: {
        fontSize: '16px',
      }
    },
  },
  typography: { useNextVariants: true },
});

ReactDOM.render(
  <BrowserRouter basename={baseUrl}>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </BrowserRouter>,
  rootElement
);
