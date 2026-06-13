# Stage 1: Build
FROM node:16.20.2-bullseye-slim AS build
WORKDIR /app

# Install build dependencies
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Copy package files
COPY package*.json ./

# Install specific versions of problematic dependencies
RUN npm install ajv@8.12.0 ajv-keywords@5.1.0 react-helmet@6.1.0 framer-motion@10.16.4 --legacy-peer-deps

# Install all other dependencies
RUN npm install --legacy-peer-deps

# Copy app files
COPY . .

# Build the app
RUN npm run build

# Stage 2: Serve
FROM nginx:1.23-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]