const express = require('express')
const { Action } = require('../models')
const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const { match, type, temps } = req.body
    const action = new Action({ match, type, temps })
    action.save().then((savedaction) => {
      res.send(savedaction)
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
