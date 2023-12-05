require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const trafficlightRoutes = require("./routes/trafficlights");
const hospitalRoutes = require("./routes/hospitals");
const emailRoutes = require("./routes/email");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const bodyParser = require("body-parser");

const app = express();

app.use(cors({ origin: true, credentials: true }));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api/trafficlights", trafficlightRoutes);
app.use("/api/hospitals", hospitalRoutes);
app.use("/api/users", userRoutes);
app.use("/api/users/send-verification-email", emailRoutes);
app.use("/api/auth", authRoutes);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to database");
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log("listening for request on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
