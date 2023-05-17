const mongoose = require('mongoose')

const semestreSchema = new mongoose.Schema({
    
    Nom: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model('Semestre',semestreSchema)