const mongoose = require("mongoose");

const hospitalModel = new mongoose.Schema({
  name: String,
  imagesrc: String,
  addres: String,
  position: {
    lat: Number,
    lng: Number,
  },
});

module.exports = mongoose.model("hospital", hospitalModel);
