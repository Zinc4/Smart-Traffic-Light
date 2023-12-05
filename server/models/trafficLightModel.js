const mongoose = require("mongoose");

const trafficLightSchema = new mongoose.Schema({
  name: String,
  position: {
    lat: Number,
    lng: Number,
  },
});

module.exports = mongoose.model("trafficlight", trafficLightSchema);
