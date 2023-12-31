# The base image that will have node dep
FROM node:latest
# Set the current working directory in the container
WORKDIR /usr/app

# Copy only two files to the image
COPY package.json package-lock.json ./

# Execute a command while building the container
RUN npm install

# Now copy the project files
ADD . . 
# Build the app


# When running the container, execute the following command
CMD ["npm","run","dev"]