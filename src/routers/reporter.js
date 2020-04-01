const { Router } = require("express");
const router = Router();
const Reporter = require("./../models/reporter");
const Deserved = require("./../models/deserved");

router.post("/", async (req, res) => {
  const {
    deservedName,
    deservedHouse,
    deservedLandmark,
    deservedPhone,
    deservedNumber,
    reporterName,
    reporterPhone
  } = req.body;

  try {
    const reporter = await new Reporter({
      reporterName,
      reporterPhone
    }).save();

    const deserved = await new Deserved({
      deservedName,
      deservedHouse,
      deservedLandmark,
      deservedPhone,
      deservedNumber,
      reportedBy: reporter._id
    }).save();
    res.json({ message: "Succesfully Reported", reporter, deserved });
  } catch (e) {
    res.json({ message: e });
  }
});

module.exports = router;
