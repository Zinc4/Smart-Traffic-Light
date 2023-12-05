const express = require("express");
const { getHospital } = require("../controllers/hospitalController");

const router = express.Router();

router.get("/", getHospital);

module.exports = router;
