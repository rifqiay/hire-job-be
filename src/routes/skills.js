const express = require("express");
const router = express.Router();
const { skills, getSkills } = require("../controller/skills");

router.post("/create", skills).get("/:id", getSkills);

module.exports = router;
