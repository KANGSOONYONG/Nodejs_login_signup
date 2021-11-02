const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// salt를 이용해서 비밀번호 암호화, saltRounds는 몇자리 수인지 설정
const saltRounds = 10;

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 100
    },
    email: {
        type: String,
        trim: true,
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
// user 정보를 저장하기 전(pre)에 어떠한 행동을 할 수 있게 만듦
userSchema.pre('save', function( next ){
    // 바로 위의 schma user 정보를 나타냄
    var user = this;
    // 비밀번호를 암호화 시킨다. 혹은 비밀번호가 바뀌었을 때만 암호화시킨다
    if (user.isModified('password')) {
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err)
            // hash는 암호화된 비밀번호를 나타냄
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) return next(err)
                user.password = hash
                next()
            })
        });
    } else {
        next()
    }
})
const User = mongoose.model('User', userSchema)

module.exports = { User }