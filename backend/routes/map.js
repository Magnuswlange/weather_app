const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const lat = Number(req.query.lat);
    const lon = Number(req.query.lon);
    const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

    if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
      return res
        .status(400)
        .json({ error: "Lat and lon must be valid numbers" });
    }

    if (!GOOGLE_API_KEY) {
      return res
        .status(500)
        .json({ error: "Invalid Google API key on server" });
    }

    const url = new URL("https://maps.googleapis.com/maps/api/staticmap");
    url.searchParams.set("center", `${lat},${lon}`);
    url.searchParams.set("zoom", 14);
    url.searchParams.set("size", "600x600");
    url.searchParams.set("key", GOOGLE_API_KEY);

    const response = await fetch(url);

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: response.text || "Google Maps request failed" });
    }

    res.set(
      "Content-Type",
      response.headers.get("content-type") || "image/png",
    );
    res.set("Cache-Control", "public, max-age=3600");

    const arrayBuffer = await response.arrayBuffer();
    return res.send(Buffer.from(arrayBuffer));
  } catch (e) {
    return res.status(500).json({ error: "Internal server error: ", e });
  }
});

module.exports = router;
