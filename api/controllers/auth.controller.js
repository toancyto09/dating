const User = require("../models/user.js");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { sendVerificationEmail } = require("../helper/VerificationEmail.js");
const { generateSecretKey } = require("../helper/generateSecretKey.js")



const RegisterUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //check if email is alreadly register
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("Email already registered");
      return res.status(400).json({ message: "Email already registered" });
    }

    //create new user
    const newUser = new User({
      name,
      email,
      password,
    });

    //generate a veryfication Token
    newUser.verificationToken = crypto.randomBytes(20).toString("hex");

    //save user backend
    await newUser.save();

    //send the verification email to the registered user
    sendVerificationEmail(newUser.email, newUser.verificationToken);

    //response
    res.status(200).json({ message: "User registered successfully", userId: newUser._id });


  } catch (error) {
    console.log("Error registering user", error);
    res.status(500).json({ message: "Registration failed" });
  }
}

const VerifyToken = async (req, res) => {
  try {
    const token = req.params.token;

    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(404).json({ message: "Invalid verification token" });
    }

    //mark the user as verified
    user.verified = true;
    user.verificationToken = undefined;

    await user.save();

    res.status(200).json({ message: "Email verified Sucesfully" });

  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: "Verification failed" });
  }
}

const Login = async (req, res) => {
  const secretKey = generateSecretKey();
  try {
    const { email, password } = req.body;


    //check if user exist already
    const user = await User.findOne({ email });

    if (!user) {
      res.status(401).json({ message: "Invaild email or password" });
    }

    //check password
    if (user.password != password) {
      res.status(401).json({ message: "Invaild password" });
    }

    const token = jwt.sign({ userId: user._id }, secretKey);

    res.status(200).json({ token });

  } catch (error) {
    res.status(500).json({ message: "Login failed", error });
  }
}

module.exports = { RegisterUser, VerifyToken, Login };
