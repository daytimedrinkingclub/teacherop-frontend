import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { InternalAuthProvider } from './Internal-Auth';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <InternalAuthProvider>
        <App />
      </InternalAuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
