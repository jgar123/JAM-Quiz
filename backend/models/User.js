const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number },
  username: { type: String }
})

module.exports = mongoose.model('User', userSchema)