# 1. 하나하나 입력하는 방식
# 1. 운영체제 및 프로그램 설치
# FROM ubuntu:22.04

# RUN sudo apt install nodejs
# RUN sudo npm install -g yarn

# 2. 모두 깔려있는 통합 다운로드 방식
# 2-1 운영체제 및 프로그램 설치
FROM node:23

# 2-2 내 컴퓨터에 있는 폴더나 파일을 도커 컴퓨터 안으로 복사하기
RUN mkdir myfolder
COPY ./index.js ./index.js

# 2-3 도커안에서 index.js 실행시키기
CMD ["node", "index.js"]