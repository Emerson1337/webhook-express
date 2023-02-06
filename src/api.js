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
  const date = Date.now();

  fs.writeFile(`${date}.json`, JSON.stringify(req.body), function (err) {
    if (err) {
      console.log(err);
    }
  });

  res.json({ message: "saved!" });
});

router.get("/get-data", (req, res) => {
  const jsonsInDir = fs
    .readdirSync("./")
    .filter(
      (file) =>
        path.extname(file) === ".json" &&
        !path.basename(file).includes("package")
    );

  const allContents = [];

  jsonsInDir.forEach((file) => {
    const fileData = fs.readFileSync(path.join("./", file)).toString();
    allContents.push(JSON.parse(fileData.toString()));
  });

  res.json(allContents);
});

app.use(`/.netlify/functions/api`, router);

module.exports = app;
module.exports.handler = serverless(app);
