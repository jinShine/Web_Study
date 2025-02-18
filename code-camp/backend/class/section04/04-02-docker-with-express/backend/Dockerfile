FROM node:23

# 폴더가 없으면 알아서 생성 후 복사한다.
COPY ./ ./myfolder

WORKDIR /myfolder
RUN yarn install

CMD ["yarn", "start"]