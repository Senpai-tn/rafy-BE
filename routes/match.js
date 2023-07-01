const express = require('express')
const { Match } = require('../models')
const router = express.Router()
router.post('/', async (req, res) => {
  try {
    const { date, listeEquipes, tournoi } = req.body
    const match = new Match({ date, listeEquipes, tournoi })
    match.save().then((savedmatch) => {
      res.send(savedmatch)
    })
  } catch (error) {
    res.status(500).send(error)
  }
})

router.put('/', async (req, res) => {
  try {
    const { id, supprime, date, listeEquipes, tournoi } = req.body
    const match = await Match.findById(id)
    if (match) {
      Object.assign(match, {
        supprime: supprime ? supprime : match.supprime,
        date: date ? date : match.date,
        listeEquipes: listeEquipes ? listeEquipes : match.listeEquipes,
        tournoi: tournoi ? tournoi : match.tournoi,
      })
      match.save().then((savedmatch) => {
        res.send(savedmatch)
      })
    }
  } catch (error) {
    res.status(500).send(error)
  }
})

router.get('/', async (req, res) => {
  try {
    const { filter } = req.query
    const matchs = await Match.find(JSON.parse(filter)).populate('listeEquipes')
    res.send(matchs)
  } catch (error) {
    res.status(500).send(error)
  }
})
module.exports = router
