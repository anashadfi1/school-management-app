const mongoose = require('mongoose')
const User = require('./User')
const AuthoIncrement = require('mongoose-sequence')(mongoose)
const noteSchema = new mongoose.Schema({
    username:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref : User
    },
    title: {
        type: String,
    },
    text: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: false
    }

})
noteSchema.plugin(AuthoIncrement,{
    inc_field: 'ticket',
    id: 'ticketNoms',
    start_res : 500
})

module.exports = mongoose.model('Note',noteSchema)