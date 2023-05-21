const user = require('../models/User')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

const createNewUser = asyncHandler(async (req, res) => {
  const {  username, password, active} = req.body

  // }
  const obj = new User(req.body)
  obj.save().then(resp=>{
      return res.json("object saved")
  })
})
// login a user
const loginUser = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await user.login(email, password)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// signup a user
const signupUser = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await user.signup(email, password)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}
// const currentUser = asyncHandler(async (req, res) => {
     
//   res.json(req.user);
// });



module.exports = { createNewUser,signupUser, loginUser };