# Coinfolio: A Portfolio Manager for Crypto Assets

Welcome to Coinfolio, your ultimate web application for managing and tracking your cryptocurrency investments. Developed with passion by [@SeanXLChen
](https://github.com/SeanXLChen) and [@Kai-Zong](https://github.com/kai-zong), Coinfolio leverages the latest web technologies to bring you real-time insights into your crypto portfolio's performance.

## Live Deployment


## Features
- **Transaction Tracking:** Create your transaction and track the cost of your purchase, with ability to modify your transaction later if error.
- **Portfolio Analysis:** Have summary analysis of all your transactions with the ability to see your average purchase cost, up-to-date market value, and the profit you made.
- **Real-Time Data:** Utilizing the CoinMarketCap API, Coinfolio provides up-to-the-second price update on your crypto assets.

## Technologies

Coinfolio is built using a robust stack of modern web technologies:

- **Frontend:** [Tailwind CSS](https://tailwindcss.com/) for styling and [React](https://react.dev/) for dynamic user interface interactions. We use vite framework to build the project and followed [This] (https://tailwindcss.com/docs/guides/vite) instruction to integrate the Tailwind CSS.
- **Backend:** Although primarily a frontend-focused application, React's versatility allows us to manage application state and network requests efficiently.
- **API Integration:** CoinMarketCap API for fetching real-time cryptocurrency data. For more information on the API, visit [CoinMarketCap API Documentation](https://coinmarketcap.com/api/documentation/v1/).

## Getting Started

To get a local copy up and running, follow these steps:

### Prerequisites

- npm
  ```sh
  npm install npm@latest -g
  ```

- Auth0 account (we use it to manage user login)

### Set up API (Back-end)

### Set up Database (Back-end)

### Set up Client (Front-end)

1. Navigate to the client directory

    ```sh
    cd client
    ```

2. Install NPM packages
    ```sh
    npm install
    ```

3. Create a .env file and add your CoinMarketCap API key
    ```sh
    VITE_REACT_APP_AUTH0_DOMAIN=
    VITE_REACT_APP_AUTH0_CLIENT_ID=
    VITE_REACT_APP_AUTH0_AUDIENCE=
    VITE_Backend_API_URL=http://localhost:3001
    ```

4. Start the development server
    ```sh
    npm run dev
    ```

### Usage
After setting up the project locally, you can start tracking your crypto portfolio by adding your assets to the dashboard.

### License
Distributed under the MIT License. See LICENSE for more information.
