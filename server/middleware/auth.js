const { User } = require('../models/User')
let auth = (req, res, next) => {
    // 인증 처리를 하는 곳
    // 클라이언트 cookie에서 token 가져옴
    let token = req.cookies.x_auth;
    // token 복호화한후 user_id를 찾는다
    User.findByToken(token, (err, user) =>{
        if(err) throw err;
        if(!user) return res.json({ isAuth: false, error: true})
        req.token = token;
        req.user = user;
        next();
    })
    // 유저가 있으면 인증 ok 
    // 유저가 없으면 인증 no
}

module.exports = { auth }