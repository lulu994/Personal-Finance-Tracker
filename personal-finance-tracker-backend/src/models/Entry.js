const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  type: { type: String, enum: ['income', 'expense', 'savings'], required: true },
  date: { type: Date, default: Date.now },
});

const Entry = mongoose.model('Entry', entrySchema);

module.exports = Entry;
