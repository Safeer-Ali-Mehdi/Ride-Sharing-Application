const express = require("express");
const router = express.Router();

const Routes = require("../models/rideRoute");
const Requests = require('../models/rideRequests');
const { default: mongoose } = require("mongoose");
router.use(express.json());

router.get("/", async (req, res) => {
  res.send(`Hello world from the Driver Server`);
});

router.post("/addRoute", async (req, res) => {
  // this will retrieve the data fields from front-end
  const { start, end, charges } = req.body;

  if (!start || !end || !charges ) {
    return res.status(422).json({ error: "Plesae fill the field properly" });
  }
  else {
      const routes = new Routes({ start, end, charges });
      // middleware define in userSchema will be called here to hash the password
      await routes.save();
      return res.status(201).json({ message: "Ride Route added successfully" });
    }
});

router.post("/findRide", async (req, res) => {
  // this will retrieve the data fields from front-end
  const { end } = req.body;

  if ( !end  ) {
    return res.status(422).json({ error: "Plesae fill the field properly" });
  }
  try {
    const rideExist = await Routes.find({ end:end });

    if (rideExist) {
      res.send(rideExist);
    } 

  } catch (err) {
    console.log(err);
  }
});


router.post("/rideRequest", async (req, res) => {
  // this will retrieve the data fields from front-end
  const { requestId,origin, destination, rideFee } = req.body;
  const requestMsg = 'Someone wants to join your ride'

  try {
    const requestExist = await Requests.findOne({ requestId:requestId });

    if (requestExist) {
      return res.status(422).json({ error: "Request already send on this Ride." });
    } 
    else{
      const requests = new Requests({ requestId,origin, destination, rideFee, requestMsg});
      await requests.save();
      return res.status(201).json({ message: "Ride Request is send successfully" });
    }
    
  } catch (err) {
    console.log(err);
  }
});

router.get("/checkRequest", async (req, res) => {
  try {
    const requests = await Requests.find();

    if (requests) {
      return res.send(requests)
    } 
    
  } catch (err) {
    console.log(err);
  }
});

router.delete("/deleteRequest", async (req, res) => {
  const { _id } = req.body;
  try {
    const requests = await Requests.delete({_id});

    res.send("Request deleted successfully")
    
  } catch (err) {
    console.log(err);
  }
});


module.exports = router;
