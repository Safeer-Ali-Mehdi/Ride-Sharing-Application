const mongoose = require('mongoose');

const Bills = new mongoose.Schema({

    // define the structure of schema (in which format data will store in database)
    paymentMethod:{
        type: String,
        require:true
    }, 
    PIN:{
        type: String,
        require:true
    },
})

// Give the name of Schema , provide schema structure , then export it to actual database 
const bills = mongoose.model('Bills',Bills);
module.exports = bills;
