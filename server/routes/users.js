const express = require("express");
const {
  createUser,
  getUser,
  verifyUser,
} = require("../controllers/userController");

const router = express.Router();

router.post("/", createUser);
router.get("/", getUser);
router.get("/:id/verify/:token/", verifyUser);

module.exports = router;
