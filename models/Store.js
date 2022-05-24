const mongoose = require("mongoose");
const { stringify } = require("nodemon/lib/utils");

const StoreSchema = new mongoose.Schema({
  storeId: {
    type: String,
    required: [true, "Please add a store Id"],
    unique: true,
    maxlength: [10, "Store Id must be less than 10 chars"],
  },
  address: {
    type: String,
    required: [true, "please add an address"],
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
      index: "2dsphere",
    },
    formattedAddress: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Store", StoreSchema);
