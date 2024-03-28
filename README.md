# Coinfolio: A Portfolio Manager for Crypto Assets

Welcome to Coinfolio, your ultimate web application for managing and tracking your cryptocurrency investments. Developed with passion by [@SeanXLChen
](https://github.com/SeanXLChen) and [@Kai-Zong](https://github.com/kai-zong), Coinfolio leverages the latest web technologies to bring you real-time insights into your crypto portfolio's performance.

## Features

- **Real-Time Data:** Utilizing the CoinMarketCap API, Coinfolio provides up-to-the-minute information on your crypto assets.
- **Sleek Interface:** A modern and intuitive interface built with Tailwind CSS, ensuring a seamless user experience across all devices.
- **Comprehensive Analytics:** Get detailed insights into your portfolio's performance, including gains, losses, and investment trends.
- **Portfolio Customization:** Tailor your portfolio by adding or removing assets, setting alerts, and tracking your investment goals.

## Technologies

Coinfolio is built using a robust stack of modern web technologies:

- **Frontend:** [Tailwind CSS](https://tailwindcss.com/) for styling and [React](https://react.dev/) for dynamic user interface interactions.
- **Backend:** Although primarily a frontend-focused application, React's versatility allows us to manage application state and network requests efficiently.
- **API Integration:** CoinMarketCap API for fetching real-time cryptocurrency data. For more information on the API, visit [CoinMarketCap API Documentation](https://coinmarketcap.com/api/documentation/v1/).

## Getting Started

To get a local copy up and running, follow these simple steps:

### Prerequisites

- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Navigate to the project directory

    ```sh
    cd Coinfolio
    ```

2. Install NPM packages
    ```sh
    npm install
    ```

3. Create a .env file and add your CoinMarketCap API key
    ```sh
    REACT_APP_COINMARKETCAP_API_KEY=your_api_key_here
    ```

4. Start the development server
    ```sh
    npm start
    ```

### Usage
After setting up the project locally, you can start tracking your crypto portfolio by adding your assets to the dashboard.

### License
Distributed under the MIT License. See LICENSE for more information.
