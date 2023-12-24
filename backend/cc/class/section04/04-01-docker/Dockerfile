# 1. 운영체제 및 프로그램 설치(하나하나 입력하는 방식)
# FROM ubuntu:22.04

# RUN sudo apt install nodejs
# RUN sudo npm install -g yarn

# 1. 운영체제 및 프로그램 설치(이미 리눅스 , node, npm, yarn이 설치되어 있는 이미지를 가져와서 사용하는 방식)
FROM node:20

# 2. 내 컴퓨터에 있는 폴더나 파일을 도커 컴퓨터 안으로 복사하기
# 현재 폴더에 있는 index.js 파일을 도커 컴퓨터 안으로 복사하기
COPY ./index.js /index.js 

# 3. 도커 안에서 index.js 실행하기
CMD node index.js