const express = require('express');
const router = express.Router();
const teacherController = require("../controllers/teacherController");

router.get("/", (req, res) => {
    res.send("get basic");
});

router.get("/dashboard", teacherController.renderDashboard);

module.exports = router;