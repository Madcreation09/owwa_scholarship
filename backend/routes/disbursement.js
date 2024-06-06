const express = require("express");
const Disbursement = require("../models/disbursementModel");
const {
  getAllData,
  getData,
  storeData,
  updateData,
  deleteData,
} = require("../controllers/disbursementController");

const router = express.Router();

router.get("/", getAllData);

router.get("/:id", getData);

router.patch("/:id", updateData);

router.post("/", storeData);

router.delete("/:id", deleteData);

module.exports = router;
