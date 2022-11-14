# build environment
FROM node:16.15.1-stretch as build

WORKDIR /app
COPY package.json ./
RUN npm install -g npm@9.1.1
RUN npm i --silent
COPY . ./
RUN npm run build


# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY .docker/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
