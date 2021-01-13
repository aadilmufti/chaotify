import React, { Component, useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import Wave from "@foobar404/wave";

import "./styles/Track.scss";

class TrackThree extends Component {
  constructor(props) {
    super(props);

    this.state = {
      track: [],
    };
  }

  componentDidMount() {
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

  render() {
    var { track } = this.state;
    track = JSON.parse(JSON.stringify(track));

    return (
      <div className="App">
        <h2>
          {track.song} by {track.artist}
        </h2>
        <h3>Random Search Word: {track.searchWord}</h3>
        <h3>
          Spotify Link:{" "}
          <a href={track.songUrl} target="_blank" rel="noopener noreferrer">
            Open in Spotify
          </a>
        </h3>
        <h3>Popularity of song: {track.popularity}</h3>

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
        </div>
        <button className="track-button" onClick={this.fetchTrack}>
          <span className="button-text">New Track!</span>
        </button>
      </div>
    );
  }
}

export default TrackThree;
