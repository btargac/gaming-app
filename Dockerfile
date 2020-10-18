# Stage 1 - the build process
FROM node:14.1 as build-deps

# Set a working directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY yarn.lock ./

RUN yarn install
COPY . ./
RUN yarn run build

# Stage 2 - the production environment
FROM nginx:1.17-alpine
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html

# Copy the nginx.conf for client side navigation practices
COPY --from=build-deps /usr/src/app/nginx.conf /etc/nginx/conf.d/default.conf

CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
