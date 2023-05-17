var companiesDetailServices = require('./companiesDetailService');

var createcompaniesDetailControllerFn = async(req,res)=>{
    try{
        console.log(req.body);
        var status = await companiesDetailServices.companiesDetailServices(req.body);
    console.log(status);
    if (status) {
        res.send({ "status": true, "message": "Companies created successfully" });
    } else {
        res.send({ "status": false, "message": "Error creating Companies" });
    }
    }
    catch(err)
{
    console.log(err);
}
}

var getompaniesDetailControllerFn = async (req, res) => {
    try {
      var companies = await companiesDetailServices.getCompaniesDetailServices();
        res.send(companies);
      
    } catch (err) {
      console.log(err);
      res.send({ "status": false, "message": "Error getting companies details" });
    }
  }
module.exports={createcompaniesDetailControllerFn,getompaniesDetailControllerFn};