var companyModel = require('./companyModel')
const countersModel = require('../model/counters')
const companiesDetailModel = require('./companyModel')

//company and shipper code with telling username-->
module.exports.companiesDetailServices = (username, companyDetails) => {
  return new Promise((resolve, reject) => {
    // Check if the company or shipper code already exists for any user
    companiesDetailModel.findOne(
      {
        $or: [
          { 'companies.company': companyDetails.company },
          { 'companies.shippercode': companyDetails.shippercode },
        ],
      },
      (err, existingCompany) => {
        if (err) {
          console.log(err);
          reject(false);
          return;
        }
        if (existingCompany) {
          const duplicateCompany = existingCompany.companies.find(
            (company) => company.company === companyDetails.company
          );
          const duplicateShipperCode = existingCompany.companies.find(
            (company) => company.shippercode === companyDetails.shippercode
          );

          if (duplicateCompany) {
            const duplicateUsername = existingCompany.username;
            reject(`Duplicate company name for username: ${duplicateUsername}`);
            return;
          }
          if (duplicateShipperCode) {
            const duplicateUsername = existingCompany.username;
            reject(`Duplicate shipper code for username: ${duplicateUsername}`);
            return;
          }
        }

        // Find the specific user
        companiesDetailModel.findOne({ username: username }, (error, user) => {
          if (error) {
            reject(false);
            console.log(error);
            return;
          }
          if (user) {
            // Add the new company to the user's array of companies
            user.companies.push({
              company: companyDetails.company,
              firstname: companyDetails.firstname,
              lastname: companyDetails.lastname,
              address: companyDetails.address,
              shippercode: companyDetails.shippercode,
              companyid: companyDetails.companyid,
              email: companyDetails.email,
              city: companyDetails.city,
              state: companyDetails.state,
              postalcode: companyDetails.postalcode,
              country: companyDetails.country,
            });

            user.save((error, result) => {
              if (error) {
                reject(false);
                console.log(error);
              } else {
                resolve(true);
              }
            });
          } else {
            // If the user doesn't exist, create a new user with the company details
            const newUser = new companiesDetailModel({
              username: username,
              companies: [
                {
                  company: companyDetails.company,
                  firstname: companyDetails.firstname,
                  lastname: companyDetails.lastname,
                  address: companyDetails.address,
                  shippercode: companyDetails.shippercode,
                  companyid: companyDetails.companyid,
                  email: companyDetails.email,
                  city: companyDetails.city,
                  state: companyDetails.state,
                  postalcode: companyDetails.postalcode,
                  country: companyDetails.country,
                },
              ],
            });

            newUser.save((error, result) => {
              if (error) {
                reject(false);
                console.log(error);
              } else {
                resolve(true);
              }
            });
          }
        });
      }
    );
  });
};






//company and shipper code without telling username-->
// module.exports.companiesDetailServices = (username, companyDetails) => {
//   return new Promise((resolve, reject) => {
//     // Check if the company or shipper code already exists for any user
//     companiesDetailModel.findOne(
//       {
//         $or: [
//           { 'companies.company': companyDetails.company },
//           { 'companies.shippercode': companyDetails.shippercode },
//         ],
//       },
//       (err, existingCompany) => {
//         if (err) {
//           console.log(err);
//           reject(false);
//           return;
//         }
//         if (existingCompany) {
//           const duplicateCompany = existingCompany.companies.find(
//             (company) => company.company === companyDetails.company
//           );
//           const duplicateShipperCode = existingCompany.companies.find(
//             (company) => company.shippercode === companyDetails.shippercode
//           );

//           if (duplicateCompany) {
//             reject('Duplicate company name');
//             return;
//           }
//           if (duplicateShipperCode) {
//             reject('Duplicate shipper code');
//             return;
//           }
//         }

//         // Find the specific user
//         companiesDetailModel.findOne({ username: username }, (error, user) => {
//           if (error) {
//             reject(false);
//             console.log(error);
//             return;
//           }
//           if (user) {
//             // Add the new company to the user's array of companies
//             user.companies.push({
//               company: companyDetails.company,
//               firstname: companyDetails.firstname,
//               lastname: companyDetails.lastname,
//               address: companyDetails.address,
//               shippercode: companyDetails.shippercode,
//               companyid: companyDetails.companyid,
//               email: companyDetails.email,
//               city: companyDetails.city,
//               state: companyDetails.state,
//               postalcode: companyDetails.postalcode,
//               country: companyDetails.country,
//             });

//             user.save((error, result) => {
//               if (error) {
//                 reject(false);
//                 console.log(error);
//               } else {
//                 resolve(true);
//               }
//             });
//           } else {
//             // If the user doesn't exist, create a new user with the company details
//             const newUser = new companiesDetailModel({
//               username: username,
//               companies: [
//                 {
//                   company: companyDetails.company,
//                   firstname: companyDetails.firstname,
//                   lastname: companyDetails.lastname,
//                   address: companyDetails.address,
//                   shippercode: companyDetails.shippercode,
//                   companyid: companyDetails.companyid,
//                   email: companyDetails.email,
//                   city: companyDetails.city,
//                   state: companyDetails.state,
//                   postalcode: companyDetails.postalcode,
//                   country: companyDetails.country,
//                 },
//               ],
//             });

//             newUser.save((error, result) => {
//               if (error) {
//                 reject(false);
//                 console.log(error);
//               } else {
//                 resolve(true);
//               }
//             });
//           }
//         });
//       }
//     );
//   });
// };



// module.exports.companiesDetailServices = (username,companyDetails) => {
//   return new Promise((resolve, reject) => {
//     companyModel.findOne({ $or: [{ company: companyDetails.company }, { shippercode: companyDetails.shippercode }] }, (err, company) => {
//       if (err) {
//         console.log(err);
//         reject(false);
//         return;
//       }
//       if (company) {
//         if (company.company === companyDetails.company) {
//           reject('Duplicate company name');
//         } else if (company.shippercode === companyDetails.shippercode) {
//           reject('Duplicate shipper code');
//         }
//         return;
//       }

//       countersModel.findOneAndUpdate(
//         { _id: "companyid" },
//         { $inc: { seq: 1 } },
//         { new: true },
//         (error, counter) => {
//           if (error) {
//             console.log('hi', error);
//             reject(false);
//             return;
//           }
//           const companyId = counter.seq.toString().padStart(4, '0');
//           const companyModelData = new companyModel();
//           companyModelData.username=username
//           companyModelData.companyid = companyId;
//           companyModelData.company = companyDetails.company;
//           companyModelData.firstname = companyDetails.firstname;
//           companyModelData.lastname = companyDetails.lastname;
//           companyModelData.address = companyDetails.address;
//           companyModelData.shippercode = companyDetails.shippercode;
//           companyModelData.country = companyDetails.country;
//           companyModelData.postalcode = companyDetails.postalcode;
//           companyModelData.state = companyDetails.state;
//           companyModelData.city = companyDetails.city;
//           companyModelData.email = companyDetails.email;
          
//           companyModelData.save((error, result) => {
//             if (error) {
//               reject(false);
//               console.log(error);
//             } else {
//               resolve(true);
//             }
//           });
//         }
//       );
//     });
//   });
// };

// module.exports.companiesDetailServices = (companyDetails) => {
//     return new Promise((resolve, reject) => {
//       companyModel.findOne({ company: companyDetails.company }, (err, company) => {
//         if (err) {
//           console.log(err);
//           reject(false);
//           return;
//         }
//         if (company) {
//           resolve('duplicate'); 
//           return;
//         }
  
//         countersModel.findOneAndUpdate(
//           { _id: "companyid" },
//           { $inc: { seq: 1 } },
//           { new: true},
//           (error, counter) => {
//             if (error) {
//               console.log('hi',error);
//               reject(false);
//               return;
//             }
//             const companyId = counter.seq.toString().padStart(4, '0');
//             const companyModelData = new companyModel();
//             companyModelData.companyid = companyId;
//             companyModelData.company = companyDetails.company;
//             companyModelData.firstname = companyDetails.firstname;
//             companyModelData.lastname = companyDetails.lastname;
//             companyModelData.address = companyDetails.address;
//             companyModelData.shippercode = companyDetails.shippercode;
//             companyModelData.country = companyDetails.country;
//             companyModelData.postalcode = companyDetails.postalcode;
//             companyModelData.state = companyDetails.state;
//             companyModelData.city = companyDetails.city;
//             companyModelData.city = companyDetails.city;
//             companyModelData.email = companyDetails.email;


            
//             companyModelData.save((error, result) => {
//               if (error) {
//                 reject(false);
//                 console.log(error);
//               } else {
//                 resolve(true);
//               }
//             });
//           }
//         );
//       });
//     });
//   };
  
  module.exports.updateCompaniesDetail = (companyId, companyDetails) => {
    return new Promise((resolve, reject) => {
      companyModel.findOne({ Companyname: companyDetails.Companyname }, (err, company) => {
        if (err) {
          console.log(err);
          reject(false);
          return;
        }
        if (company) {
          console.log('Duplicate found');
          resolve('duplicate');// Reject the operation if a duplicate company is found
          return;
        }
      companyModel.findOne({ companyid: companyId }, (err, company) => {
        if (err) {
          console.log(err);
          reject(false);
          return;
        }
        if (!company) {
          console.log('Company not found');
          resolve('not-found');
          return;
        }
  
        company.Companyname = companyDetails.Companyname;
        company.Ownername = companyDetails.Ownername;
        company.email = companyDetails.email;
        company.address = companyDetails.address;
        company.shippercode = companyDetails.shippercode;
  
        company.save((error, result) => {
          if (error) {
            reject(false);
            console.log(error);
          } else {
            resolve(true);
          }
        });
      });
    });

    });
  };
  

  module.exports.getCompaniesDetailServices = (username) => {
    return new Promise((resolve, reject) => {
      companyModel.find({ username: username }, (error, result) => {
        if (error) {
          reject(false);
        } else {
          resolve(result);
          console.log(result);
        }
      });
    });
  };
  

// module.exports.getCompaniesDetailServices = ()=>{

//     return new Promise(function myFn(resolve, reject) {
//         companyModel.find(function resultHandle(error,result){
//             if(error){
//                 reject(false);

//             }
//             else{
//                 resolve(result);
//                 console.log(result)
//             }
//         })
//     }

//     )
// }
