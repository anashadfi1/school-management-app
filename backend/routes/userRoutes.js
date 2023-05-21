const express = require('express')
const {  createNewUser,loginUser, signupUser } = require('../controllers/userController')
const router = express.Router()
const userController = require('../controllers/userController')
const vAccess = require('../middleware/validAccess')
// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)
router.post('/signup', signupUser)

router.get('/current',vAccess);
router.post('/current',createNewUser);



module.exports = router