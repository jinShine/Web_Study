# 나만의 가짜 컴퓨터 만드는 설명서

# 1. 직접 설치 (굳이 이렇게 까지 하나하나 설치 하지 않아도 된다!)
# 
# FROM ubuntu:22.04
# RUN sudo apt install -y nodejs
# RUN sudo npm install -g yarn


# 2. 이미 리눅스 node, npm, yarn까지 친절하게 전부 설치한 이미지 파일이 존재한다.
FROM node:14

# 2-2. 프로그램 셋팅
# RUN mkdir myfolder => 아래에서 COPY할 때 자동으로 만들어줌으로 굳이 필요 없음!
COPY . /myfolder/
# RUN cd myfolder => WORKDIR /myfolder/
WORKDIR /myfolder/
RUN yarn install
RUN yarn build

# 2-3. 도커안에서 프로그램 실행하기
# 보통 셋팅과 실행단계를 나눈다.
CMD yarn start