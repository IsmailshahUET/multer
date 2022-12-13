const path = require("path");

const express = require("express");
const multer = require("multer");
// const cors = require("cors");

const app = express();

// app.use(cors());

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});

const upload = multer({ storage: fileStorageEngine });

app.post("/single", upload.single("image"), (req, res) => {
  console.log(req.file);
  res.send("Single FIle upload success");
});

app.post("/multiple", upload.array("images", 3), (req, res) => {
  console.log(req.files);
  res.send("Multiple Files Upload Success");
});

app.listen(3003);
