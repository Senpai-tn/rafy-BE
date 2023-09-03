const express = require('express')
const { Tournoi } = require('../models')
const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const { libelle, type, startDate, endDate, staff } = req.body
    const tournoi = new Tournoi({ libelle, type, startDate, endDate, staff })
    tournoi.save().then((savedTournoi) => {
      res.send(savedTournoi)
    })
  } catch (error) {
    res.status(500).send(error)
  }
})

router.put('/', async (req, res) => {
  try {
    const {
      id,
      libelle,
      type,
      supprime,
      listeMatch,
      startDate,
      endDate,
      staff,
      classement,
    } = req.body
    const tournoi = await Tournoi.findById(id)
    if (tournoi) {
      Object.assign(tournoi, {
        libelle: libelle ? libelle : tournoi.libelle,
        type: type ? type : tournoi.type,
        supprime: supprime ? supprime : tournoi.supprime,
        listeMatch: listeMatch ? listeMatch : tournoi.listeMatch,
        startDate: startDate ? startDate : tournoi.startDate,
        endDate: endDate ? endDate : tournoi.endDate,
        staff: staff ? staff : tournoi.staff,
        classement: classement ? classement : tournoi.classement,
      })
      tournoi.save().then((savedTournoi) => {
        res.send(savedTournoi)
      })
    }
  } catch (error) {
    res.status(500).send(error)
  }
})

router.get('/', async (req, res) => {
  try {
    const { filter } = req.query
    const tournois = await Tournoi.find(JSON.parse(filter)).populate('staff')
    res.send(tournois)
  } catch (error) {
    res.status(500).send(error)
  }
})
module.exports = router
