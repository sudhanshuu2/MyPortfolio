import express from "express";
import contactCtrl from "../controllers/contacts.controller.js";

const router = express.Router();

router.route("/contacts")
  .get(contactCtrl.list)
  .post(contactCtrl.create)
  .delete(contactCtrl.removeAll);

router.route("/contacts/:id")
  .get(contactCtrl.read)
  .put(contactCtrl.update)
  .delete(contactCtrl.remove);

router.param("id", contactCtrl.contactByID);

export default router;
