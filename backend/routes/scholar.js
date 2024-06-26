const express = require("express");
const Scholar = require("../models/scholarModel");
const {
  getAllData,
  getData,
  storeData,
  updateData,
  deleteData,
} = require("../controllers/scholarController");

const router = express.Router();

router.get("/", getAllData);

router.get("/:id", getData);

router.put("/:id", updateData);

router.post("/", storeData);

router.delete("/:id", deleteData);

module.exports = router;
