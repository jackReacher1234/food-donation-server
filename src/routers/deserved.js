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

router.post("/myarea", async (req, res) => {
  const { district, taluk, lsg } = req.body;
  try {
    const deserveds = await Deserved.find({}).populate("reportedBy");
    res.json({ deserveds });
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
  } else if (req.query.donated === "true") {
    query = { donated: true };
  } else if (req.query.donated === "false") {
    query = { donated: false };
  }

  try {
    await Deserved.findByIdAndUpdate({ _id }, query, function (err, result) {
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
