const express = require('express');
const router = express.Router();
const teacherController = require("../controllers/teacherController");

router.get("/", (req, res) => {
    res.send("get basic");
});

router.get("/dashboard", teacherController.renderDashboard);
router.get("/classroom", teacherController.renderClassroom);
router.get("/classroom/homeworks", teacherController.renderHomeworks);
router.get("/classroom/homeworks/add", teacherController.renderaddHomework);
router.get("/classroom/homeworks/evaluation", teacherController.renderEvaluations);
router.get("/classroom/homeworks/evaluation/feedback", teacherController.renderFeedback);

module.exports = router;