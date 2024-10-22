// var courierDataModel = require('./courierdataModel')

// module.exports.courierDataService=(courierDataDetail)=>{

//     return new Promise(function myFn(resolve,reject){

//         var courierdataModelData = new courierDataModel();

//         courierdataModelData.cnumber= courierDataDetail.cnumber
//         courierdataModelData.date= courierDataDetail.date

//         courierdataModelData.save(function resultHandle(error,result){
           
//             if (error) {
//                 reject(false);
//                 console.log(error)
//             } else {
//                 resolve(true);
//             }
//         })
//     })

// }

const { reject } = require('lodash');
const courierDataModel = require('./courierdataModel');


module.exports = updateCourierDataService;

module.exports.courierDataService = (id, courierDataDetail) => {
  return new Promise(function myFn(resolve, reject) {
    let courierdataModelData = {
      cnumber: courierDataDetail.cnumber,
      date: courierDataDetail.date,
      destination:courierDataDetail.destination,
      type:courierDataDetail.type,
      pc:courierDataDetail.pc,
      rate:courierDataDetail.rate,
      weight:courierDataDetail.weight,
      amount:courierDataDetail.amount,
      couriercode:courierDataDetail.couriercode,
    };
    courierdataModelData = new courierDataModel(courierdataModelData);
    createCourierDataFn(id, courierdataModelData)
      .then(result => resolve(result))
      .catch(err => reject(err));
  });
}


