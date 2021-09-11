const express = require("express");
const Quote = require("./models/quote");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
require("dotenv").config();
const app = express();

(async () => {
  await mongoose.connect(process.env.mongo_conn_string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  morgan("tiny");

  app.use(cookieParser());
  app.use(express.json());
  app.post("/api/quote", async (req, res) => {
    console.log(req.body);
    const created = new Quote({ ...req.body });
    await created.save();
    res.sendStatus(200); // I don't really care about this app, if you've fucked up a simple request then that's your problem
  });
  app.get("/api/quote", async (req, res) => {
    const recieved = await Quote.aggregate([
      {
        $match: { reviewed: true },
      },
      {
        $sample: { size: 5 },
      },
    ]);
    const quotes = recieved.map((item) => {
      const date = new Date(item.createdAt);
      return {
        ...item,
        createdAt: `${date.getDay()}-${date.getMonth()}-${date.getFullYear()}`,
      };
    });
    res.json(quotes);
  });

  app.use("/", express.static(path.join(__dirname, "public")));
  const port = process.env.PORT || 80;
  app.listen({ port }, () => console.log("⚡️ Server fired up at port", port));
})();
