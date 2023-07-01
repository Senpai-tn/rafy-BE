const { Schema, model } = require('mongoose')
const matchSchema = new Schema({
  date: Date,
  listeEquipes: [{ type: Schema.Types.ObjectId, ref: 'equipes' }],
  tournoi: { type: Schema.Types.ObjectId, ref: 'tournois' },
  cree: { type: Date, default: Date.now },
  supprime: { type: Date, default: null },
})
const Match = model('matchs', matchSchema)
module.exports = Match
