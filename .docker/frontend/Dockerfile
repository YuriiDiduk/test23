
# production environment 
FROM nginx:stable
#COPY --from=build /app/build /usr/share/nginx/html
COPY .docker/nginx/nginx.conf /etc/nginx/conf.d/default.conf
RUN echo "<h2> BUILD USING TERRAFORM v2 in $HOSTNAME </h2>" > /usr/share/nginx/html/index.html
RUN ls -la >> /usr/share/nginx/html/index.html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
