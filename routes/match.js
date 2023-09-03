const express = require('express')
const { Match, Tournoi } = require('../models')
const router = express.Router()
router.post('/', async (req, res) => {
  try {
    const { date, listeEquipes, tournoi, arbitre, duree } = req.body

    const match = new Match({ date, listeEquipes, tournoi, arbitre, duree })
    match.save().then(async (savedmatch) => {
      const t = await Tournoi.findById(tournoi)
      listeEquipes.map((equipe) => {
        t.classement.push({ equipe: equipe, points: 0 })
      })
      t.save().then((savedTournoi) => res.send(savedmatch))
    })
  } catch (error) {
    res.status(500).send(error)
  }
})

router.put('/', async (req, res) => {
  try {
    const { id, supprime, date, listeEquipes, tournoi, arbitre, duree } =
      req.body
    const match = await Match.findById(id)
    if (match) {
      Object.assign(match, {
        supprime: supprime ? supprime : match.supprime,
        date: date ? date : match.date,
        listeEquipes: listeEquipes ? listeEquipes : match.listeEquipes,
        tournoi: tournoi ? tournoi : match.tournoi,
        arbitre: arbitre ? arbitre : match.arbitre,
        duree: duree ? duree : match.duree,
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
