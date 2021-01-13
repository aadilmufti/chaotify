import React from "react";
import "./App.css";
import Track from "./components/Track";
import TrackTwo from "./components/TrackTwo";
import TrackThree from "./components/TrackThree";
import Visualizer from "react-music-visualizer";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends React.Component {
  render() {
    return (
      <div>
        <TrackTwo />
      </div>
    );
  }
}

export default App;
