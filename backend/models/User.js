const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles: [{
        type: String,
        default: "Student"
    }],
    active: {
        type: Boolean,
        default: true
    }

})
// get a single user


module.exports = mongoose.model('User',userSchema)