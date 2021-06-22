import { ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';
import Store from './Store'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
  <StrictMode>
    <ColorModeScript />
    <BrowserRouter>
    <Store>
      <App />
    </Store>
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
reportWebVitals();
