import React from 'react';
import ReactDOM from 'react-dom/client';
import Dictionary from './Dictionary'; // Adjust the path if necessary
import './index.css'; // Optional: Import your CSS file

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Dictionary />
  </React.StrictMode>
);
