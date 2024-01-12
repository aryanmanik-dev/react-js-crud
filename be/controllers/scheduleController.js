const Schedule = require("../models/schedulerSchema");
const mongoose = require("mongoose");

// GET all schedules or filtered schedules
// GET all schedules or filtered schedules
const getAllSchedules = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};

    // Additional validation if needed for the search parameter

    if (search) {
      query = { title: { $regex: search, $options: "i" } };
    }

    const schedules = await Schedule.find(query);
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET a specific schedule by ID
const getScheduleById = async (req, res) => {
  try {
    // Validate the provided ID
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid schedule ID" });
    }

    const schedule = await Schedule.findById(req.params.id);
    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }
    res.json(schedule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PATCH/update a specific schedule by ID
const updateSchedule = async (req, res) => {
  try {
    // Validate the provided ID
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid schedule ID" });
    }

    const updatedSchedule = await Schedule.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedSchedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    res.json(updatedSchedule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE a specific schedule by ID
const deleteSchedule = async (req, res) => {
  try {
    // Validate the provided ID
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid schedule ID" });
    }

    const deletedSchedule = await Schedule.findByIdAndDelete(req.params.id);

    if (!deletedSchedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    res.json({ message: "Schedule deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST/create a new schedule
const createSchedule = async (req, res) => {
  try {
    const { title, description, subject, frequency, repeat, time } = req.body;

    // Validate required fields
    if (!title || !subject || !frequency || !time) {
      return res
        .status(400)
        .json({ error: "Please fill in all required fields" });
    }

    // Additional validation if needed, for example, checking the format of certain fields

    const newSchedule = new Schedule({
      title,
      description,
      subject,
      frequency,
      repeat: repeat || 1, // Set a default value if repeat is not provided
      time,
    });

    const savedSchedule = await newSchedule.save();
    res.status(201).json(savedSchedule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET a specific schedule by Title
const getScheduleByTitle = async (req, res) => {
  try {
    const titleToSearch = req.params.title;

    // Assuming you have a Schedule model defined using mongoose
    const schedule = await Schedule.findOne({ title: titleToSearch });

    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    res.json(schedule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllSchedules,
  getScheduleById,
  updateSchedule,
  deleteSchedule,
  createSchedule,
  getScheduleByTitle
};
