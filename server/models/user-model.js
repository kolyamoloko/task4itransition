const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    isActive: {type: Boolean, default: false},
    status: {type: Boolean},
    dateRegistration: {type: Date},
    dateLastConnection: {type: Date},
    isBlocked: {type: Boolean, default: false},
})

module.exports = model('User', UserSchema);