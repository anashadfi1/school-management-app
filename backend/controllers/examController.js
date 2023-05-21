const Exam = require('../models/Exam')
const User = require('../models/User')
const asyncHandler = require('express-async-handler')

// @desc Get all exams 
// @route GET /exams
// @access Private
const getAllExams = asyncHandler(async (req, res) => {
    // Get all exams from MongoDB
    const exams = await Exam.find().lean()

    // If no exams 
    if (!exams?.length) {
        return res.status(400).json({ message: 'No exams found' })
    }

    // // Add username to each exam before sending the response 
    // // See Promise.all with map() here: https://youtu.be/4lqJBBEpjRE 
    // // You could also do this with a for...of loop
    // const examsWithUser = await Promise.all(exams.map(async (exam) => {
    //     const exam = await Exam.findById(exam.user).lean().exec()
    //     return { ...exam, username: user.username }
    // }))

    res.json(examsWithUser)
})

// @desc Create new exam
// @route POST /exams
// @access Private
const createNewExam = asyncHandler(async (req, res) => {
    const { nom, filliere, matiere,completed} = req.body

    // Confirm data
    if (!nom || !filliere || !matiere || !completed) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate title
    const duplicate = await Exam.findOne({ title }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate exam ' })
    }

    // Create and store the new user 
    const exam = await Exam.create({ nom, filliere, matiere,completed})

    if (exam) { // Created 
        return res.status(201).json({ message: 'New exam created' })
    } else {
        return res.status(400).json({ message: 'Invalid exam data received' })
    }

})

// @desc Update a Exam
// @route PATCH /exams
// @access Private
const updateExam = asyncHandler(async (req, res) => {
    const { id, nom, matiere, filliere} = req.body

    // Confirm data
    if (!id || !nom || !matiere || !filliere || typeof completed !== 'boolean') {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Confirm exam exists to update
    const exam = await Exam.findById(id).exec()

    if (!exam) {
        return res.status(400).json({ message: 'Exam not found' })
    }

    // Check for duplicate matiere
    const duplicate = await Exam.findOne({ matiere }).lean().exec()

    // Allow renaming of the original exam 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate exam ' })
    }

    exam.nom = nom
    exam.matiere = matiere
    exam.filliere = filliere
    exam.completed = completed

    const updateExam = await exam.save()

    res.json(`'${updateExam.title}' updated`)
})

// @desc Delete a exam
// @route DELETE /exams
// @access Private
const deleteExam = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Exam ID required' })
    }

    // Confirm exam exists to delete 
    const exam = await Exam.findById(id).exec()

    if (!exam) {
        return res.status(400).json({ message: 'Exam not found' })
    }

    const result = await exam.deleteOne()

    const reply = `Exam '${result.title}' with ID ${result._id} deleted`

    res.json(reply)
})

module.exports = {
    getAllExams,
    createNewExam,
    updateExam,
    deleteExam
}