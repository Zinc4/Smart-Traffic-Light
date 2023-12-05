const Token = require("../models/token");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const { User } = require("../models/userModel");

const sendVerificationEmail = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const token = await new Token({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();

    const url = `${process.env.BASE_URL}api/users/${user.id}/verify/${token.token}`;
    await sendEmail(user.email, "Verify Email", url);

    res
      .status(200)
      .send({ message: "Verification email sent successfully.", url });
  } catch (error) {
    console.error("Error sending verification email", error);
    res.status(500).send({ message: "Error sending verification email" });
  }
};

module.exports = { sendVerificationEmail };
