# Stage 1: Build the application
FROM node:22-alpine AS builder

WORKDIR /app

# Declare ARG sesuai variabel yang digunakan
ARG VITE_API_TOKEN
ARG VITE_API_KEY_MODELARK
ARG WEB_BYTE_PLUSE
ARG API_KEY_BYTEPLUSE
ARG MODEL_TEXT
ARG KCS

ENV VITE_API_TOKEN=$VITE_API_TOKEN
ENV VITE_API_KEY_MODELARK=$VITE_API_KEY_MODELARK
ENV WEB_BYTE_PLUSE=$WEB_BYTE_PLUSE
ENV API_KEY_BYTEPLUSE=$API_KEY_BYTEPLUSE
ENV KCS=$KCS
ENV MODEL_TEXT=$MODEL_TEXT

# Copy package files
COPY package*.json ./

# Install all dependencies (including devDependencies for build)
RUN npm ci

# Copy source code
COPY . .

# Build the application (skip type-check to avoid TypeScript version conflicts)
RUN npm run build-only

# Stage 2: Serve the application with nginx
FROM nginx:alpine

# Copy built application
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

