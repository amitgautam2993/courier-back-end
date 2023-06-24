var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var companiesDetailSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  companies: [
    {
      company: {
        type: String,
        required: true
      },
      firstname: {
        type: String,
        required: true
      },
      lastname: {
        type: String,
        required: true
      },
      address: {
        type: String,
        required: true
      },
      shippercode: {
        type: String,
        required: true
      },
     
      email: {
        type: String,
        required: true
      },
      city: {
        type: String,
        required: true
      },
      state: {
        type: String,
        required: true
      },
      postalcode: {
        type: Number,
        required: true
      },
      country: {
        type: String,
        required: true
      },
      createDate: {
        type: Date,
        default: Date.now
      },
    }
  ]
});

module.exports = mongoose.model('companiesDetail', companiesDetailSchema);
