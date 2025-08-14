import Contact from "../models/contacts.model.js";
import errorHandler from "../controllers/error.controller.js";

const create = async (req, res) => {
  try {
    const saved = await new Contact(req.body).save();
    return res.status(201).json(saved);
  } catch (err) {
    console.error("CONTACT CREATE ERROR:", err?.message || err); // <— add this line
    // Fall back to err.message if helper returns nothing
    const msg = errorHandler?.getErrorMessage?.(err) || err?.message || "Bad request";
    return res.status(400).json({ error: msg });
  }
};

// List all contacts
const list = async (req, res) => {
  try {
    const contacts = await Contact.find();
    return res.json(contacts);
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

// Remove all contacts
const removeAll = async (req, res) => {
  try {
    await Contact.deleteMany();
    return res.json({ message: "All contacts removed" });
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

// Read a contact by ID
const read = async (req, res) => {
  return res.json(req.contact);
};

// Update a contact by ID
const update = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.contact._id, req.body, { new: true });
    return res.json(contact);
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

// Remove a contact by ID
const remove = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.contact._id);
    return res.json({ message: "Contact removed" });
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

// Param middleware to fetch contact by ID
const contactByID = async (req, res, next, id) => {
  try {
    const contact = await Contact.findById(id);
    if (!contact) return res.status(404).json({ error: "Contact not found" });
    req.contact = contact;
    next();
  } catch (err) {
    return res.status(400).json({ error: "Could not retrieve contact" });
  }
};

export default { list, create, removeAll, read, update, remove, contactByID };
