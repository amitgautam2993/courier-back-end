const mongoose = require('mongoose');

const CodeSchema = new mongoose.Schema({
  name: String,
  code: String
});

module.exports = mongoose.model('Code', CodeSchema);
