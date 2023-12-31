FROM node:20

COPY ./package.json /app/
COPY ./yarn.lock /app/
WORKDIR /app/
RUN yarn install

COPY . /app/

CMD yarn start