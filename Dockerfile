FROM busybox:latest
WORKDIR /apptemp
COPY . .
CMD ["/bin/sh", "-c", "mkdir -p /app/www/homepage && cp -R /apptemp/* /app/www/homepage/"]