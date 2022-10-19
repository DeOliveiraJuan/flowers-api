const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const ROUNDS = 10;

const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
// const PASSWORD_PATTERN = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required']
        },
        lastName: {
            type: String,
            required: [true, 'Last name is required']
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            match: [EMAIL_PATTERN, 'Email is not valid'],
            trim: true,
            lowercase: true,
            unique: [true, 'Email already exist']
        }, 
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: 8,
        },
        phoneNumber: {
            type: Number,
            required: [true, 'Phone number is required'],
            unique: true,
            minlength: 9,
            maxlength: 11
        },
        isAdmin: {
            type: Boolean,
            default: false 
        }
    },
    {
        toJSON: {
            virtuals: true,
            transform: (doc, ret) => {
                delete ret.__v;
                delete ret._id;
                delete ret.password;

                return ret
            }
        }
    }
);

UserSchema.pre('save', function(next) {
    if(this.isModified('password')) {
        bcrypt.hash(this.password, ROUNDS)
        .then((hash) => {
            this.password = hash;
            next()
        })
    } else {
        next()
    }
})

UserSchema.methods.checkPassword = function(passwordToCompare) {
    return bcrypt.compare(passwordToCompare, this.password);
}

const User = mongoose.model('User', UserSchema);

module.exports = User;