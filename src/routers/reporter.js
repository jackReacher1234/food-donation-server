const { Router } = require("express");
const router = Router();
const Reporter = require("./../models/reporter");
const Deserved = require("./../models/deserved");

router.post("/", async (req, res) => {
  const {
    district,
    taluk,
    lsg,
    deservedName,
    deservedHouse,
    deservedLandmark,
    deservedPhone,
    deservedNumber,
    reporterName,
    reporterPhone,
  } = req.body;

  try {
    const reporter = await new Reporter({
      district,
      taluk,
      lsg,
      reporterName,
      reporterPhone,
    }).save();

    const deserved = await new Deserved({
      district,
      taluk,
      lsg,
      deservedName,
      deservedHouse,
      deservedLandmark,
      deservedPhone,
      deservedNumber,
      reportedBy: reporter._id,
    }).save();
    res.json({ message: "Succesfully Reported", reporter, deserved });
  } catch (e) {
    res.json({ message: e });
  }
});

module.exports = router;
