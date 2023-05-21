const express = require('express')
const {  loginUser, signupUser, currentUser } = require('../controllers/userController')
const router = express.Router()
const userController = require('../controllers/userController')
const vAccess = require('../middleware/validAccess')
// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)
router.get('/current',vAccess,currentUser);



module.exports = router