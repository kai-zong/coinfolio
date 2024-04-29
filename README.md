# Coinfolio: A Portfolio Manager for Crypto Assets

![Static Badge](https://img.shields.io/badge/JavaScript-gray?logo=JavaScript) ![Static Badge](https://img.shields.io/badge/Node.js-gray?logo=Node.js) ![Static Badge](https://img.shields.io/badge/Auth0-gray?logo=Auth0) ![Static Badge](https://img.shields.io/badge/vercel-gray?logo=vercel) ![Static Badge](https://img.shields.io/badge/render-gray) ![Static Badge](https://img.shields.io/badge/Front--End-React-blue?logo=React) ![Static Badge](https://img.shields.io/badge/Front--End-Chart.js-rgb(179%2C%20105%2C%20146)?logo=Chart.js) ![Static Badge](https://img.shields.io/badge/Front--End-Vite-rgb(102%2C%2086%2C%20230)?logo=Vite) ![Static Badge](https://img.shields.io/badge/Front--End-Vitest-darkgreen?logo=vitest) ![Static Badge](https://img.shields.io/badge/Front--End-Tailwind%20CSS-rgb(3%2C%20166%2C%20218)?logo=Tailwind%20CSS) ![Static Badge](https://img.shields.io/badge/Back--End-Prisma-black?logo=Prisma) ![Static Badge](https://img.shields.io/badge/Back--End-MySQL-rgb(0%2C%20105%2C%20146)?logo=MySQL) 




Welcome to Coinfolio, your ultimate web application for managing and tracking your cryptocurrency investments. Developed with passion by [@SeanXLChen
](https://github.com/SeanXLChen) and [@Kai-Zong](https://github.com/kai-zong), Coinfolio leverages the latest web technologies to bring you real-time insights into your crypto portfolio's performance.

## Live Deployment
App is live on [coinfolio-jet.vercel.app](https://coinfolio-jet.vercel.app/portfolio)

![app-portfolio-page](./img/app-portfolio-page.png)

We deployed each part of the web app using different provider as they are free :)

 ![image](./img/deploy-image.jpg)

Details of how to deploy it can be found in [here](./Deployment-FullStack.docx)

## Features
- **Transaction Tracking:** Create your transaction and track the cost of your purchase, with ability to modify your transaction later if error.
- **Portfolio Analysis:** Have summary analysis of all your transactions with the ability to see your average purchase cost, up-to-date market value, and the profit you made.
- **Real-Time Data:** Utilizing the CoinMarketCap API, Coinfolio provides up-to-the-second price update on your crypto assets.

## Technologies

Coinfolio leverages a cutting-edge stack of modern web technologies to deliver an intuitive and responsive user experience. Below are the key technologies deployed:

- **Frontend**:
    - **React**: Powers dynamic user interface interactions.
    - **Vite**: Serves as the frontend build tool, offering fast refresh and optimized build times.
    - **Tailwind CSS**: Utilized for custom and responsive styling.
    - **Chart.js**: Provides rich, interactive charts for data visualization.
    - **Vitest**: Facilitates testing with a Vite-native test framework.
- **Backend**:
    - **Node.js**: Serves as the runtime environment for the backend.
    - **Prisma**: ORM tool for database management.
    - **MySQL**: Database used to store and manage application data.
- **Authentication**:
    - **Auth0**: Manages authentication and user management securely.
- **Deployment and Version Control**:
    - Deployed on **Vercel** and **Render**, optimizing for different aspects of hosting and server management.
    - **GitHub**: Hosts the source code and handles version control, facilitating continuous integration and deployment workflows.
- **API Integration**:
    - **CoinMarketCap API**: Fetches real-time cryptocurrency data to keep the portfolio up-to-date.

This robust combination ensures that Coinfolio is not only fast and reliable but also scalable and secure, making it an excellent tool for tracking cryptocurrency investments.

## Getting Started

To get a local copy up and running, follow these steps:

### Prerequisites

- npm
  ```sh
  npm install npm@latest -g
  ```
- prisma 
- mysql database (follow [this](./MySql-Installation(Mac).pdf))
- Set up Auth0 account (follow [this](./Auth0-Config.pdf) tutorial)

### Set up API (Back-end)
1. Navigate to the api directory if you havn't already
    ```sh   
    cd api
    ```

2. Install NPM packages
    ```sh
    npm install
    ```

3. Run index.js
    ```sh
    node index.js
    ```



### Set up mysql Database (Back-end)

1. Navigate to the api directory if you havn't already
    ```sh   
    cd api
    ```

2. create .env file and inside it add auth0 credentials that we set up
    ```
    AUTH0_AUDIENCE=XXXXXXXX
    AUTH0_ISSUER=XXXXXXXX
    ```

3. inside .env file add the coinmarketcap API key (Get your API Key [here](https://coinmarketcap.com/api/))
    ```
    CMC_API_KEY=XXXXXXXXX
    ```

4. inside .env file add the mysql database connection infos: me for example my mysql name is root and my password is 12345678 and my mysql is running at port 3306 and i want to create a database named "coinfoliodb"
    ```
    DATABASE_URL="mysql://root:12345678@localhost:3306/coinfoliodb"
    ```

5. deploy the prisma schema to your local database
    ```sh
    npx prisma migrate deploy
    ``` 

6. generate prisma client
    ```sh
    npx prisma generate
    ```

7. initialize the coin table (dataset will query the top 50 crypto assets in terms of market cap from coinmarketcap api and populate the coin table)
    ```sh
    npx prisma db seed
    ``` 

8. now database should be ready, can run ```npx prisma studio``` to manage it via browser 

### Set up Client (Front-end)

1. Navigate to the client directory if you havn't already

    ```sh
    cd client
    ```

2. Install NPM packages
    ```sh
    npm install
    ```

3. Create a .env file and add your CoinMarketCap API key
    ```sh
    VITE_Backend_API_URL=http://localhost:3001 (assume your run API at PORT 3001)
    ```
4. in the .env file created, add these three credentials you should get from following the [auth0 instruction](./Auth0-Config.pdf):
    ```
    VITE_REACT_APP_AUTH0_DOMAIN=XXXXXX
    VITE_REACT_APP_AUTH0_CLIENT_ID=XXXXXX
    VITE_REACT_APP_AUTH0_AUDIENCE=XXXXXX
    ```

4. Start the development server
    ```sh
    npm run dev
    ```

### Tests
We use [Vitest](https://vitest.dev/) as the testing framework and test suites are inside **./client/src/tests**, simply run in the CLI ```npm run test``` to start using it.

### Usage
- After setting up the project locally, you can start tracking your crypto portfolio by adding a new transaction.

- You can also edit or delete the transactions you created.

- when clicked the refresh button inside the portfolio page, market price will be fetched from coinmarketcap API with the latest update.


### License
Distributed under the MIT License. See LICENSE for more information.
