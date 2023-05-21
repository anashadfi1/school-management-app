const User = require('../models/User')
const Note = require('../models/Note')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const Student = require('../models/Student')
const { id } = require('date-fns/locale')

// @desc Get all students
// @route GET /users
// @access Private
const getAllStudents = asyncHandler(async (req, res) => {
    // Get all users from MongoDB
    const students = await Student.find().all();

    // If no students 
    if (!students?.length) {
        return res.status(400).json({ message: 'No students found' })
    }

   return res.json(students)
})

// @desc Create new Student
// @route POST /students
// @access Private
const createNewStudent = asyncHandler(async (req, res) => {
    const { Filliere, _id, N_Appo, CNE, Nom, Prenom, Semestre, Ex_M1, Ex_M2,Ex_M3, Ex_M4, Ex_M5, M6, Ex_M6, NTab_M6, Loc_M6, Date_M6} = req.body

    // Confirm data
    if (Filliere || _id || N_Appo || CNE || Nom || Prenom || Semestre || Ex_M1 || Ex_M2 || Ex_M3 || Ex_M4 || Ex_M5 || M6 || Ex_M6 || NTab_M6 || Loc_M6 || Date_M6) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate Nom
    const duplicate = await Student.findOne({ Nom }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate Nom' })
    }

    // Hash Filliere 
    const hashedPwd = await bcrypt.hash(Filliere, 10) // salt rounds

    const StudentObject = { Filliere, _id, N_Appo, CNE, Nom, Prenom, Semestre, Ex_M1, Ex_M2,Ex_M3, Ex_M4, Ex_M5, M6, Ex_M6, NTab_M6, Loc_M6, Date_M6}

    // Create and store new Student 
    const Student = await Student.create(StudentObject)

    if (Student) { //created 
        res.status(201).json({ message: `New Student ${Nom} created` })
    } else {
        res.status(400).json({ message: 'Invalid Student data received' })
    }
})

// @desc Update a Student
// @route PATCH /students
// @access Private
const updateStudent = asyncHandler(async (req, res) => {
    const { Filliere, _id, N_Appo, CNE, Nom, Prenom, Semestre, Ex_M1, Ex_M2,Ex_M3, Ex_M4, Ex_M5, M6, Ex_M6, NTab_M6, Loc_M6, Date_M6} = req.body

    // Confirm data 
    if (!_id || !CNE || !N_Appo || !Prenom || !Semestre) {
        return res.status(400).json({ message: 'All fields except Filliere are required' })
    }

    // Does the Student exist to update?
    const Student = await Student.findById(id).exec()

    if (!Student) {
        return res.status(400).json({ message: 'Student not found' })
    }

    // Check for duplicate 
    const duplicate = await Student.findOne({ Nom }).lean().exec()

    // Allow updates to the original Student 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate Nom' })
    }

    Student.Nom = Nom
    Student.roles = roles
    Student.active = active

    if (Filliere) {
        // Hash Filliere 
        Student.Filliere = await bcrypt.hash(Filliere, 10) // salt rounds 
    }

    const updatedStudent = await Student.save()

    res.json({ message: `${updatedStudent.Nom} updated` })
})

// @desc Delete a Student
// @route DELETE /students
// @access Private
const deleteStudent = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Student ID Required' })
    }

    // Does the Student still have assigned notes?
    const student = await Student.findOne({ Student: id }).lean().exec()
    if (note) {
        return res.status(400).json({ message: 'Student has assigned notes' })
    }

    // Does the Student exist to delete?
    const Student = await Student.findById(id).exec()

    if (!Student) {
        return res.status(400).json({ message: 'Student not found' })
    }

    const result = await Student.deleteOne()

    const reply = `Nom ${result.Nom} with ID ${result._id} deleted`

    res.json(reply)
})

module.exports = {
    getAllStudents,
    createNewStudent,
    updateStudent,
    deleteStudent
}