const User = require('../models/User')
const Note = require('../models/Note')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const Student = require('../models/Student')
const { id } = require('date-fns/locale')
const { response } = require('express')

// @desc Get all students
// @route GET /users
// @access Private
const getAllStudents = asyncHandler(async (req, res) => {
    // Get all users from MongoDB
    const students = await Student.find();

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
    const {  _id, N_Appo, CNE, Nom, Prenom, Filiere, Semestre, Ex_M1, Ex_M2,Ex_M3, Ex_M4, Ex_M5, M6, Ex_M6, NTab_M6, Loc_M6, Date_M6} = req.body

    // }
    const obj = new Student(req.body)
    obj.save().then(resp=>{
        return res.json("object saved")
    })
})

// @desc Update a Student
// @route PATCH /students
// @access Private
const updateStudent = asyncHandler(async (req, res) => {
    console.log(req.body.id)
    console.log(req.body)
    Student.findByIdAndUpdate({_id: req.body.id},req.body,{new:true}).then(updatedObject=>{
        return res.json({message: "successfully updated "})
    })
})

// @desc Delete a Student
// @route DELETE /students
// @access Private
const deleteStudent = asyncHandler(async (req, res) => {
    

    Student.findByIdAndDelete(req.body.id).then((item)=>{
        return res.json({
            message: "successfully deleted!!!!!"
        })
    })
})

module.exports = {
    getAllStudents,
    createNewStudent,
    updateStudent,
    deleteStudent
}