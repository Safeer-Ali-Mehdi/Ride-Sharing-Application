const express = require("express");
const router = express.Router();

const { default: mongoose } = require("mongoose");
router.use(express.json());

const Recieves = require('../models/recieveRequests');

router.get("/", async (req, res) => {
  res.send(`Hello world from the Passenger Server`);
});

router.post("/recieveRequest", async (req, res) => {
  // this will retrieve the data fields from front-end
  const { requestId, origin, destination, rideFee } = req.body;

  try {
    const requestExist = await Recieves.findOne({ requestId:requestId });

    if (requestExist) {
      return res.status(422).json({ error: "Request already accepted" });
    } 
    else{
      const recieves = new Recieves({ requestId,origin, destination, rideFee});
      await recieves.save();
      return res.status(201).json({ message: "Ride Request is send successfully" });
    }
    
  } catch (err) {
    console.log(err);
  } 

});

router.get("/confirmRequests", async (req, res) => {
  try {
    const recieves = await Recieves.find();

    if (recieves) {
      return res.send(recieves)
    } 
    
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
