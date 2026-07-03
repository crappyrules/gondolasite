# Static site served by Nginx (no build step required)
FROM nginx:1.23-alpine

# Copy the static site into the Nginx web root
COPY index.html /usr/share/nginx/html/
COPY css/ /usr/share/nginx/html/css/
COPY js/ /usr/share/nginx/html/js/
COPY assets/ /usr/share/nginx/html/assets/
COPY favicon.ico logo192.png logo512.png manifest.json robots.txt ordinarygondola.png /usr/share/nginx/html/

# Nginx server configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
