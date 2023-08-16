# install base image
FROM node:15
# set working directory
WORKDIR /app
# set package.json, "." applies to current working directory
COPY package.json .
ARG NODE_ENV
# npm install to install packages, only want production
RUN if [ "$NODE_ENV" = "development" ]; \
    then npm install; \
    else npm install --only=production; \
    fi
# copy current directory, 
COPY . ./
# env vars
ENV PORT=3000
# give port to access
EXPOSE $PORT
# tell what file to run on container
CMD [ "node", "index.js"]

#docker guide
# create image , docker % docker build -t node-app-image .
# run image, docker run -v $(pwd):/app:ro -v /app/node_modules --env-file ./.env -p 3000:4000 -d --name node-app node-app-image
# exit container, docker rm node-app -f
# explore docker files, docker exec -it node-app bash
# see what's running, docker ps
# see images, docker volume ls
# build with docker compose , docker-compose up -d
# stop build with docker compose, docker-compose down -v
