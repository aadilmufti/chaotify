import React from "react";
import ReactAudioPlayer from "react-audio-player";
import P5Wrapper from "react-p5-wrapper";
import sketch1 from "./sketch1.js";

import "./styles/Track.scss";

class Track extends React.Component {
  constructor() {
    super();
    this.state = {
      track: [],
    };
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

  componentDidMount() {
    this.fetchTrack();
  }

  render() {
    var { track } = this.state;
    track = JSON.parse(JSON.stringify(track));
    return (
      <div className="track-item">
        <div></div>
        <h3>Random Search Word: {track.searchWord}</h3>
        <h3>Song: {track.song}</h3>
        <h3>Artist: {track.artist}</h3>
        <h3>
          Spotify Link:{" "}
          <a href={track.songUrl} target="_blank" rel="noopener noreferrer">
            Open in Spotify
          </a>
        </h3>
        <h3>Popularity of song: {track.popularity}</h3>

        <div className="player">
          <h3>30-second Preview:</h3>
          <span className="player-controls">
            <ReactAudioPlayer src={track.previewUrl} controls autoPlay />
          </span>
        </div>

        <button className="track-button" onClick={this.fetchTrack}>
          <span className="button-text">New Track!</span>
        </button>

        <div className="prev-link">
          <a href={track.previewUrl} target="_blank" rel="noopener noreferrer">
            Open 30-second Preview
          </a>
        </div>
        <div>
          <P5Wrapper sketch={sketch1} />
        </div>
      </div>
    );
  }
}

export default Track;
