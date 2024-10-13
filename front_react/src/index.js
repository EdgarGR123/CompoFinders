import React from 'react';
import ReactDOM from 'react-dom/client'; 
import App from './App'; 
import reportWebVitals from './reportWebVitals'; 

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import './index.css';
import './estilos2/bootstrap.min.css';
import './estilos2/custom.css';
import './estilos2/templatemo.css';
import './estilos2/fontawesome.min.css';
import logo from './img/logo.svg'; 
import Footer from "./components/footer"; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <link rel="icon" href={logo} />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;200;300;400;500;700;900&display=swap" />
    <App />
    <Footer />
  </React.StrictMode>
);

// Measure performance
reportWebVitals();
