# builder
FROM node:current-buster as build

ARG SITE_URL
ARG YUQUE_GROUP
ARG YUQUE_TOKEN
ARG YUQUE_ENDPOINT
ARG YUQUE_FILTER_TYPE
ARG YUQUE_FILTER_SLUG

RUN \
  mkdir -p /usr/src/gatsby \
  && npm config set strict-ssl false \
  && npm config --global set registry http://registry.npmjs.org/ \
  && yarn config set strict-ssl false \
  && yarn config set registry http://registry.npmjs.org/ \
  && git config --global http.sslVerify false

# build
WORKDIR /usr/src/gatsby

COPY package.json /usr/src/gatsby

RUN \
  mkdir -p /usr/src/gatsby/public \
  && yarn \
  && yarn build

# runner
FROM nginx:stable-alpine

COPY --from=build /usr/src/gatsby/public /usr/share/nginx/html
