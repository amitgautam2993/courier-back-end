const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courierDataSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  courierDetails: [{
    
    cnumber: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    destination:{
      type:String,
      required:true
    },
    type:{
      type:String,
      required:true
    },
    pc:{
      type:Number,
      required:true
    },
    rate:{
      type:Number,
      required:true,
    },
    weight:{
      type:Number,
      required:true,
    },
    amount:{
      type:Number,
      required:true,
    },
    couriercode:{
      type:String,
      required:true
    },

    createDate: {
      type: Date,
      default: Date.now
    },
    modifiedDate: {
      type: Date,
      default: Date.now
    }
  }]
  
});
courierDataSchema.pre('save', function (next) {
  this.courierDetails.forEach(detail => {
    detail.modifiedDate = Date.now();
  });
  next();
})

module.exports = mongoose.model('CourierData', courierDataSchema);



// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;

// var courierDataSchema = new Schema({
//     id: {
//         type: String,
//         required: true},
//     cnumber: {
//         type: String,
//         required: true
//     },
//     date: {
//         type: String,
//         required: true
//     },
//     // destination: {
//     //     type: String,
//     //     required: false
//     // },
//     // type: {
//     //     type: String,
//     //     required: false
//     // },
//     // piece: {
//     //     type: Number,
//     //     required: false
//     // },
//     // rate: {
//     //     type: Number,
//     //     required: false
//     // },
//     // weight: {
//     //     type: Number,
//     //     required: false
//     // },
//     // amount: {
//     //     type: Number,
//     //     required: false
//     // }
// });

// module.exports = mongoose.model('courierData', courierDataSchema);

// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;

// var courierDataSchema = new Schema({
//     id: {
//         type: String,
//         required: true
//     },
//     cnumber: {
//         type: String,
//         required: true
//     },
//     date: {
//         type: String,
//         required: true
//     }
// });

// module.exports = mongoose.model('courierData', courierDataSchema);

