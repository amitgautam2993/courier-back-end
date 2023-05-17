var companyModel = require('./companyModel')
const countersModel = require('../model/counters')

module.exports.companiesDetailServices = (companyDetails) => {
    return new Promise((resolve, reject) => {
      companyModel.findOne({ Companyname: companyDetails.Companyname }, (err, company) => {
        if (err) {
          console.log(err);
          reject(false);
          return;
        }
        if (company) {
          console.log('Duplicate found');
          resolve(false);
          return;
        }
  
        countersModel.findOneAndUpdate(
          { _id: "companyid" },
          { $inc: { seq: 1 } },
          { new: true},
          (error, counter) => {
            if (error) {
              console.log(error);
              reject(false);
              return;
            }
            const companyId = counter.seq.toString().padStart(4, '0');

            const companyModelData = new companyModel();
            companyModelData.companyid = companyId;
            companyModelData.Companyname = companyDetails.Companyname;
            companyModelData.Ownername = companyDetails.Ownername;
            companyModelData.email = companyDetails.email;
            companyModelData.address = companyDetails.address;
  
            companyModelData.save((error, result) => {
              if (error) {
                reject(false);
                console.log(error);
              } else {
                resolve(true);
              }
            });
          }
        );
      });
    });
  };
  
module.exports.getCompaniesDetailServices = ()=>{

    return new Promise(function myFn(resolve, reject) {
        companyModel.find(function resultHandle(error,result){
            if(error){
                reject(false);

            }
            else{
                resolve(result);
                console.log(result)
            }
        })
    }

    )
}
