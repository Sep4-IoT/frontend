# Use an official Node runtime as the base image
# Alpine - a specific version of the Node.js Docker image based on Alpine linux distribution -> security oriented distribution
FROM node:alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Bundle app source inside Docker image
COPY . .

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Run the app when the container launches
CMD ["npm", "start"]
