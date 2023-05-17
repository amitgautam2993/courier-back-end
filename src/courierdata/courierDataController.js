const CourierData = require('./courierdataModel');

async function createCourierDataFn(id, courierDataDetail) {
  try {
    // Check if a courier data record with the specified ID exists
    let courierDataRecord = await CourierData.findOne({ id: id });
    if (courierDataRecord) {
      // If the courier data record exists, push the new data into the courierDetails array
      courierDataRecord.courierDetails.push(courierDataDetail);
      await courierDataRecord.save();
    } else {
      // If the courier data record doesn't exist, create a new one with the specified ID and data
      courierDataRecord = new CourierData({
        id: id,
        courierDetails: [courierDataDetail]
      });
      await courierDataRecord.save();
    }
    return true; // Return true to indicate that the creation or update was successful
  } catch (error) {
    console.log(error);
    return false; // Return false to indicate that the creation or update failed
  }
}

module.exports = { createCourierDataFn };

  
// courierDataService.js

// const CourierDataModel = require('./courierdataModel');

// async function createCourierDataFn(id, data) {
//   try {
//     // Check if a courier data record with the specified ID exists
//     let courierDataRecord = await CourierDataModel.findOne({ id: id });
//     if (courierDataRecord) {
//       // If the courier data record exists, update its fields with the new data
//       courierDataRecord.cnumber = data.cnumber;
//       courierDataRecord.date = data.date;
//       await courierDataRecord.save();
//     } else {
//       // If the courier data record doesn't exist, create a new one with the specified ID and data
//       courierDataRecord = new CourierDataModel({
//         id: id,
//         cnumber: data.cnumber,
//         date: data.date
//       });
//       await courierDataRecord.save();
//     }
//     return true; // Return true to indicate that the creation or update was successful
//   } catch (error) {
//     console.log(error);
//     return false; // Return false to indicate that the creation or update failed
//   }
// }

// module.exports = { createCourierDataFn };
// const CourierDataModel = require('./courierdataModel');

// async function createCourierDataFn(id, data) {
//   try {
//     // Check if a courier data record with the specified ID exists
//     let courierDataRecord = await CourierDataModel.findOne({ id: id }).lean();
//     if (courierDataRecord) {
//       // If the courier data record exists, update its fields with the new data
//       courierDataRecord.cnumber = data.cnumber;
//       courierDataRecord.date = data.date;
//       await CourierDataModel.updateOne({ id: id }, courierDataRecord);
//     } else {
//       // If the courier data record doesn't exist, create a new one with the specified ID and data
//       courierDataRecord = new CourierDataModel({
//         id: id,
//         cnumber: data.cnumber,
//         date: data.date
//       });
//       await courierDataRecord.save();
//     }
//     return true; // Return true to indicate that the creation or update was successful
//   } catch (error) {
//     console.log(error);
//     return false; // Return false to indicate that the creation or update failed
//   }
// }

// module.exports = { createCourierDataFn };


// const fs = require('fs');
// const path = require('path');
// const CourierDataModel = require('./courierdataModel');

// async function createCourierDataFn(id, data) {
//   try {
//     // Check if a courier data record with the specified ID exists
//     let courierDataRecord = await CourierDataModel.findOne({ id: id }).lean();
//     if (courierDataRecord) {
//       // If the courier data record exists, update its fields with the new data
//       courierDataRecord.cnumber = data.cnumber;
//       courierDataRecord.date = data.date;
//       await CourierDataModel.updateOne({ id: id }, courierDataRecord);
//     } else {
//       // If the courier data record doesn't exist, create a new one with the specified ID and data
//       courierDataRecord = new CourierDataModel({
//         id: id,
//         cnumber: data.cnumber,
//         date: data.date
//       });
//       await courierDataRecord.save();

//       // Create a folder for the new courier data record
//       const folderName = path.join(__dirname, 'courier_data', id);
//       fs.mkdirSync(folderName);
//     }
//     return true; // Return true to indicate that the creation or update was successful
//   } catch (error) {
//     console.log(error);
//     return false; // Return false to indicate that the creation or update failed
//   }
// }

 module.exports = { createCourierDataFn };