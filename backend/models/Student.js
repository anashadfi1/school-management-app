const mongoose = require('mongoose');

const EtudiantSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  N_Apo: {
    type: String,
    required: true,
  },
  CNE: {
    type: String,
    required: true,
  },
  Nom: {
    type: String,
    required: true,
  },
  Prenom: {
    type: String,
    required: true,
  },
  Filiere: {
    type: String,
    required: true,
  },
  Semestre: {
    type: String,
    required: true,
  },
  Ex_M1: {
    type: Number,
    required: true,
  },
  Ex_M2: {
    type: Number,
    required: true,
  },
  Ex_M3: {
    type: Number,
    required: true,
  },
  Ex_M4: {
    type: Number,
    required: true,
  },
  Ex_M5: {
    type: Number,
    required: true,
  },
  M6: {
    type: String,
    required: true,
  },
  Ex_M6: {
    type: Number,
    required: true,
  },
  NTab_M6: {
    type: Number,
    required: true,
  },
  Loc_M6: {
    type: String,
    required: true,
  },
  Date_M6: {
    type: Date,
    required: true,
  },
});

const Etudiant = mongoose.model('Etudiant', EtudiantSchema);

module.exports = Etudiant;
//Filliere, _id, N_Appo, CNE, Nom, Prenom, Semestre, Ex_M1, Ex_M2,Ex_M3, Ex_M4, Ex_M5, M6, Ex_M6, NTab_M6, Loc_M6, Date_M6
