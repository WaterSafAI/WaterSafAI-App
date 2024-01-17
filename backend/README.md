# Backend

This directory contains the backend code for our application.

## Setup

Before you can run or deploy the backend, you need to install some dependencies and tools.

### Prerequisites

- Node.js and npm: You can download and install them from [here](https://nodejs.org/).
- Google Cloud SDK: You can download and install it from [here](https://cloud.google.com/sdk/docs/install).
- Docker: You can download Docker from [here](https://www.docker.com/products/docker-desktop). Follow the instructions for your specific operating system.

### Install the Google Cloud SDK

Next, you need to install the Google Cloud SDK, which includes the gcloud command-line tool. To install the Google Cloud SDK, you need to follow these steps:

#### For Windows:

1. Download the Interactive Installer:

    - Go to the [Google Cloud SDK webpage](https://cloud.google.com/sdk/docs/install).

    - Click on the “Install for Windows” button.

    - This will download the interactive installer.

2. Run the Installer:

    - Once downloaded, run the installer and follow the instructions.

    - During installation, it may ask you to log in to your Google Cloud account.

#### For macOS and Linux:

1. Open the Terminal:

    - Open a terminal window.

2. Run the Installation Command:

    - Use the following curl command to install the SDK:

        ```
        curl https://sdk.cloud.google.com | bash
        ```

3. Restart Your Terminal:

    - Restart your terminal for the changes to take effect.

After installing the Google Cloud SDK, you need to authenticate with your Google Cloud account. Run the following command from the `backend` directory and follow the prompts:

```
gcloud auth application-default login
```

#### Notes:

- **Updating PATH:** The installation process typically updates your PATH environment variable to include the gcloud tool. If it doesn't, you might need to do this manually.


### Running the Application Locally

To start the application locally, run the following commands in the `backend` directory:

```
docker build -t express-service .
```

```
docker run -p 8000:8000 -d express-service
```

### Testing Local Changes

To test local changes, you need to change the API_URL in the constants.js file in the frontend directory to point to your local server. i.e.

```
export const API_URL = 'http://10.0.2.2:8000';
```

### Deploying the Application

To deploy the application to Google Cloud, run the following commands in the backend directory:

```
gcloud builds submit --tag gcr.io/watersafai/express-service
```

```
gcloud run deploy --image gcr.io/watersafai/express-service --platform managed
```

This will deploy your application and give you a URL where you can access it.
