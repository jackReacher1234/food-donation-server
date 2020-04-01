const { Schema, model } = require("mongoose");
const validator = require("validator");

const foodsSchema = new Schema({
  food: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }
});

const donorSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2
  },
  house: {
    type: String,
    required: true,
    minlength: 1
  },
  landmark: {
    type: String,
    required: true,
    minlength: 3
  },
  phone: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isMobilePhone(value)) {
        throw new Error("Invalid Phone Number");
      }
    }
  },
  district: {
    type: String,
    required: true,
    minlength: 2
  },
  taluk: {
    type: String,
    required: true,
    minlength: 2
  },
  lsg: {
    type: String,
    required: true,
    minlength: 2
  },
  donationDetails: [foodsSchema],
  engaged: {
    type: Boolean,
    default: false
  },
  collected: {
    type: Boolean,
    default: false
  }
});

const Donor = model("Donor", donorSchema);

module.exports = Donor;
