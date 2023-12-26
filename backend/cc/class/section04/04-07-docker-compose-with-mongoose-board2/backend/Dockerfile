FROM node:20

# 사실 COPY할때 없으면 알아서 만들어줘서 굳이 필요 없음
# RUN mkdir -p app
COPY . /app

COPY ./package.json /app/
COPY ./yarn.lock /app/
WORKDIR /app/
RUN yarn install

COPY . /app/

CMD yarn start:dev