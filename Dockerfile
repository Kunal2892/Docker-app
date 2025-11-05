# Use official Node.js image
FROM node:22

# Set environment variables
ENV MONGO_DB_USERNAME=admin \
    MONGO_DB_PWD=secret

# Set working directory inside the container
WORKDIR /docker-app

# Copy all project files
COPY . .

# Install dependencies
RUN npm install

# Expose app port
EXPOSE 5050

# Run the app
CMD ["node", "server.js"]
