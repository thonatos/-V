FROM nginx:stable-alpine

ADD conf.d /etc/nginx/conf.d

COPY public/ /usr/share/nginx/html/
