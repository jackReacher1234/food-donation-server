const { Schema, model } = require("mongoose");
const validator = require("validator");

const carrierSchema = new Schema({
  carrierName: {
    type: String,
    required: true
  },
  carrierPhone: {
    type: String,
    required: true
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
  engagedDonors: [
    {
      donorId: {
        type: Schema.Types.ObjectId,
        ref: "Donor"
      }
    }
  ],
  collectedDonors: [
    {
      donorId: {
        type: Schema.Types.ObjectId,
        ref: "Donor"
      }
    }
  ],
  engagedDeserveds: [
    {
      deservedId: {
        type: Schema.Types.ObjectId,
        ref: "Deserved"
      }
    }
  ],
  donatedDeserveds: [
    {
      deservedId: {
        type: Schema.Types.ObjectId,
        ref: "Deserved"
      }
    }
  ]
});

const Carrier = model("Carrier", carrierSchema);

module.exports = Carrier;
