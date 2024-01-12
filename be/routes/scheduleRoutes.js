const express = require("express");
const router = express.Router();
const scheduleController = require("../controllers/scheduleController");

// GET all schedules or filtered schedules
router.get("/schedules", scheduleController.getAllSchedules);

// GET a specific schedule by ID
router.get("/schedules/:id", scheduleController.getScheduleById);

// PATCH/update a specific schedule by ID
router.patch("/schedules/:id", scheduleController.updateSchedule);

// DELETE a specific schedule by ID
router.delete("/schedules/:id", scheduleController.deleteSchedule);

// POST/create a new schedule
router.post("/schedules", scheduleController.createSchedule);

// GET/Searc a new schedule by title
router.post("/schedules/:title", scheduleController.getScheduleByTitle);

module.exports = router;
