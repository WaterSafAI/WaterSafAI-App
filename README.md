# WaterSafAI Project

Welcome to the WaterSafAI project repository. This guide will walk you through setting up your development environment for both the frontend and backend components of the WaterSafAI application.

## Frontend Development Setup

The frontend of WaterSafAI is developed using Expo. Follow these steps to set up your frontend development environment.

### Prerequisites

1. Node and npm:

    - macOS: Install using Homebrew:

        ```
        brew install node
        ```

    - Windows: Download the installer from [Node.js official website](https://nodejs.org/en/download/).


2. Expo CLI:

    ```
    npm install -g expo-cli
    ```


3. Expo Go:

    - Download Expo Go from the App or Play Store on your phone.

### Getting Started

1. Clone the Repository:

    ```
    git clone https://github.com/WaterSafAI/WaterSafAI-App.git
    cd WaterSafAI-App/frontend
    ```

2. Install Yarn:

    ```
    npm install -g yarn
    ```

3. Install Dependencies:

    ```
    yarn install
    ```

3. Start the Expo Project:

    ```
    npx expo start --dev-client
    ```

    This will open up a new browser window with a QR code. Scan this QR code using the Expo Go app on your mobile device to see a live preview of your app.

## Backend Development Setup

The backend of WaterSafAI is built with Node.js and Express. Follow these steps to set up your backend development environment.

### Prerequisites

Ensure you have Node.js and npm installed as described in the frontend prerequisites.

### Setting Up the Backend

1. Navigate to the Backend Directory:

    ```
    cd WaterSafAI-App/backend
    ```

2. Install Dependencies:

    ```
    npm install
    ```

3. Starting the Server:

    ```
    npm start
    ```

    This command will start the Node.js server using Express, which by default listens on http://localhost:3000.

4. Viewing the Server:

    Open your web browser and navigate to http://localhost:3000 to ensure the server is running.