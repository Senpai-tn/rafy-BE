const { Schema, model } = require('mongoose')
const tournoiSchema = new Schema({
  libelle: String,
  type: String,
  listeMatch: {
    type: [{ type: Schema.Types.ObjectId, ref: 'matchs' }],
    default: [],
  },
  startDate: { type: Date, default: null },
  endDate: { type: Date, default: null },
  cree: { type: Date, default: Date.now },
  supprime: { type: Date, default: null },
  staff: { type: Schema.Types.ObjectId, ref: 'users' },
  classement: {
    type: [
      {
        equipe: { type: Schema.Types.ObjectId, ref: 'equipes' },
        points: Number,
      },
    ],
    default: [],
  },
})

const Tournoi = model('tournois', tournoiSchema)
module.exports = Tournoi
