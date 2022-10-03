const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const { portfolio, getPortfolio } = require("../controller/portfolio");

router
  .post("/create", upload.single("photo"), portfolio)
  .get("/:id", getPortfolio);

module.exports = router;
