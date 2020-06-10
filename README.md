# React Side Project 01
Follow the [React Getting Started](https://ko.reactjs.org/tutorial/tutorial.html) Guide for detailed instructions on setting up your local machine for development.

## How to run
* Clone repository and install dependencies
```
git clone Project
```
* Run Application
```
npm install
npm run dev
```

## Features
* server
> 1. mongoDB 사용
> 2. token 생성 및 쿠기 저장 기능 추가
> 3. password 암호화 / 복호화
------------------
* hello word 문구 출력\
```http : // localhost : 5000 /``` 
* 가입 관련\
```http://localhost:5000/api/users/register``` 
\
json 형식\
``
{ 
"name":"test", 
"email":"test@gamil.com", 
"password":"test" 
}
``
* 로그인\
```http://localhost:5000/api/users/login```
\
json 형식\
``
{
    "email":"test@gmail.com",
    "password":"test"
}
``
* 로그아웃\
```http://localhost:5000/api/users/logout```
---------------------
* Client
> 1. randing Page : 로그인후 들어갈 수 있는 화면 (로그아웃 가능)
> 2. Login Page : 로그인할 수 있는 화면
> 3. Register Page : 회원 가입할 수 있는 화면
> 4. redux 기능 사용
> 5. Auth 기능 사용
--------------
* randing Page\
```http://localhost:3000/```
* login Page\
```http://loginhost:3000/login/```
* register Page\
```http://loginhost:3000/register```
