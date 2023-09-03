const express = require('express')
const { Action, Match, Tournoi } = require('../models')
const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const { match, type, temps, score } = req.body

    const action = new Action({ match, type, temps, score })
    action.save().then(async (savedaction) => {
      const m = await Match.findById(match).populate('listeEquipes')
      const t = await Tournoi.findById(m.tournoi)
      if (type === 'score') {
        const splittedScore = score.split('-')
        t.classement = t.classement.map((classement) => {
          return classement.equipe.toString() ==
            m.listeEquipes[0]._id.toString()
            ? {
                equipe: m.listeEquipes[0]._id,
                points:
                  splittedScore[0] * 1 > splittedScore[1] * 1
                    ? classement.points + 3
                    : splittedScore[0] * 1 == splittedScore[1] * 1
                    ? classement.points + 1
                    : classement.points,
              }
            : classement.equipe.toString() == m.listeEquipes[1]._id.toString()
            ? {
                equipe: m.listeEquipes[1]._id,
                points:
                  splittedScore[1] * 1 > splittedScore[0] * 1
                    ? classement.points + 3
                    : splittedScore[1] * 1 == splittedScore[0] * 1
                    ? classement.points + 1
                    : classement.points,
              }
            : classement
        })
      }
      t.save().then((savedTournoi) => res.send(savedaction))
    })
  } catch (error) {
    res.status(500).send(error)
  }
})

//modification + supprission
router.put('/', async (req, res) => {
  try {
    const { id, supprime, match, type, temps } = req.body
    const action = await Action.findById(id)
    if (action) {
      Object.assign(action, {
        supprime: supprime ? supprime : action.supprime,
        match: match ? match : action.match,
        type: type ? type : action.type,
        temps: temps ? temps : action.temps,
      })
      action.save().then((savedaction) => {
        res.send(savedaction)
      })
    }
  } catch (error) {
    res.status(500).send(error)
  }
})

router.get('/', async (req, res) => {
  try {
    const { filter } = req.query
    const actions = await Action.find(JSON.parse(filter))
      .populate('match')
      .populate({
        path: 'match',
        populate: { path: 'listeEquipes' },
      })
    res.send(actions)
  } catch (error) {
    res.status(500).send(error)
  }
})
module.exports = router
