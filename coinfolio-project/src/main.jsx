import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Portfolio from './portfolio.jsx';
import Asset from './components/Asset.jsx';
import Summary from './components/Summary.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<App />} />
    <Route path="portfolio" element={<Portfolio />}>
      <Route index element={<Summary />} />
      <Route path="asset" element={<Asset />} />
      {/* Define other nested routes for Portfolio here */}
    </Route>
        {/* Define other routes */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
