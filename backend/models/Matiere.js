const mongoose = require('mongoose')

const moduleSchema = new mongoose.Schema({
    
    Nom: {
        type: String,
        required: true
    },
    
    Filliere: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model('Module',moduleSchema)