const mongoose = require('mongoose')
const catSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  iconClass: {
    type: String,
    required: true
  },
  createAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Category', catSchema)
