const { Schema, model } = require('mongoose')
const userSchema = new Schema({
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  motPasse: { type: String },
  crypted: { type: String },
  role: { type: String },
  type: { type: String },
  cree: { type: Date, default: Date.now },
  supprime: { type: Date, default: null },
})

const User = model('users', userSchema)
User.createIndexes()
module.exports = User
