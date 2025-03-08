require('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Database connected"))
    .catch(err => console.log(err));

app.listen(3000, () => console.log("Server running on port 3000"));



const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
});

module.exports = mongoose.model("User", UserSchema);


const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    imageUrl: String,
    uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Image", ImageSchema);


const authRoutes = require("./routes/auth");
const uploadRoutes = require("./routes/upload");
const cookieParser = require("cookie-parser");
const path = require("path");

app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api", uploadRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

