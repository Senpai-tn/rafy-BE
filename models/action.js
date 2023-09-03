const { Schema, model } = require('mongoose')
const actionSchema = new Schema({
  match: { type: Schema.Types.ObjectId, ref: 'matchs' },
  type: String,
  temps: String,
  score: String,
  cree: { type: Date, default: Date.now },
  supprime: { type: Date, default: null },
})

const Action = model('actions', actionSchema)

module.exports = Action
