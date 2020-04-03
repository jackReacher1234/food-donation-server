const router = require("express").Router();
const Reporter = require("./../models/reporter");
const Donor = require("./../models/donor");
const Carrier = require("./../models/carrier");
const { ObjectID } = require("mongodb");

router.post("/", async (req, res) => {
  const { carrierName, carrierPhone, district, taluk, lsg } = req.body;
  try {
    const carrier = await new Carrier({
      carrierName,
      carrierPhone,
      district,
      taluk,
      lsg
    }).save();
    res.json({ carrier });
  } catch (error) {
    res.json({ message: error });
  }
});

//Add to engaged donor list
router.post("/engagedonor", async (req, res) => {
  try {
    const { carrierId, donorId } = req.body;
    let carrier = await Carrier.findById(new ObjectID(carrierId));
    carrier.engagedDonors = [
      ...carrier.engagedDonors,
      { donorId: new ObjectID(donorId) }
    ];
    carrier = await carrier.save();
    res.json({ carrier });
  } catch (e) {
    console.log(e);
    res.json({ message: e.message });
  }
});

//Add to collected donor list
router.post("/collectdonor", async (req, res) => {
  try {
    const { carrierId, donorId } = req.body;
    let carrier = await Carrier.findById(ObjectID(carrierId));

    const checkArray = carrier.engagedDonors.filter(function(each) {
      return each.donorId == donorId;
    });

    if (checkArray.length === 0) {
      throw new Error("You must be engaged before collecting");
    }

    carrier.collectedDonors = [
      ...carrier.collectedDonors,
      { donorId: ObjectID(donorId) }
    ];
    carrier = await carrier.save();
    res.json({ carrier });
  } catch (e) {
    res.json({ message: e.message });
  }
});

//Add to engaged deserved list
router.post("/engagedeserved", async (req, res) => {
  try {
    const { carrierId, deservedId } = req.body;
    let carrier = await Carrier.findById(ObjectID(carrierId));
    carrier.engagedDeserveds = [
      ...carrier.engagedDeserveds,
      { deservedId: ObjectID(deservedId) }
    ];
    carrier = await carrier.save();
    res.json({ carrier });
  } catch (e) {
    console.log(e);
    res.json({ message: e });
  }
});

//Add to donated deserved list
router.post("/donatedeserved", async (req, res) => {
  try {
    const { carrierId, deservedId } = req.body;
    let carrier = await Carrier.findById(ObjectID(carrierId));

    const checkArray = carrier.engagedDeserveds.filter(function(each) {
      return each.deservedId == deservedId;
    });

    if (checkArray.length === 0) {
      throw new Error("You must be engaged before donating");
    }

    carrier.donatedDeserveds = [
      ...carrier.donatedDeserveds,
      { deservedId: ObjectID(deservedId) }
    ];
    carrier = await carrier.save();
    res.json({ carrier });
  } catch (e) {
    res.json({ message: e.message });
  }
});

router.post("/mydetails", async (req, res) => {
  const { myid } = req.body;
  try {
    const carrier = await Carrier.findById(ObjectID(myid))
      .populate("engagedDonors.donorId collectedDonors.donorId", {
        _id: 1,
        landmark: 1
      })
      .populate("engagedDeserveds.deservedId donatedDeserveds.deservedId", {
        _id: 1,
        deservedLandmark: 1
      });
    res.json({ carrier });
  } catch (error) {
    res.json({ message: error.message });
  }
});

module.exports = router;
