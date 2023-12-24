FROM node:20

# 사실 COPY할때 없으면 알아서 만들어줘서 굳이 필요 없음
# RUN mkdir -p app
COPY . /app

# RUN cd ./app (WORKDIR로 대체 가능)
WORKDIR /app/
RUN yarn install

CMD yarn start:dev