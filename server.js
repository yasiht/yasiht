import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();

// 🔒 Allow ONLY your domain
const ALLOWED_DOMAIN = "www.studentmessagepress.com";

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, false);
      if (origin.includes(ALLOWED_DOMAIN)) return callback(null, true);
      callback(new Error("Not allowed by CORS: " + origin));
    }
  })
);

// 🔹 Secure proxy endpoint for TSETMC
app.get("/tse", async (req, res) => {
  try {
    const url = "https://old.tsetmc.com/tsev2/data/MarketWatchPlus.aspx?d=0";

    const response = await fetch(url);
    const text = await response.text();

    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.send(text);

  } catch (err) {
    console.error("Proxy error:", err);
    res.status(500).send("Error while fetching");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`TSE Proxy running on port ${PORT}`));
