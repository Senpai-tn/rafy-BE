const express = require('express')
const { Materiel } = require('../models')
const router = express.Router()
router.post('/', async (req, res) => {
  try {
    const {} = req.body
    const materiel = new Materiel({})
    materiel.save().then((savedMateriel) => {
      res.send(savedMateriel)
    })
  } catch (error) {
    res.status(500).send(error)
  }
})

router.put('/', async (req, res) => {
  try {
    const { id, supprime } = req.body
    const materiel = await Materiel.findById(id)
    if (materiel) {
      Object.assign(materiel, { supprime })
      materiel.save().then((savedMateriel) => {
        res.send(savedMateriel)
      })
    }
  } catch (error) {
    res.status(500).send(error)
  }
})

router.get('/', async (req, res) => {
  try {
    const { filter } = req.query
    const materiel = await Materiel.find(filter)
    res.send(materiel)
  } catch (error) {
    res.status(500).send(error)
  }
})
module.exports = router
