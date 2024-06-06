const Disbursement = require("../models/disbursementModel");
const mongoose = require("mongoose");

const getAllData = async (req, res) => {
  const data = await Disbursement.find({});
  res.status(200).json(data);
};

const getData = async (req, res) => {
  const disbursement = await Disbursement.findById(req.params.id);

  if (disbursement) {
    res.json(disbursement);
  } else {
    res.status(404);
    throw new Error("Disbursement not found");
  }
};

const storeData = async (req, res) => {
  const { name, mobile, email, status, date, place, cheque_no } = req.body;

  try {
    const data = await Disbursement.create({
      name,
      mobile,
      email,
      status,
      date,
      place,
      cheque_no,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateData = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid ID" });
  }

  const data = await Disbursement.findByIdAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!data) {
    return res.status(400).json({ error: "Record not found" });
  }

  return res.status(200).json({ message: "Update Successfull" });
};

const deleteData = async (req, res) => {
  const disbursement = await Disbursement.findById(req.params.id);

  if (!disbursement) {
    res.status(404);
    throw new Error("Record not found");
  }

  await disbursement.deleteOne();

  res.json({ message: "Record deleted successfully" });
};

module.exports = {
  getAllData,
  getData,
  storeData,
  updateData,
  deleteData,
};
