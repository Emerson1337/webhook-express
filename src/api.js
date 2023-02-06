const express = require("express");
const serverless = require("serverless-http");

const fs = require("fs");
const path = require("path");

const app = express();
const router = express.Router();

app.use(express.json());

router.get("/", (req, res) => {
  res.json({
    hello: "hi!",
  });
});

router.post("/send-data", (req, res) => {
  try {
    const fileData = fs.readFileSync(path.join("./", "data.json"));
    const content = JSON.parse(fileData.toString());
    content.push(req.body);

    fs.writeFile(`data.json`, JSON.stringify(content), function (err) {
      if (err) {
        console.log(err);
      }
    });

    res.json({ message: "saved!" });
  } catch (err) {
    res.json(err);
  }
});

router.get("/get-data", (req, res) => {
  try {
    const fileData = JSON.parse(
      fs.readFileSync(path.join("./", "data.json")).toString()
    );

    res.json(fileData);
  } catch (error) {
    res.json(err);
  }
});

app.use(`/.netlify/functions/api`, router);

module.exports = app;
module.exports.handler = serverless(app);
