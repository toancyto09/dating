const express = require("express");
const bodyParser = require("body-parser");

//router
const authRoutes = require("./routers/auth.route.js");
const userRoutes = require("./routers/user.route.js");

//mongoose
const connectMongoDB = require("./db/connectMongoDB");

const app = express();
const port = 3000;
const cors = require("cors");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const jwt = require("jsonwebtoken");

//user router
app.use('/api', authRoutes);
app.use('/api', userRoutes);


app.listen(port, () => {
  console.log("connect port", port);
  connectMongoDB();
});

