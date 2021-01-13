import React, { Component } from "react";
// import ReactAudioPlayer from "react-audio-player";
import "./styles/Track.scss";

class TrackTwo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      track: [],
    };

    this.createVisualization = this.createVisualization.bind(this);
  }

  componentDidMount() {
    this.createVisualization();
    this.fetchTrack();
  }

  fetchTrack = () => {
    fetch("/randomtracks")
      .then((res) => res.json())
      .then((track) => {
        this.setState({ track }, () => {
          console.log(track);
        });
        if (track.previewUrl === null) {
          alert("Sorry, no preview for this next song :( ");
        }
      });
  };

  createVisualization() {
    let context = new AudioContext();
    let analyser = context.createAnalyser();
    let canvas = this.refs.analyzerCanvas;
    let ctx = canvas.getContext("2d");
    let audio = this.refs.audio;
    audio.crossOrigin = "anonymous";
    let audioSrc = context.createMediaElementSource(audio);
    audioSrc.connect(analyser);
    audioSrc.connect(context.destination);
    analyser.connect(context.destination);

    function renderFrame() {
      let freqData = new Uint8Array(analyser.frequencyBinCount);
      requestAnimationFrame(renderFrame);
      analyser.getByteFrequencyData(freqData);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      console.log(freqData);
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "rgba(35, 7, 77, 1)");
      gradient.addColorStop(1, "rgba(204, 83, 51, 1)");
      ctx.fillStyle = gradient;
      let bars = 100;
      for (var i = 0; i < bars; i++) {
        let bar_x = i * 3;
        let bar_width = 2;
        let bar_height = -(freqData[i] / 2);
        ctx.fillRect(bar_x, canvas.height, bar_width, bar_height);
      }
    }

    renderFrame();
  }

  render() {
    var { track } = this.state;
    track = JSON.parse(JSON.stringify(track));
    return (
      <div className="App">
        <h2>
          {track.song} by {track.artist}
        </h2>
        <div id="mp3_player">
          <div id="audio_box">
            <audio
              ref="audio"
              autoPlay={true}
              controls={true}
              //this is the link to my song url feel free to use it or replace it with your own
              src={track.previewUrl}
            ></audio>
          </div>
          <canvas ref="analyzerCanvas" id="analyzer"></canvas>
        </div>
        <button className="track-button" onClick={this.fetchTrack}>
          <span className="button-text">New Track!</span>
        </button>
      </div>
    );
  }
}

export default TrackTwo;
