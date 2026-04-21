const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  url: { type: String, required: true },
  category: { 
    type: String, 
    required: true,
    enum: ['gusaba', 'church', 'reception', 'photoshoot']
  },
  gallery: { type: mongoose.Schema.Types.ObjectId, ref: 'Gallery', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Photo', photoSchema);