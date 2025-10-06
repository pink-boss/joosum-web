# Use Node.js LTS version
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Expose the port Next.js dev server runs on
EXPOSE 3000

# Start the application in development mode
CMD ["npm", "run", "dev"]