const express = require('express')
const router = express.Router()
const User = require('../models/User')


// Getting all users
router.get('/', async (req, res) => {
  try {

    const documentCount = await User.countDocuments({});
    if (documentCount == 0) {
      res.json({
        message: 'No users'
      })
    }

    const users = await User.find()
    res.json(users)
  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
})

//Getting one user
router.get('/:id', getUser, (req, res) => {
  res.json(res.user)
})

// Creating one user
router.post('/', async (req, res) => {
  const isUser = await isUserExisted(req);
  if (isUser) {
    res.json({
      message: "User existed"
    });
  } else {
    const user = new User({
      email: req.body.email,
      password: req.body.password,
      age: req.body.age
    })

    try {
      const newUser = await user.save()
      res.status(201).json(newUser)
    } catch (err) {
      res.status(400).json({
        message: err.message
      })
    }
  }
})

// Updating one user
router.patch('/:id', getUser, async (req, res) => {
  if (req.body.email != null) {
    res.user.email = req.body.email
  }
  if (req.body.password != null) {
    res.user.password = req.body.password
  }
  if (req.body.age != null) {
    res.user.age = req.body.age
  }
  try {
    const updatedUser = await res.user.save()
    res.json(updatedUser)
  } catch {
    res.status(400).json({
      message: err.message
    })
  }

})

// Deleting one user
router.delete('/:id', getUser, async (req, res) => {
  try {
    await res.user.remove()
    res.json({
      message: 'Deleted This User'
    })
  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
})

async function getUser(req, res, next) {
  try {
    user = await User.findById(req.params.id)
    if (user == null) {
      return res.status(404).json({
        message: 'Cant find User'
      })
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message
    })
  }

  res.user = user
  next()
}

async function isUserExisted(req) {
  try {
    user = await User.findOne({
      email: req.body.email
    });
    if (user == null) {
      return false;
    } else return true;
  } catch (err) {
    return false;
  }
}


module.exports = router;