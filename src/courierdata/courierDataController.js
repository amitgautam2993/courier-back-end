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

async function updateCourierDataFn(id, updatedCourierData) {
  try {
    // Find the courier data record with the specified ID
    let courierDataRecord = await CourierData.findOne({ id: id });
    if (courierDataRecord) {
      // Update the courier details based on the provided data
      courierDataRecord.courierDetails = updatedCourierData;
      await courierDataRecord.save();
      return true; // Return true to indicate that the update was successful
    } else {
      console.log('Courier data record not found');
      return false; // Return false to indicate that the update failed
    }
  } catch (error) {
    console.log('Error:', error);
    return false; // Return false to indicate that the update failed
  }
}


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
      res.status(404).json({ status:404,message: 'No Data Found For this date range',data:null });
    } else {
      res.status(200).json({status:200,message:'Success',data:result});
    }
    
  } catch (err) {
    // console.error('Error executing MongoDB query:', err);
    res.status(500).json({ error:500,message: 'Internal server error' });
  }
}




module.exports = { createCourierDataFn,fetchDataWithinDateRange,updateCourierDataFn};



  


