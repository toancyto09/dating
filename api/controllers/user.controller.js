const User = require("../models/user.js");


const UserGender = async (req, res) => {
  try {
    const { userId } = req.params;
    const { gender } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { gender: gender },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User gender updated Succesfully" });

  } catch (error) {
    res.status(500).json({ message: "Error updating user gender", error });
  }
}

module.exports = { UserGender };