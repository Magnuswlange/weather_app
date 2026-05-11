const express = require("express");
const router = express.Router();
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

router.get("/", async (req, res) => {
  try {
    const lat = Number(req.query.lat);
    const lon = Number(req.query.lon);

    if (!Number(isFinite(lat) || !Number(isFinite(long)))) {
      return res
        .status(400)
        .json({ error: "Lat and lon must be valid numbers" });
    }

    if (!OPENWEATHER_API_KEY) {
      return res
        .status(500)
        .json({ error: "No OPENWEATHER_API_KEY on server" });
    }

    const url = new URL("https://api.openweathermap.org/data/3.0/onecall");
    url.searchParams.set("lat", String(lat));
    url.searchParams.set("lon", String(lon));
    url.searchParams.set("exclude", "minutely,alerts");
    url.searchParams.set("units", "metric");
    url.searchParams.set("appid", OPENWEATHER_API_KEY);

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: data.message || "Weather request failed" });
    }

    return res.json(data);
  } catch (e) {
    return res.status(500).json({ error: "Internal server error: ", e });
  }
});

module.exports = router;
