// models/user.js
const mongoose = require('mongoose');

const cardFormSchema = new mongoose.Schema({
  cardHolderName: {
    type: String
  },
  cardNumber: {
    type: Number
  }
})

module.exports = mongoose.model('Account', cardFormSchema)