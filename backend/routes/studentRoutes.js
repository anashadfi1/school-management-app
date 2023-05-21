const express = require('express')
const router = express.Router()
const studentsController = require('../controllers/studentsController')

router.route('/')
    .get(studentsController.getAllStudents)
    .post(studentsController.createNewStudent)
    .put(studentsController.updateStudent)
    .delete(studentsController.deleteStudent)

module.exports = router