import jwt from "jsonwebtoken";
import { expressjwt } from "express-jwt";
import config from "../../config/config.js";
import User from "../models/users.model.js";

// POST /auth/signin
const signin = async (req, res) => {
  try {
    const { email, password } = req.body || {};
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "User not found" });
    if (!user.authenticate(password)) return res.status(401).json({ error: "Email and password don't match." });

    const token = jwt.sign({ _id: user._id }, config.jwtSecret);
    return res.json({
      token,
      user: { _id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    return res.status(400).json({ error: "Could not sign in" });
  }
};

// GET /auth/signout
const signout = (_req, res) => {
  return res.status(200).json({ message: "signed out" });
};

// Middleware: verify JWT
const requireSignin = expressjwt({
  secret: config.jwtSecret,
  algorithms: ["HS256"],
  requestProperty: "auth"
});

// Authorization check
const hasAuthorization = (req, res, next) => {
  const authorized =
    req.profile && req.auth && String(req.profile._id) === String(req.auth._id);
  if (!authorized) return res.status(403).json({ error: "User is not authorized" });
  next();
};

export default { signin, signout, requireSignin, hasAuthorization };
