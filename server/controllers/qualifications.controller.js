import Qualification from "../models/qualifications.model.js";
import errorHandler from "../controllers/error.controller.js";

const create = async (req, res) => {
  try {
    const saved = await new Qualification(req.body).save();
    return res.status(201).json(saved);
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

const list = async (_req, res) => {
  try {
    const docs = await Qualification.find().sort({ createdAt: -1 });
    return res.json(docs);
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

const qualificationByID = async (req, res, next, id) => {
  try {
    const doc = await Qualification.findById(id);
    if (!doc) return res.status(404).json({ error: "Qualification not found" });
    req.doc = doc;
    return next();
  } catch {
    return res.status(400).json({ error: "Could not retrieve qualification" });
  }
};

const read = (req, res) => res.json(req.doc);

const update = async (req, res) => {
  try {
    Object.assign(req.doc, req.body, { updatedAt: new Date() });
    const saved = await req.doc.save();
    return res.json(saved);
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

const remove = async (req, res) => {
  try {
    const deleted = await req.doc.deleteOne();
    return res.json(deleted);
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

const removeAll = async (_req, res) => {
  try {
    const r = await Qualification.deleteMany({});
    return res.json({ deletedCount: r.deletedCount });
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

export default { create, list, qualificationByID, read, update, remove, removeAll };
