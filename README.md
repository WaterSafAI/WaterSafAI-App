# WaterSafAI Frontend Development

Welcome to the frontend development setup of WaterSafAI. This guide will walk you through setting up your development environment for both macOS and Windows using Expo.

## Prerequisites

1. Node and npm:

- macOS:

  - Install using Homebrew:

    ```
    brew install node
    ```

- Windows:

  - Download the installer from [Node.js official website](https://nodejs.org/en/download).


2. Expo CLI:

    ```
    npm install -g expo-cli
    ```

3. Expo Go 

- Download Expo Go from the App or Play Store on your phone.

<!-- 3. Android Studio (for Android Emulator):

- Download and install [Android Studio](https://developer.android.com/studio).

- local.properties file:

  - If you're planning to use the Android Emulator, after installing Android SDK via Android Studio, you might need to set the SDK location. In `frontend/android`, create or edit the `local.properties` file:

    - macOS:

      ```
      sdk.dir = /Users/YourUsername/Library/Android/sdk`
      ```

    - Windows (ensure to escape the backslashes):

      ```
      sdk.dir = C:\\Users\\YourUsername\\AppData\\Local\\Android\\Sdk
      ```
4. iOS Simulator (Only for macOS):

- Download and install Xcode from the Mac App Store. -->

## Getting Started

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

4. Start the Expo Project:

    ```
    npx expo start
    ```

    This will open up a new browser window with a QR code. You can scan this QR code using the Expo Go app on your mobile device to see a live preview of your app.

