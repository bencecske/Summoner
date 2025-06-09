const summonerName = "TF ecneB";

fetch(`/summoner/${summonerName}`)
  .then(res => res.json())
  .then(data => {
    console.log("Summoner info:", data);
  })
  .catch(err => console.error("Hiba:", err));
