const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const {
  register,
  login,
  updateProfile,
  profile,
  refreshToken,
  getAllWorker,
  getWorker,
} = require("../controller/worker");

const { protect, admin } = require("../middlewares/auth");

router
  .post("/register", register)
  .post("/login", login)
  .put("/:id", upload.single("photo"), updateProfile)
  .post("/refersh-token", refreshToken)
  .get("/profile", protect, profile)
  .get("/", getAllWorker)
  .get("/:id", getWorker);

module.exports = router;
