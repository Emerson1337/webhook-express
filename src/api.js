const express = require("express");
const serverless = require("serverless-http");

const fs = require("fs");

const app = express();
const router = express.Router();

app.use(express.json());

router.get("/", (req, res) => {
  res.json({
    hello: "hi!",
  });
});

router.post("/send-data", (req, res) => {
  const date = Date.now();

  fs.writeFile(`${date}.json`, JSON.stringify(req.body), function (err) {
    if (err) {
      console.log(err);
    }
  });

  res.json({ message: "saved!" });
});

app.use(`/.netlify/functions/api`, router);

module.exports = app;
module.exports.handler = serverless(app);
