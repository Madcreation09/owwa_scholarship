const Scholar = require("../models/scholarModel");
const mongoose = require("mongoose");

const getAllData = async (req, res) => {
  const data = await Scholar.find({});
  res.status(200).json(data);
};

const getData = async (req, res) => {
  const scholar = await Scholar.findById(req.params.id);

  if (scholar) {
    res.json(scholar);
  } else {
    res.status(404);
    throw new Error("Scholar not found");
  }
};

const storeData = async (req, res) => {
  const { name, year_level, mobile, email, status } = req.body;

  try {
    const data = await Scholar.create({
      name,
      year_level,
      mobile,
      email,
      status,
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

  const data = await Scholar.findByIdAndUpdate(
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
  const scholar = await Scholar.findById(req.params.id);
  console.log(scholar);
  if (!scholar) {
    res.status(404);
    throw new Error("Scholar not found");
  }

  await scholar.deleteOne();

  res.json({ message: "Scholar deleted successfully" });
};

module.exports = {
  getAllData,
  getData,
  storeData,
  updateData,
  deleteData,
};
