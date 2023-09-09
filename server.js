// const express = require('express')
// const app = express()
// const mongoose = require('mongoose');
// mongoose.set('strictQuery', false);
// var routes = require('./route/routes');
// const cors = require('cors');

// app.use(cors(
//   {
//     origin: "http://http://192.168.0.198:80/"
//   }

// ));

// app.listen(9002,function check(err)
// {
//     if(err)
//     console.log("error")
//     else
//     console.log("started")
// });

// // const username = encodeURIComponent('gautamkutir');
// // const password = encodeURIComponent('abcdxyz123');
// // const mySchema = new mongoose.Schema({
// //   name: String
// // });

// // const MyModel = mongoose.model('MyModel', mySchema);

// mongoose.connect("mongodb://gautamkutir:abcdxyz123@192.168.0.198:27017/?authMechanism=DEFAULT",{useNewUrlParser: true,  useUnifiedTopology: true,dbName: 'track4u', },
// function checkDb(error)
// {
//     if(error)
//     {
//         console.log("Error Connecting to DB");
//         console.log(error)
//     }
//     else
//     {
//         console.log("successfully Connected to DB");
        
//     }
// });

// // const mongoose = require('mongoose');


// // Saving a document to the database



// app.use(express.json());
// app.use(routes);


require('dotenv').config();  // Load environment variables from .env file
const express = require('express');
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const routes = require('./route/routes');
const cors = require('cors');

const app = express();

// CORS settings: Use environment variable or fallback to the hardcoded URL
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:4200";
// app.use(cors({ origin: CORS_ORIGIN }));
app.use(cors({
  origin: CORS_ORIGIN,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
}));
// app.use((req, res, next) => {
//   console.log(req.headers);
//   next();
// });


const PORT = process.env.PORT || 9002;

app.listen(PORT, function(err) {
    if(err) {
        console.log("Error starting the server:", err);
    } else {
        console.log(`Server started on port ${PORT}`);
    }
});

// MongoDB connection
// const MONGO_USER = process.env.MONGO_USER || 'gautamkutir';
// const MONGO_PASS = encodeURIComponent(process.env.MONGO_PASS || 'abcdxyz123');
// const MONGO_HOST = process.env.MONGO_HOST || '192.168.0.198:27017';
const MONGO_DBNAME = process.env.MONGO_DBNAME || 'track4u';

// ... other imports

// MongoDB connection
console.log(`CORS_ORIGIN is ${CORS_ORIGIN}`);

console.log(`Running in ${process.env.NODE_ENV} environment.`);
console.log('Connecting to:', process.env.MONGO_URI);

const MONGO_URI = process.env.MONGO_URI || `mongodb://${process.env.MONGO_USER}:${encodeURIComponent(process.env.MONGO_PASS)}@${process.env.MONGO_HOST}/?authMechanism=DEFAULT`;

// ... rest of the code

mongoose.connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true, dbName: MONGO_DBNAME}, function(err) {
    if(err) {
        console.log("Error connecting to DB:", err);
        process.exit(1);
    } else {
        console.log("Successfully connected to DB");
    }
});

app.use(express.json());
app.use(routes);
