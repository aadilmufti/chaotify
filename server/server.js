const express = require("express");
const randomWords = require("random-words");
const request = require("request");
const cors = require("cors");
require("dotenv").config();

const app = express();

const port = process.env.PORT;

var clientId = process.env.CLIENT_ID,
  clientSecret = process.env.CLIENT_SECRET;

var authOptions = {
  url: "https://accounts.spotify.com/api/token",
  headers: {
    Authorization:
      "Basic " + Buffer.from(clientId + ":" + clientSecret).toString("base64"),
  },
  form: {
    grant_type: "client_credentials",
  },
  json: true,
};

app.use(cors());

app.get("/", (req, res) => {
  res.send("welcome to chotify!");
});

app.get("/randomtracks", (req, res) => {
  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var token = body.access_token;
      var qWord = randomWords();
      var randomOffset = Math.floor(Math.random() * 200) + 0;
      var offset = randomOffset;
      var url = `https://api.spotify.com/v1/search?q=${qWord}&type=track&market=US&limit=1&offset=${offset}`;

      var options = {
        url: url,
        headers: {
          Authorization: "Bearer " + token,
        },
        json: true,
      };
      request.get(options, function(error, response, body) {
        var trackItems = JSON.parse(JSON.stringify(body));
        trackItems = trackItems.tracks.items;
        trackItems = trackItems[0];

        var songTitle = trackItems["name"];

        var artistObj = trackItems["artists"][0];
        var artistName = artistObj["name"];

        var extUrlObj = trackItems["external_urls"];
        var songLink = extUrlObj["spotify"];

        var previewLink = trackItems["preview_url"];

        var songPopularity = trackItems["popularity"];

        var trackObj = {
          searchWord: qWord,
          artist: artistName,
          song: songTitle,
          songUrl: songLink,
          previewUrl: previewLink,
          popularity: songPopularity,
        };

        res.json(trackObj);
      });
    }
  });
});

app.listen(port, () => console.log(`server started on port: ${port}`));
