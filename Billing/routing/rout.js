const express = require("express");
const router = express.Router();

const { default: mongoose } = require("mongoose");
router.use(express.json());
const bills = require("../models/Bills");

router.get("/", async (req, res) => {
  res.send(`Hello world from the Billing Server`);
});

router.post("/addBill", async (req, res) => {
  // this will retrieve the data fields from front-end
  const { paymentMethod, PIN } = req.body;

  if (!paymentMethod || !PIN ) {
    return res.status(422).json({ error: "Plesae fill the field properly" });
  }
  else {
      const bill = new bills({ paymentMethod, PIN });
      // middleware define in userSchema will be called here to hash the password
      await bill.save();
      return res.status(201).json({ message: "Your bill is Successfully submitted" });
    }
});


module.exports = router;
