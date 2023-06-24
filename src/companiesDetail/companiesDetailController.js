var companiesDetailServices = require('./companiesDetailService');

var createcompaniesDetailControllerFn = async(req,res)=>{
  
    try{
      const username = req.params.username;
        console.log(req.body);
        var status = await companiesDetailServices.companiesDetailServices(username,req.body);
    console.log(status);
          res.status(200).send({ "status": 200, "message": "Companies created successfully" });

    // if (status === 'Duplicate company name') {
    //   res.status(400).send({ "status": 400, "message": "Duplicate company name found while creating" });
    // } else if(status === 'Duplicate shipper code'){
    //   res.status(400).send({ "status": 400, "message": "Duplicate Shipper Code found while creating" });
    // } 
    // else {
    //   res.status(200).send({ "status": 200, "message": "Companies created successfully" });
    // }
    }
    catch(err)
{
  console.log(err);
  if (err === 'Duplicate company name') {
   res.status(400).send({ "status": 400, "message": "Duplicate company name found while creating" });

  }
  else if(err === 'Duplicate shipper code'){
      res.status(400).send({ "status": 400, message: "Duplicate Shipper Code found while creating" });
    } 
    else if(err=== "Company already exists for user"){
      res.status(400).send({ "status": 400, message: "Company already exists for user" });
    }
   else 
    res.status(500).send({ status: 500, message: err });


}
}

var updateCompaniesDetailControllerFn = async (req, res) => {
  try {
    const companyId = req.params.companyId;
    console.log(req.body);

    var status = await companiesDetailServices.updateCompaniesDetail(companyId, req.body);
    console.log(status);

    if (status === 'duplicate'){
      res.status(400).send({ status: 400, message: "Duplicate company name found while updating" });
    }else if (status === 'not-found') {
      res.status(404).send({ status: 404, message: "company ID not found" });
    }else if (status === true) {
      res.status(200).send({ status: 200, message: 'Companies updated successfully' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: 500, message: err });

  }
};


// var getompaniesDetailControllerFn = async (req, res) => {
//     try {
//       var companies = await companiesDetailServices.getCompaniesDetailServices();
//         res.send(companies);
      
//     } catch (err) {
//       console.log(err);
//       res.send({ "status": false, "message": "Error getting companies details" });
//     }
//   }

var getompaniesDetailControllerFn = async (req, res) => {
  try {
    var username = req.query.username;
    var companies = await companiesDetailServices.getCompaniesDetailServices(username);
    res.send(companies);
  } catch (err) {
    console.log(err);
    res.send({ status: false, message: "Error getting companies details" });
  }
};



module.exports={createcompaniesDetailControllerFn,getompaniesDetailControllerFn,updateCompaniesDetailControllerFn};