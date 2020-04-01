const { Schema, model } = require("mongoose");
const validator = require("validator");

const reporterSchema = new Schema({
  reporterName: {
    type: String,
    required: true,
    minlength: 2
  },
  reporterPhone: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isMobilePhone(value)) {
        throw new Error("Invalid Phone Number");
      }
    }
  }
});

const Reporter = model("Reporter", reporterSchema);

module.exports = Reporter;
