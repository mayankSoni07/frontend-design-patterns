# Simplified Dockerfile for order microfrontend
FROM node:18-alpine

WORKDIR /app

# Copy frontend-common source files
COPY frontend-common/ ../frontend-common/

# Install frontend-common dependencies
WORKDIR /app/../frontend-common
COPY frontend-common/package*.json ./
RUN npm install

# Switch to main app directory
WORKDIR /app

# Copy and install app dependencies
COPY order/package*.json ./
RUN npm install

# Copy app source
COPY order/ .

EXPOSE 3000

CMD ["npm", "run", "dev", "--", "-H", "0.0.0.0"]
