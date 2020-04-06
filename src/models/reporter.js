const { Schema, model } = require("mongoose");
const validator = require("validator");

const reporterSchema = new Schema({
  district: {
    type: String,
  },
  taluk: {
    type: String,
  },
  lsg: {
    type: String,
  },
  reporterName: {
    type: String,
  },
  reporterPhone: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isMobilePhone(value)) {
        throw new Error("Invalid Phone Number");
      }
    },
  },
});

const Reporter = model("Reporter", reporterSchema);

module.exports = Reporter;
