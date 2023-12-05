const Trafficlight = require("../models/trafficLightModel");
const getTrafficLight = async (req, res) => {
  try {
    const trafficlights = await Trafficlight.find({});
    res.json(trafficlights);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ error: "Error fetching data" });
  }
};

module.exports = { getTrafficLight };
