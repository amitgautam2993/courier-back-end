const express = require('express')
const app = express()
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
var routes = require('./route/routes');
const cors = require('cors');

app.use(cors(
  {
    origin: "http://http://192.168.0.198:80/"
  }

));

app.listen(9002,function check(err)
{
    if(err)
    console.log("error")
    else
    console.log("started")
});

// const username = encodeURIComponent('gautamkutir');
// const password = encodeURIComponent('abcdxyz123');
// const mySchema = new mongoose.Schema({
//   name: String
// });

// const MyModel = mongoose.model('MyModel', mySchema);

mongoose.connect("mongodb://gautamkutir:abcdxyz123@192.168.0.198:27017/?authMechanism=DEFAULT",{useNewUrlParser: true,  useUnifiedTopology: true,dbName: 'track4u', },
function checkDb(error)
{
    if(error)
    {
        console.log("Error Connecting to DB");
        console.log(error)
    }
    else
    {
        console.log("successfully Connected to DB");
        
    }
});

// const mongoose = require('mongoose');


// Saving a document to the database



app.use(express.json());
app.use(routes);