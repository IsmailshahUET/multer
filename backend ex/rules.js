const express = require("express");
const app = express();
const { authPage, authCourse } = require("./middlewares");

app.use(express.json());

app.get("/home", (req, res) => {
  res.json("HOME PAGE");
});

app.get("/course/grades", authPage(["teacher", "admin"]), (req, res) => {
  res.json({
    ismail: 100,
    kashi: 88,
    rshid: 87,
    kamal: 34,
  });
});

app.get("/course/:number", authCourse, (req, res) => {
  const courseNumber = req.params.number;
  res.json(`You have permission to see this course ${courseNumber}`);
});

app.listen(3001, () => {
  console.log("Server running on http://localhost/3001");
});
