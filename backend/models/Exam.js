const mongoose = require('mongoose')

const examSchema = new mongoose.Schema({
    
    Nom: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model('Exam',examSchema)