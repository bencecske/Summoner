const express = require("express");
const fetch = require("node-fetch"); // node-fetch@2 legyen
const app = express();
const PORT = 3000;

const RIOT_API_KEY = ""; // friss kulcs legyen

app.use(express.static("public"));

app.get("/summoner/:name", async (req, res) => {
  const summonerName = encodeURIComponent(req.params.name);
  const region = "eun1";
  const url = `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`;

  try {
    const response = await fetch(url, {
      headers: {
        "X-Riot-Token": RIOT_API_KEY
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Riot API error (${response.status}):`, errorText);
      return res.status(response.status).json({ error: "API error", details: errorText });
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Hálózati/fetch hiba:", err);
    res.status(500).json({ error: "Fetch error", details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Szerver fut a http://localhost:${PORT} címen`);
});
