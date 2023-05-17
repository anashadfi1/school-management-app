const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    CNE:{
        type: String,
        required: true
    },
    Nom: {
        type: String,
        required: true
    },
    Prenom: [{
        type: String,
        default: "Student"
    }],
    Filliere: {
        type: String,
        default: "SMA"
    }

})
// get a single student


module.exports = mongoose.model('Student',studentSchema)