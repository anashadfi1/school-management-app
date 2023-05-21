const mongoose = require('mongoose')

const examSchema = new mongoose.Schema({
    
    Nom: {
        type: String,
        required: true
    }
    ,
    Filliere: {
        type: String,
        required: true
    }
    ,
    Matiere: {
        type: String,
        required: true
    },
    Completed: {
        type: Boolean,
        required: true
    }
})
module.exports = mongoose.model('Exam',examSchema)