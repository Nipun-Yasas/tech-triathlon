# Use Node.js official image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy dependencies
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Copy all project files
COPY . .

# Build Next.js app
RUN npm run build

# Expose port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
