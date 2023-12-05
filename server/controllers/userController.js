const { User, validate } = require("../models/userModel");
const Token = require("../models/token");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    let user = await User.findOne({ email: req.body.email });

    if (user) {
      return res
        .status(409)
        .send({ message: "User with given email already Exist!" });
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    user = await new User({ ...req.body, password: hashPassword }).save();

    // const token = await new Token({
    //   userId: user._id,
    //   token: crypto.randomBytes(32).toString("hex"),
    // }).save();

    // const url = `${process.env.BASE_URL}users/${user.id}/verify/${token.token}`;
    // await sendEmail(user.email, "Verify Emil", url);

    // res
    //   .status(200)
    //   .send({ message: "An Email sent to your account please verify" });
    res
      .status(200)
      .send({ message: "Registration request submitted. Awaiting approval" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const verifyUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send({ message: "Invalid link" });

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).send({ message: "Invalid link" });

    await User.updateOne({ _id: user._id }, { verified: true });
    await Token.deleteOne({ userId: user._id, token: req.params.token });

    res.status(200).send({ message: "Email verified successfully" });
  } catch (error) {
    console.error("Error in verifyUser:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const getUser = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ error: "Error fetching data" });
  }
};

module.exports = { createUser, getUser, verifyUser };
