const express = require('express');
const router = express.Router();
const adminController = require("../controllers/adminController");

router.get("/", (req, res) => {
    res.send("get basic");
});

router.get("/dashboard", adminController.renderDashboard);
router.get("/users", adminController.renderUsers);
router.get("/users/edit", adminController.renderEditUser);
router.get("/users/add", adminController.renderCreateUser);
router.post("/users/add", adminController.updateOneUser);
router.get("/plans", adminController.renderPlans);
router.get("/plans/edit", adminController.renderEditPlan);
router.get("/plans/add", adminController.renderAddPlan);
router.get("/classrooms", adminController.renderClassroom);
router.get("/reports", adminController.renderReports);
//router.get("/reports/motive", adminController.renderReportMotive);
router.get("/classrooms/add", adminController.renderAddClassroom);
router.get("/classrooms/edit", adminController.renderEditClassroom);
router.get("/payments", adminController.renderPayments);
//router.get("/plans", adminController.getPlans);
router.get("/cancel", adminController.renderCancel);

module.exports = router;