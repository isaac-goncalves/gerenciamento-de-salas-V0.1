
    FROM node:latest

    # Create app directory

    WORKDIR /app

# Copy everything from current directory to the container's /app directory
    COPY . /app

    # Install dependencies
    RUN npm install

    EXPOSE 3333

# Set the command to start the server
CMD ["npm", "run", "dev"]