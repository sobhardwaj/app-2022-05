FROM node:alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm i
CMD ["npm", "run", "start"]

# docker build -f Dockerfile -t server .
# docker run -it -p 4002:3001 server



FROM node:alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm i
CMD ["npm", "run", "start"]


# docker build -f Dockerfile -t client .
# docker run -it -p 4001:3000 client



# https://www.section.io/engineering-education/build-and-dockerize-a-full-stack-react-app-with-nodejs-and-nginx/


# nginx file config

# upstream client {
#   server client:3000;
# }

# upstream api {
#   server api:3001;
# }

# server {
#   listen 80;

#   location / {
#       proxy_pass http://client;
#   }

#   location /sockjs-node {
#       proxy_pass http://client;
#       proxy_http_version 1.1;
#       proxy_set_header Upgrade $http_upgrade;
#       proxy_set_header Connection "Upgrade";
#   }
  
#   location /api {
#       rewrite /api/(.*) /$1 break;
#       proxy_pass http://api;
#   }
# }

# FROM nginx
# COPY ./default.conf /etc/nginx/conf.d/default.conf


# │   docker-compose.yml
# │   setup.sql
# |
# ├───client
# │   │   Dockerfile
# │   │   package-lock.json
# │   │   package.json
# │   │
# |   ├───node_modules
# │   ├───public
# │   │       index.html
# │   |
# │   └───src
# │           App.css
# │           App.js
# │           index.js
# │
# ├───nginx
# │       default.conf
# │       Dockerfile
# │
# └───server
#     |    Dockerfile
#     |    index.js
#     |    package-lock.json
#     |    package.json
#     |
#     ├───node_modules 



# docker-compose up --build