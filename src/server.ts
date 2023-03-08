import express from "express";
import morgan from "morgan";
import cors from "cors";
import router from "./router";
import { protect } from "./modules/auth";
import { signin, signup } from "./handlers/user";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extends: true }));

app.get("/", (req, res) => {
  res.status(200);
  res.json({ message: "API is on!" });
});

app.use("/api", protect, router);

app.post("/signup", signup);
app.post("/signin", signin);

app.use((err, req, res, next) => {
  if (err.type === "auth") {
    res.status(401).json({ message: "Unauthorized" });
  } else if (err.type === "input") {
    res.status(400).json({ message: "Invalid Input" });
  } else {
    res.status(500).json({ message: "Oops! That's on us" });
  }
});

export default app;
