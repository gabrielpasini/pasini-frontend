import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import BaseDrawer from './components/base-drawer';
import * as serviceWorker from './serviceWorker';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#30A2FF',
    },
    secondary: {
      main: '#016594',
    },
    default: {
      main: '#424242',
    },
    error: {
      main: '#FF0000',
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
      <BaseDrawer />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
