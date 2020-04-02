const { Router } = require("express");
const Donor = require("./../models/donor");
const Food = require("./../models/food");
const router = Router();

router.post("/", async (req, res) => {
  const {
    name,
    house,
    landmark,
    phone,
    district,
    taluk,
    lsg,
    donationDetails
  } = req.body;

  try {
    const donor = await new Donor({
      name,
      house,
      landmark,
      phone,
      district,
      taluk,
      lsg,
      donationDetails
    }).save();
    res.json({ message: "Succesfully donated", donor });
  } catch (e) {
    res.json({ message: e });
  }
});

router.get("/foods", async (req, res) => {
  const foods = await Food.find({});
  res.json({ foods: foods[0].foodsAvailable });
});

router.get("/", async (req, res) => {
  try {
    const donors = await Donor.find({});
    res.json({ donors });
  } catch (e) {
    res.json({ message: e });
  }
});

router.get("/:_id", async (req, res) => {
  const { _id } = req.params;
  try {
    const donor = await Donor.findOne({ _id });
    res.json({ donor });
  } catch (e) {
    res.json({ message: e });
  }
});

router.post("/:_id", async (req, res) => {
  const { _id } = req.params;
  let query = {};
  if (req.query.engaged === "true") {
    query = { engaged: true };
  } else if (req.query.engaged === "false") {
    query = { engaged: false };
  } else if (req.query.collected === "true") {
    query = { collected: true };
  } else if (req.query.collected === "false") {
    query = { collected: false };
  }

  try {
    await Donor.findByIdAndUpdate({ _id }, query, function(err, result) {
      if (err) {
        res.json({ err });
      } else {
        res.json({ result });
      }
    });
  } catch (e) {
    res.json({ message: e.message });
  }
});

module.exports = router;
