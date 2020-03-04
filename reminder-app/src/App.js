import React, { Component } from "react";
import Table from "./Table";

class App extends Component {
  render() {
    const characters = [
      {
        name: "Charlie",
        job: "Janitor"
      },
      {
        name: "Mac",
        job: "Bouncer"
      },
      {
        name: "Dee",
        job: "Aspiring Actress"
      },
      {
        name: "Dennis",
        job: "Bartender"
      }
    ];
    return (
      <div className="Container">
        <Table characterData={characters} />
      </div>
    );
  }
}

export default App;
