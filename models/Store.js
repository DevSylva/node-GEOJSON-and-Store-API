const mongoose = require("mongoose");
const geocoder = require("../utils/geocoder")

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


// geocode & create location
StoreSchema.pre('save', async function (next) {
  const loc = await geocoder.geocode(this.address);
  this.location = {
    type: "Point",
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
  }

  // do not save address
  this.address = undefined;
  next()
})

module.exports = mongoose.model("Store", StoreSchema);
