const express = require('express')
const router = express.Router()
const examController = require('../controllers/examController')

router.route('/')
    .get(examController.getAllExams)
    .post(examController.createNewExam)
    .patch(examController.updateExam)
    .delete(examController.deleteExam)

module.exports = router