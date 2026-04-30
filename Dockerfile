FROM node:20-alpine as build
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy source and build
COPY . .
RUN npm run build

# Serve with Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 8080 as expected by Cloud Run default
EXPOSE 8080

# Configure Nginx to listen on port 8080 and handle SPA routing
RUN printf 'server {\n\
    listen 8080;\n\
    location / {\n\
        root /usr/share/nginx/html;\n\
        index index.html index.htm;\n\
        try_files $uri $uri/ /index.html;\n\
    }\n\
}\n' > /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
