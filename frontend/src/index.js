import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from './Routes';
import './index.css';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();