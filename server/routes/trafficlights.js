const express = require("express");
const { getTrafficLight } = require("../controllers/trafficlightController");

const router = express.Router();

router.get("/", getTrafficLight);

module.exports = router;
