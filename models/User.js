const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10; // 암호화 10자리
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true, // 스페이스바를 없애주는 역할
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

userSchema.pre('save', function(next){

    var user = this;
    if(user.isModified('password')){ // password가 변환 될때만
        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err) return next(err)

            bcrypt.hash(user.password, saltRounds, function(err, hash){
                if(err) return next(err)
                // 암호화 성공시 password를 암호화된 password로 변경
                user.password = hash;
                next()
            })
        })
    }else{
        next()
    }
})

userSchema.methods.comparePassword = function(plainPassword, cb){
    // 비밀번호 비교 이미 암호화 된 pw는 복호화 할수 없기 때문에 받음  pw를 암호화 똑같이 해서 비교
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err)
        cb(null, isMatch)
        
    })
}

userSchema.methods.generateToken = function(cb){
    // jsonwebtoken을 이용해서 tocken 생성
    var user = this;
    // user._id + 'secretToken' = token
    var token = jwt.sign(user._id.toHexString(),'secretToken');
    user.token = token;
    user.save(function(err, user) {
        if(err) return cb(err)
        cb(null, user)
    })
}

userSchema.statics.findByToken = function(token, cb){
    var user = this;
    // 토큰을 디코드한다.
    jwt.verify(token, 'secretToken', function(err, decoded){
        //user._id를 이용해서 유저를 찾은 다음 클라이언트에서 가져온 token과 db에서 보관된 토큰이 일치하는지 확인
        user.findOne({"_id": decoded, "token": token}, function(err, user){
            if(err) return cb(err);
            cb(null, user)
        })
    })
}
const User = mongoose.model('User', userSchema)

module.exports = {User}