const express = require("express");
const { UserGender,
  UserDescription,
  FetchUser,
  AddTurnOnsUser,
  RemoveTurnOnsUser,
  LookingFor,
  RemoveLookingFor,
  UserImageProfile,
  ProfileDating,
  LikeProfile,
  ReceivedLikeProfile,
  CreateMatch,
  FetchMatchs,
} = require("../controllers/user.controller");


const router = express.Router();

router.put("/users/:userId/gender", UserGender);
router.put("/users/:userId/description", UserDescription);
router.get("/users/:userId", FetchUser);
router.put("/users/:userId/turn-ons/add", AddTurnOnsUser);
router.put("/users/:userId/turn-ons/remove", RemoveTurnOnsUser);
router.put("/users/:userId/looking-for", LookingFor);
router.put("/users/:userId/looking-for/remove", RemoveLookingFor);
router.post("/users/:userId/profile-images", UserImageProfile);
router.get("/profiles", ProfileDating);
router.post("/send-like", LikeProfile);
router.get("/received-likes/:userId/details", ReceivedLikeProfile);
router.post("/create-match", CreateMatch);
router.get("/users/:userId/matches", FetchMatchs);


module.exports = router;