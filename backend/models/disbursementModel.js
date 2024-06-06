const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const disbursementSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    place: {
      type: String,
      required: true,
    },
    cheque_no: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Disbursement", disbursementSchema);
