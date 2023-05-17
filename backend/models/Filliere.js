const mongoose = require('mongoose')

const filliereSchema = new mongoose.Schema({
    
    Nom: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model('User',filliereSchema)