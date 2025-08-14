import express from "express";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";

import userRoutes from "./routes/users.routes.js";
import authRoutes from "./routes/auth.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import projectRoutes from "./routes/project.routes.js";
import qualificationRoutes from "./routes/qualification.routes.js";

const app = express();

// parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// security/perf
app.use(compress());
app.use(helmet());
app.use(cors());

// routes
app.use("/api", userRoutes);
app.use("/api", authRoutes);
app.use("/api", contactRoutes);
app.use("/api", projectRoutes);
app.use("/api", qualificationRoutes);

// auth & generic error handler
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    return res.status(401).json({ error: `${err.name}: ${err.message}` });
  }
  if (err) {
    console.log(err);
    return res.status(400).json({ error: `${err.name}: ${err.message}` });
  }
  next();
});

export default app;
