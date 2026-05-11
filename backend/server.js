require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const weatherRouter = require("./routes/weather");
const mapRouter = require("./routes/map");

const logger = (req, res, next) => {
  console.log(req.method, req.path);
  next(); // don't hang, run next
};

// middleware: function that runs between the request and route handler: req -> middleware -> res.
app.use(
  cors({
    origin: [
      "http://localhost:4000",
      "http://localhost:5173",
      "http://127.0.0.1:4000",
      "http://127.0.0.1:5173",
      "http://weather.magnushome.xyz",
      "https://weather.magnushome.xyz",
    ],
  }),
);

app.use(logger);
app.use(express.json());
app.use("/api/weather", weatherRouter);
app.use("/api/map", mapRouter);

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
