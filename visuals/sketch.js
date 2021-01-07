var psong;
var fft;
var button;
var button2;
var track;

var trDict = {};
var trList = [];
let jsondata = "";
let dums;

var nUrl = "http://localhost:5000/randomtracks";

async function getTrack(url) {
  let response = await fetch(url);
  let data = await response.json();
  return data;
}

async function getInfo() {
  getTrack(nUrl).then((data) => {
    track = JSON.parse(JSON.stringify(data));
    //console.log(track);
    var itrack = {
      artist: track.artist,
      popularity: track.popularity,
      previewUrl: track.previewUrl,
      searchWord: track.searchWord,
      song: track.song,
      songUrl: track.songUrl,
    };
    if (track.previewUrl === null) {
      alert("Sorry, no preview for this next song :( ");
    }
    return itrack;
  });
}

const fetchTrack = () => {
  fetch("http://localhost:5000/randomtracks")
    .then((res) => res.json())
    .then((data) => {
      track = JSON.parse(JSON.stringify(data));
      console.log(track);
      trList.push(track.previewUrl);
      if (trList.length > 1) {
        trList.shift();
      }
      if (track.previewUrl === null) {
        alert("Sorry, no preview for this next song :( ");
      }
    });
};

function toggleSong() {
  if (psong.isPlaying()) {
    psong.pause();
  } else {
    psong.play();
  }
}

function preload() {
  psong = loadSound("frenchjazz.mp3");
}

// function preload() {
//   httpGet(nUrl, "json", false, function(res) {
//     dums = res;
//     //console.log(dums.previewUrl);
//     loadSound(dums.previewUrl);
//   });
// }

function setup() {
  createCanvas(400, 400);
  loadJSON(nUrl, trackInfo);
  colorMode(HSB);
  angleMode(DEGREES);
  button = createButton("toggle");
  button.mousePressed(toggleSong);
  button2 = createButton("new track");
  button2.mousePressed(fetchTrack);
  psong.play();
  fft = new p5.FFT(0.9, 128);
}

function draw() {
  background(0);
  var spectrum = fft.analyze();
  //console.log(spectrum);
  //stroke(255);
  noStroke();
  translate(width / 2, height / 2);
  //beginShape();
  for (var i = 0; i < spectrum.length; i++) {
    var angle = map(i, 0, spectrum.length, 0, 360);
    var amp = spectrum[i];
    var r = map(amp, 0, 256, 20, 100);
    //fill(i, 255, 255);
    var x = r * cos(angle);
    var y = r * sin(angle);
    stroke(i, 255, 255);
    line(0, 0, x, y);
    //vertex(x, y);
    //var y = map(amp, 0, 256, height, 0);
    //rect(i * w, y, w - 2, height - y);
  }
  //endShape();
}

function trackInfo(tunes) {
  let t = tunes.previewUrl;
  console.log(t);
}
