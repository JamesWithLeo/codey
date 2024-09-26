
# Set the Node.js version as an argument
ARG NODE_VERSION=20.14.0

# Use an official Node.js image from the Docker Hub
FROM node:22-alpine

# Set environment variables
ENV NODE_ENV=development

# Set the working directory
WORKDIR /

# Copy package.json and package-lock.json
COPY package*.json ./
COPY prisma* ./

# Install dependencies
RUN npm install

# Copy all source files including the prisma folder
COPY . .

# Generate Prisma client
RUN npx prisma generate --schema=prisma/schema.prisma

# Expose the port that the application will run on
EXPOSE 3000

# Start the application in development mode
CMD ["npm", "run", "dev"]
