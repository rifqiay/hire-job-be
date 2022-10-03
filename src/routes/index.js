const express = require("express");
const router = express.Router();
const workerRouter = require("./worker");
const sellers = require("../routes/sellers");
const skills = require("./skills");
const experience = require("./experience");
const portfolio = require("./portfolio");

router
  .use("/worker", workerRouter)
  .use("/sellers", sellers)
  .use("/skills", skills)
  .use("/experience", experience)
  .use("/portfolio", portfolio);

module.exports = router;
