FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy source code
COPY . .

# Build the package
RUN npm run build

# Expose port (not really needed for a library, but keeping for consistency)
EXPOSE 3000

# Default command (for development)
CMD ["npm", "run", "dev"]
