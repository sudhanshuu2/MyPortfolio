import express from "express";
import projectCtrl from "../controllers/projects.controller.js";

const router = express.Router();

router.route("/projects")
  .get(projectCtrl.list)
  .post(projectCtrl.create)
  .delete(projectCtrl.removeAll);

router.route("/projects/:id")
  .get(projectCtrl.read)
  .put(projectCtrl.update)
  .delete(projectCtrl.remove);

router.param("id", projectCtrl.projectByID);

export default router;
