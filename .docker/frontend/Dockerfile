# build environment
FROM node:18.12.1 as build

WORKDIR /app
COPY package.json ./
RUN npm i --silent
COPY . ./
RUN npm run build -prod


# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY .docker/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
