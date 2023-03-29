const mongoose = require('mongoose');

const recieveRequests = new mongoose.Schema({

    // define the structure of schema (in which format data will store in database)
    requestId:{
        type: String,
        require:true
    }, 
    origin:{
        type: String,
        require:true
    },
    destination:{
        type:String,
        require:true
    },
    rideFee:{
        type:String,
        require:true
    },
})

// Give the name of Schema , provide schema structure , then export it to actual database 
const Recieves = mongoose.model('RecieveRequests',recieveRequests);
module.exports = Recieves;
