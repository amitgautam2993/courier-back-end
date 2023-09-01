const CourierData = require('./courierdataModel');

async function createCourierDataFn(id, courierDataDetail) {

  try {
    // Check if a courier data record with the specified cno exists
    const existingData = await CourierData.findOne({ 'courierDetails.cnumber': courierDataDetail.cnumber });
    if (existingData) {
      console.log('Duplicate cno found');
      return 'duplicate';
    }

    // Check if a courier data record with the specified id exists
    let courierDataRecord = await CourierData.findOne({ id: id });
    if (courierDataRecord) {
      // If the courier data record exists, push the new data into the courierDetails array
      courierDataRecord.courierDetails.push(courierDataDetail);
      await courierDataRecord.save();
    } else {
      // If the courier data record doesn't exist, create a new one with the specified id and data
      courierDataRecord = new CourierData({
        id: id,
        courierDetails: [courierDataDetail]
      });
      await courierDataRecord.save();
    }

    return true; // Return true to indicate that the creation or update was successful
  } catch (error) {
    console.log('Error:', error);
    return false; // Return false to indicate that the creation or update failed
  }
}
//duplicate error in same id
// async function updateCourierDataFn(id, updatedCourierData) {
//   try {
//     // Find the courier data record with the specified ID
//     let courierDataRecord = await CourierData.findOne({ 'courierDetails._id': id });
//     if (courierDataRecord) {
//       // Check for duplicate cnumber within courierDetails array
//       const duplicateCno = courierDataRecord.courierDetails.some(detail => detail.cnumber === updatedCourierData.cnumber && detail._id.toString() !== id);
//       if (duplicateCno) {
//         console.log('Duplicate cno found');
//         return 'duplicate';
//       } else {
//         // Update the courier details based on the provided data
//         const courierDetailIndex = courierDataRecord.courierDetails.findIndex(detail => detail._id.toString() === id);
//         courierDataRecord.courierDetails[courierDetailIndex] = { ...courierDataRecord.courierDetails[courierDetailIndex], ...updatedCourierData };

//         await courierDataRecord.save();
//         return true; // Return true to indicate that the update was successful
//       }
//     } else {
//       console.log('Courier data record not found');
//       return false; // Return false to indicate that the update failed
//     }
//   } catch (error) {
//     console.error('Error:', error);
//     return false; // Return false to indicate that the update failed
//   }
// }
async function updateCourierDataFn(id, updatedCourierData) {
  try {
    // Find the courier data record with the specified ID
    let courierDataRecord = await CourierData.findOne({ 'courierDetails._id': id });
    if (courierDataRecord) {
      // Check if the updated cnumber already exists in another courierDetails record
      const duplicateCno = await CourierData.exists({
        _id: { $ne: courierDataRecord._id },
        'courierDetails.cnumber': updatedCourierData.cnumber
      });

      if (duplicateCno) {
        console.log('Duplicate cno found');
        return 'duplicate';
      } else {
        // Update the courier details based on the provided data
        const courierDetailIndex = courierDataRecord.courierDetails.findIndex(detail => detail._id.toString() === id);
        courierDataRecord.courierDetails[courierDetailIndex] = { ...courierDataRecord.courierDetails[courierDetailIndex], ...updatedCourierData };

        await courierDataRecord.save();
        return true; // Return true to indicate that the update was successful
      }
    } else {
      console.log('Courier data record not found');
      return false; // Return false to indicate that the update failed
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      console.error('Duplicate cno found');
      return 'duplicate'; // Return false to indicate that the update failed due to validation error
    } else {
      console.error('Error:', error);
      return false; // Return false to indicate that the update failed due to an unknown error
    }
  }
}




//duplicate error in other id
// async function updateCourierDataFn(id, updatedCourierData) {
//   try {
//     // Find the courier data record with the specified ID
//     let courierDataRecord = await CourierData.findOne({ 'courierDetails._id': id });
//     if (courierDataRecord) {
//       // Update the courier details based on the provided data
//       const courierDetailIndex = courierDataRecord.courierDetails.findIndex(detail => detail._id.toString() === id);
//       const existingCno = courierDataRecord.courierDetails[courierDetailIndex].cnumber;

//       // If the cnumber is being updated, check for duplicates within the remaining documents
//       if (existingCno !== updatedCourierData.cnumber) {
//         const remainingDuplicates = await CourierData.findOne({
//           'courierDetails.cnumber': updatedCourierData.cnumber,
//           _id: { $ne: courierDataRecord._id }
//         });

//         if (remainingDuplicates) {
//           console.log('Duplicate cno found');
//           return 'duplicate';
//         }
//       }

//       // Bypass the validation during the update
//       const options = { runValidators: false };
//       courierDataRecord.courierDetails[courierDetailIndex] = { ...courierDataRecord.courierDetails[courierDetailIndex], ...updatedCourierData };

//       await courierDataRecord.save(options);
//       return true; // Return true to indicate that the update was successful
//     } else {
//       console.log('Courier data record not found');
//       return false; // Return false to indicate that the update failed
//     }
//   } catch (error) {
//     console.error('Error:', error);
//     return false; // Return false to indicate that the update failed
//   }
// }




// async function updateCourierDataFn(id, updatedCourierData) {
//   try {
//     // Find the courier data record with the specified ID
//     let courierDataRecord = await CourierData.findOne({ 'courierDetails._id': id });
//     if (courierDataRecord) {
//       // Update the courier details based on the provided data
//       const courierDetailIndex = courierDataRecord.courierDetails.findIndex(detail => detail._id.toString() === id);
//       courierDataRecord.courierDetails[courierDetailIndex] = { ...courierDataRecord.courierDetails[courierDetailIndex], ...updatedCourierData };

//       await courierDataRecord.save();
//       return true; // Return true to indicate that the update was successful
//     } else {
//       console.log('Courier data record not found');
//       return false; // Return false to indicate that the update failed
//     }
//   } catch (error) {
//     if (error.name === 'ValidationError') {
//       // Handling validation error specifically for the `courierDetails` field
//       const duplicateError = Object.values(error.errors).find(err => err.path === 'courierDetails');
//       if (duplicateError && duplicateError.kind === 'user defined' && duplicateError.message === 'Duplicate cno found') {
//         console.log('Duplicate cno found');
//         return 'duplicate';
//       }
//     }
//     console.error('Error:', error);
//     return false; // Return false to indicate that the update failed
//   }
// }







// async function updateCourierDataFn(id, updatedCourierData) {
//   try {
//     // Find the courier data record with the specified ID
//     let courierDataRecord = await CourierData.findOne({ 'courierDetails._id': id });
//     if (courierDataRecord) {
//       const existingData = await CourierData.findOne({ 'courierDetails.cnumber': updatedCourierData.cnumber });
//       if (existingData) {
//         console.log('Duplicate cno found');
//         return 'duplicate';
//       }
//       else{
//       // Update the courier details based on the provided data
//       const courierDetailIndex = courierDataRecord.courierDetails.findIndex(detail => detail._id.toString() === id);
//       courierDataRecord.courierDetails[courierDetailIndex] = { ...courierDataRecord.courierDetails[courierDetailIndex], ...updatedCourierData };

//       //courierDataRecord.courierDetails = updatedCourierData;

//       await courierDataRecord.save();
//       return true; }// Return true to indicate that the update was successful
//     } else {
//       console.log('Courier data record not found');
//       return false; // Return false to indicate that the update failed
//     }
//   } catch (error) {
//     console.log('Error:', error);
//     return false; // Return false to indicate that the update failed
//   }
// }

async function deleteCourierDataById(id) {
  try {
    const deletedCourierData = await CourierData.findOneAndUpdate(
      { 'courierDetails._id': id },
      { $pull: { courierDetails: { _id: id } } },
      { new: true }
    );

    if (deletedCourierData) {
      if (deletedCourierData.courierDetails.length === 0) {
        // If the courierDetails array is empty after deletion, remove the entire document
        await CourierData.findOneAndRemove({ 'courierDetails._id': id });
      }
      return true; // Return true to indicate successful deletion
    } else {
      console.log('Courier data record not found');
      return false; // Return false to indicate that the deletion failed
    }
  } catch (error) {
    console.log('Error:', error);
    return false; // Return false to indicate that the deletion failed
  }
}



// async function deleteCourierDataById(id) {
//   try {
//     // Find the courier data record with the specified ID and remove it
//     const deletedCourierData = await CourierData.findOneAndUpdate({ 'courierDetails._id': id },
//     { $pull: { courierDetails: { _id: id } } },
//     { new: true });

//     if (deletedCourierData) {
//       return true; // Return true to indicate that the deletion was successful
//     } else {
//       console.log('Courier data record not found');
//       return false; // Return false to indicate that the deletion failed
//     }
//   } catch (error) {
//     console.log('Error:', error);
//     return false; // Return false to indicate that the deletion failed
//   }
// }

async function fetchDataWithinDateRange(req, res) {
  const id = req.params.id;
  const from = new Date(req.query.from);
  const to = new Date(req.query.to);

  try {
    // Execute the query
    const result = await CourierData.findOne({
      id: id,
      'courierDetails.date': {
        $gte: from,
        $lte: to,
      },
    });

    if (!result) {
      res.status(404).json({ status: 404, message: 'No Data Found For this date range', data: null });
    } else {
      // Filter the courierDetails array based on the date range
      const filteredCourierDetails = result.courierDetails.filter((item) => {
        const itemDate = new Date(item.date);
        return itemDate >= from && itemDate <= to;
      });
      filteredCourierDetails.sort((a, b) => new Date(a.date) - new Date(b.date));
      // Update the result with the filtered courierDetails
      result.courierDetails = filteredCourierDetails;

      res.status(200).json({ status: 200, message: 'Success', data: result });
    }
  } catch (err) {
    res.status(500).json({ error: 500, message: 'Internal server error' });
  }
}



// async function fetchDataWithinDateRange(req, res) {
//   const id = req.params.id;
//   const from = new Date(req.query.from);
//   const to = new Date(req.query.to);

//   try {
//     // Execute the query
//     const result = await CourierData.findOne({
//       id: id,
//       'courierDetails.date': {
//         $gte: from,
//         $lte: to,
//       },
//     });
//     if (!result) {
//       res.status(404).json({ status:404,message: 'No Data Found For this date range',data:null });
//     } else {
//       res.status(200).json({status:200,message:'Success',data:result});
//     }
    
//   } catch (err) {
//     // console.error('Error executing MongoDB query:', err);
//     res.status(500).json({ error:500,message: 'Internal server error' });
//   }
// }




module.exports = { createCourierDataFn,fetchDataWithinDateRange,updateCourierDataFn,deleteCourierDataById};



  


