import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async';
import { Suspense } from 'react';

const root = ReactDOM.createRoot(document.getElementById('root'))
// root.render(
//     <BrowserRouter>
//         <App />
//     </BrowserRouter>
// );
root.render(
    <HelmetProvider>
      <BrowserRouter>
        <Suspense>
          <App />
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  );