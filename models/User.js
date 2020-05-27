const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10; // 암호화 10자리

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
        maxlength: 5
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
    }
})

const User = mongoose.model('User', userSchema)

module.exports = {User}