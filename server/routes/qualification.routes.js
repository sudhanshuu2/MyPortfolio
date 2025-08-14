import express from "express";
import qualificationCtrl from "../controllers/qualifications.controller.js";

const router = express.Router();

router.route("/qualifications")
  .get(qualificationCtrl.list)
  .post(qualificationCtrl.create)
  .delete(qualificationCtrl.removeAll);

router.route("/qualifications/:id")
  .get(qualificationCtrl.read)
  .put(qualificationCtrl.update)
  .delete(qualificationCtrl.remove);

router.param("id", qualificationCtrl.qualificationByID);

export default router;
