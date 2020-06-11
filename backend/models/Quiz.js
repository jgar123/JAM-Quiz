const mongoose = require('mongoose')

const quizSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quizID: { type: String, required: true }
})

module.exports = mongoose.model('Quiz', quizSchema)