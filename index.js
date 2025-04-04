import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { ConnectDb } from "./ConnectDb.js";
import blogRoutes from "./route/blog.js";
import userRoutes from "./route/user.js";
import contactRoutes from "./route/contact.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import EventRoute from "./route/event.route.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

await ConnectDb();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/eventimages", express.static("EventImages"));

app.use("/user", userRoutes);
app.use("/contact", contactRoutes);
app.use("/blog", blogRoutes);
app.use("/events",EventRoute);

app.get("/", (req, res) => {
  return res.send("Hello World");
});

export default app;
