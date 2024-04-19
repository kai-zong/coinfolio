import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route, redirect } from 'react-router-dom';
import Portfolio from './components/portfolio.jsx';
import Transactions from './components/Transactions.jsx';
import Summary from './components/Summary.jsx';
import Nav from './components/Nav.jsx';
import PriceTable from './components/PriceTable.jsx';
import { UserAndPriceTableProvider } from './UserAndPriceTableContext.jsx';
import {Auth0Provider} from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
const requestedScopes = ["profile", "email"];

root.render(
  <React.StrictMode>
    {/* <Auth0Provider
  domain="dev-jr28gap4dny46g4d.us.auth0.com"
  clientId="zRagRcFiopafWPWOQIfEnPxs59i4JTUn"
  authorizationParams={{
    redirect_uri: `${window.location.origin}/verify-user`,
    audience: "https://api.coinfolio",
    scope: requestedScopes.join(" "),
  }}
  > */}
    <UserAndPriceTableProvider>
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<PriceTable />} />
        <Route path="portfolio" element={<Portfolio />}>
          <Route index element={<Summary />} />
          <Route path="transactions" element={<Transactions />} />
          {/* Define other nested routes for Portfolio here */}
        </Route>
        {/* Define other routes */}
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
    </UserAndPriceTableProvider>
    {/* </Auth0Provider> */}
  </React.StrictMode>,
);
