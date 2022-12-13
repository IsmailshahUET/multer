const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const app = express();
const { Schema } = mongoose;

mongoose.connect(
  "mongodb+srv://cplus:5jYcIXyCn62HJKPy@cplus.aaryxkp.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("DB Connected");
  }
);

var UserSchema = new mongoose.Schema({
  filename: (req, file, callback) => {
    const types = /png|jpg|jpeg|webp|gif|webp|svg|pdf/;
    const extName = types.test(
      path.extname(file.originalname).toLocaleLowerCase()
    );
    const mimetype = types.test(file.mimetype);
    if (extName && mimetype) {
      callback(null, true);
    } else {
      cb(
        new Error(
          "Only supported png,jpeg,jpg,gif,webp, pdf and svg format image"
        )
      );
    }
  },
});

const User = new mongoose.model("User", UserSchema);

// Routes

app.post("/register", (req, res) => {
  const { filename } = req.body;
  User.findOne({ filename: file }, (err, user) => {
    if (user) {
      res.send({ message: "File Already Exists" });
    } else {
      const user = new User({
        filename,
      });
      user.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.send({ message: "Successfully Added" });
        }
      });
    }
  });
});

app.get("/", (req, res) => {
  res.send("My API");
});

app.listen(8080, () => {
  console.log("PORT started at 8080");
});

// const upload = multer({ storage: fileStorageEngine });

// app.post("/single", upload.single("image"), (req, res) => {
//   console.log(req.file);
//   res.send("single file uploaded successfully!");
// });

// app.post("/multiple", upload.array("images", 3), (req, res) => {
//   console.log(req.files);
//   res.send("Multiple Files Upload Success");
// });

// app.listen(3000);
