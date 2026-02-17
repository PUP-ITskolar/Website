FROM busybox:latest
RUN mkdir /apptemp
COPY . /apptemp/
CMD ["/bin/sh", "-c", "mkdir -p /app/www/homepage && cp -R /apptemp/* /app/www/homepage/"]