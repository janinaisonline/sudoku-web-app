# Use an official Nginx image
FROM nginx:alpine

# Remove default Nginx web files
RUN rm -rf /usr/share/nginx/html/*

# Copy frontend files into the container
COPY . /usr/share/nginx/html

# Expose port 80 for serving the frontend
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]