const { Schema, model } = require("mongoose");
const validator = require("validator");

const deservedSchema = new Schema({
  district: {
    type: String,
  },
  taluk: {
    type: String,
  },
  lsg: {
    type: String,
  },
  deservedName: {
    type: String,
    required: true,
    minlength: 2,
  },
  deservedHouse: {
    type: String,
    required: true,
    minlength: 1,
  },
  deservedLandmark: {
    type: String,
    required: true,
    minlength: 3,
  },
  deservedPhone: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isMobilePhone(value)) {
        throw new Error("Invalid Phone Number");
      }
    },
  },
  deservedNumber: {
    type: String,
    required: true,
  },
  engaged: {
    type: Boolean,
    default: false,
  },
  donated: {
    type: Boolean,
    default: false,
  },
  reportedBy: {
    type: Schema.Types.ObjectId,
    ref: "Reporter",
    required: true,
  },
});

const Deserved = model("Deserved", deservedSchema);

module.exports = Deserved;
