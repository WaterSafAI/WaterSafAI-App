# Use the official Node.js 14 image from Docker Hub
FROM node:14

# Create a directory for the application
WORKDIR /usr/src/app

# Install Firebase CLI
RUN npm install -g firebase-tools

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the code
COPY . .

# Expose the port the app runs in
EXPOSE 8000

# The command to run the application
CMD [ "npm", "start" ]
