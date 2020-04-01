const { Router } = require("express");
const router = Router();
const Deserved = require("./../models/deserved");

router.get("/", async (req, res) => {
  try {
    const deserved = await Deserved.find({}).populate("reportedBy", {});

    res.json({ deserved });
  } catch (e) {
    res.json({ message: e });
  }
});

router.get("/:_id", async (req, res) => {
  const { _id } = req.params;
  try {
    const deserved = await Deserved.findOne({ _id }).populate("reportedBy", {});

    res.json({ deserved });
  } catch (e) {
    res.json({ message: e });
  }
});

router.post("/:_id", async (req, res) => {
  const { _id } = req.params;

  try {
    await Deserved.findByIdAndUpdate({ _id }, { engaged: true }, function(
      err,
      result
    ) {
      if (err) {
        res.json({ err });
      } else {
        res.json({ result });
      }
    });
  } catch (e) {
    res.json({ message: e });
  }
});

module.exports = router;
