const mongoose = require('mongoose');

const rideRoute = new mongoose.Schema({

    // define the structure of schema (in which format data will store in database) 
    start:{
        type: String,
        require:true
    },
    end:{
        type:String,
        require:true
    },
    charges:{
        type:String,
        require:true
    },
})

// Give the name of Schema , provide schema structure , then export it to actual database 
const Routes = mongoose.model('RideRoutes',rideRoute);
module.exports = Routes;
