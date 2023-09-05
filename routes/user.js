const express = require('express')
const User = require('../models/user')
const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const { username, email, motPasse, role } = req.body
    const user = new User({ username, email, motPasse, role })
    user
      .save()
      .then((savedUser) => {
        res.send(savedUser)
      })
      .catch((error) => {
        if (error.keyValue) {
          res.status(400).send('email existe déja')
        } else res.status(500).send(error)
      })
  } catch (error) {
    res.status(500).send(error)
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, motPasse } = req.body
    const user = await User.findOne({ email })
    if (user) {
      if (user.motPasse === motPasse) {
        if (user.supprime) {
          res.status(500).send('DELETED_USER')
        } else res.send(user)
      } else res.status(500).send('INVALID_PASSWORD')
    } else res.status(500).status(500).send('EMAIL_NOT_FOUND')
  } catch (error) {}
})

router.put('/', async (req, res) => {
  try {
    const { id, username, email, motPasse, role, supprime } = req.body
    const user = await User.findById(id)
    if (user) {
      Object.assign(user, {
        username: username ? username : user.username,
        email: email ? email : user.email,
        motPasse: motPasse ? motPasse : user.motPasse,
        role: role ? role : user.role,
        supprime: supprime ? supprime : user.supprime,
      })
      user.save().then((savedUser) => {
        res.send(savedUser)
      })
    }
  } catch (error) {}
})

router.get('/', async (req, res) => {
  try {
    const { filter } = req.query
    const users = await User.find(JSON.parse(filter))
    res.send(users)
  } catch (error) {
    res.status(500).send(error)
  }
})

module.exports = router
