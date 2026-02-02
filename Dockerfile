# Use the official nginx image as a base
FROM nginx:alpine

# Copy your local static content into the default NGINX web root directory
COPY . /usr/share/nginx/html/