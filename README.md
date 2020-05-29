npm install
npm run start

*nodemon은 실시간 코드 바로 반영 가능*
nodemon 이용시: npm run dev

*기능 설명*

http://localhost:5000/ 

hello word 문구 출력

http://localhost:5000/api/users/register

가입 관련
필수 json
{
	"name":"test",
	"email":"test@gamil.com",
	"password":"test"
}
password 받으면 암호화해서 db에 저장

http://localhost:5000/api/users/login

로그인 관련
필수 json
{
    "email":"test@gmail.com",
    "password":"test"
}

password 받으면 암호화시켜서 db에 있는 암호화된 pw랑 비교후
같으면 token 생성 -> 로그인 유지 시킴

http://localhost:5000/api/users/logout

token이 있다면 token 제거 -> 로그아웃 