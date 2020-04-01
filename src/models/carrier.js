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
        type: Schema.Types.ObjectId
      }
    }
  ],
  collectedDonors: [
    {
      donorId: {
        type: Schema.Types.ObjectId
      }
    }
  ],
  engagedDeserveds: [
    {
      deservedId: {
        type: Schema.Types.ObjectId
      }
    }
  ],
  donatedDeserveds: [
    {
      deservedId: {
        type: Schema.Types.ObjectId
      }
    }
  ]
});

const Carrier = model("Carrier", carrierSchema);

module.exports = Carrier;
