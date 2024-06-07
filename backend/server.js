require("dotenv").config();

const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./routes/user");
const authRoutes = require("./routes/auth");
const scholarRoutes = require("./routes/scholar");
const disbursementRoutes = require("./routes/disbursement");

const cors = require("cors");

const app = express();

// Registered Device only
app.use(
  cors({
    origin: "*", // Allow all origins for development
    methods: "GET,POST,PUT,DELETE,PATCH",
    allowedHeaders: "Content-Type,Authorization",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "../admin/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "admin", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use("/user", userRoute);
app.use("/auth", authRoutes);
app.use("/scholar", scholarRoutes);
app.use("/disbursement", disbursementRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 4000, () => {
      console.log(
        "Successfully connected to Database & Listening port",
        process.env.PORT
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
