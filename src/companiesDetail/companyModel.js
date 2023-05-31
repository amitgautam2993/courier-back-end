var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var companiesDetailSchema = new Schema({

    Companyname: {
        type: String,
        required: true
    },
    Ownername: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    shippercode:{
        type: String,
        required: true
    },
    companyid:{
        type:String,
        required:true
    }
})
module.exports = mongoose.model('companiesDetail', companiesDetailSchema);