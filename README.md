# STREAMCAL(서버)

## 개요

STREAMCAL 프로젝트는 네이버의 게임 스트리밍 플랫폼인 [치지직(chzzk.naver.com)](https://chzzk.naver.com/)에서의 방송 기록들을 수집하고, 스트리머별, 날짜별, 카테고리별 등 다양한 분류를 사용해해 보기 편리하게 제공하는 웹 사이트입니다.

STREAMCAL의 클라이언트와 서버는 오픈 소스이며 영리를 추구하지 않습니다.

## 배포

[STREAMCAL 바로가기](https://streamcal.ch/)

STREAMCAL의 클라이언트는 netlify를 이용해 배포 중입니다.
STREAMCAL의 서버는 aws의 ec2와 API Gateway를 사용해 배포 중입니다.

## 스택

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)

## 주요 기능

### 기본 기능

- mongoose를 이용해 mongoDB로부터 데이터를 불러옵니다.

### channel

- 채널과 관련된 작업을 수행합니다.

### streamcal

- 스트리머 로그와 관련된 작업을 수행합니다.

### category

- 카테고리(liveCategory) 관련 작업을 수행합니다.

### common

- 로깅 인터셉터로 요청에 대해 자동으로 로그를 남깁니다.

## 프로젝트 구조

```
src
├─category
│  └─dto
├─channel
│  └─dto
├─streamcal
└─common
   └─interceptor
```
