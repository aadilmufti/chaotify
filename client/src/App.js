import React from "react";
import "./App.css";
import Track from "./components/Track";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends React.Component {
  render() {
    return (
      <div>
        <Track />
      </div>
    );
  }
}

export default App;
