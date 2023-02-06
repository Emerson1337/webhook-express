import express from "express";
import { Router, Request, Response } from "express";
import fs from "fs";

const app = express();
const route = Router();

app.use(express.json());

route.get("/", (req: Request, res: Response) => {
  res.json({ message: "hello world with Typescript" });
});

route.post("/send-data", (req: Request, res: Response) => {
  const date = Date.now();

  fs.writeFile(`${date}.json`, JSON.stringify(req.body), function (err) {
    if (err) {
      console.log(err);
    }
  });

  res.json({ message: "saved!" });
});

app.use(route);

app.listen(3332, () => console.log("Server has been started! 🚀"));
