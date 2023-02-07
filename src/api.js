const express = require("express");
const serverless = require("serverless-http");

const fs = require("fs");
const path = require("path");

const app = express();
const router = express.Router();

const file = require("../data.json");

app.use(express.json());

router.get("/", (req, res) => {
  res.json({
    hello: "hi!",
  });
});

router.post("/test-data", (req, res) => {
  res.json(req.body);
});

router.post("/send-data", (req, res) => {
  const content = file;
  content.push(req.body);

  fs.writeFile("data.json", JSON.stringify(content), function (err) {
    if (err) {
      console.log(err);
    }
  });

  res.json({ message: "saved!" });
});

router.get("/get-data", (req, res) => {
  try {
    res.json(file);
  } catch (error) {
    res.json(error);
  }
});

app.use(`/.netlify/functions/api`, router);

module.exports = app;
module.exports.handler = serverless(app);
