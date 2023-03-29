const dotenv = require("dotenv");
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

 const cors = require('cors'); 
 app.use(cors());

// only give path of env at once in main(app.js) then access it anywhere in project
dotenv.config({
path:'./config.env'
});

require('./DB/Connection.js');

// work as middleware
app.use(require('./routing/rout'));

// instruct the express to read the data in json format
app.use(express.json());

const PORT = process.env.PORT



app.listen(PORT,()=>{
    console.log(`Billing Server is running at http://localhost:${PORT}`);
});
