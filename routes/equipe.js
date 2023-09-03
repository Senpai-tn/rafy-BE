const express = require('express')
const { Equipe } = require('../models')
const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const { nom, listeJoueurs } = req.body
    const equipe = new Equipe({ nom, listeJoueurs })
    equipe.save().then((savedequipe) => {
      res.send(savedequipe)
    })
  } catch (error) {
    res.status(500).send(error)
  }
})

router.put('/', async (req, res) => {
  try {
    const { id, supprime, nom, listeJoueurs } = req.body
    const equipe = await Equipe.findById(id)
    if (equipe) {
      Object.assign(equipe, {
        supprime: supprime ? supprime : equipe.supprime,
        nom: nom ? nom : equipe.nom,
        listeJoueurs: listeJoueurs ? listeJoueurs : equipe.listeJoueurs,
      })
      equipe.save().then((savedequipe) => {
        res.send(savedequipe)
      })
    }
  } catch (error) {
    res.status(500).send(error)
  }
})

router.get('/', async (req, res) => {
  try {
    const { filter } = req.query
    const equipes = await Equipe.find(JSON.parse(filter)).populate(
      'listeJoueurs'
    )
    res.send(equipes)
  } catch (error) {
    res.status(500).send(error)
  }
})
module.exports = router
