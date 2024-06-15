FROM node:lts-alpine as base

# Set timezone
ENV TZ=Asia/Seoul
RUN apk add tzdata && ln -s /usr/share/zoneinfo/Asia/Seoul /etc/localtime

# Customer image
FROM base as customer

WORKDIR /usr/customer
COPY ./services/customer/package.json ./
COPY ./services/customer .
EXPOSE 3000
RUN yarn install

# Order image
FROM base as order

WORKDIR /usr/order
COPY ./services/order/package.json ./
COPY ./services/order .
EXPOSE 3000
RUN yarn install