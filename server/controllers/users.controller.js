import User from "../models/users.model.js";
import extend from "lodash/extend.js";
import errorHandler from "./error.controller.js";

// POST /api/users
const create = async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    return res.status(201).json({ message: "Successfully signed up!" });
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

// GET /api/users
const list = async (_req, res) => {
  try {
    const users = await User.find().select("name email updated created");
    return res.json(users);
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

// param :userId
const userByID = async (req, res, next, id) => {
  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ error: "User not found" });
    req.profile = user;
    return next();
  } catch (err) {
    return res.status(400).json({ error: "Could not retrieve user" });
  }
};

// GET /api/users/:userId
const read = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

// PUT /api/users/:userId
const update = async (req, res) => {
  try {
    let user = req.profile;
    user = extend(user, req.body);
    user.updated = Date.now();
    await user.save();
    user.hashed_password = undefined;
    user.salt = undefined;
    return res.json(user);
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

// DELETE /api/users/:userId
const remove = async (req, res) => {
  try {
    const deleted = await req.profile.deleteOne();
    deleted.hashed_password = undefined;
    deleted.salt = undefined;
    return res.json(deleted);
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

export default { create, list, userByID, read, update, remove };
