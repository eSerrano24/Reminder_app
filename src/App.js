import React, { Component } from "react";
import Table from "./Table";
import Form from "./Form";

class App extends Component {
  state = {
    characters: []
  };

  removeCharacter = index => {
    const { characters } = this.state;

    this.setState({
      characters: characters.filter((character, i) => {
        return i !== index;
      })
    });
  };

  handleSubmit = character => {
    this.setState({ characters: [...this.state.characters, character] });
  };

  render() {
    const { characters } = this.state;

    return (
      <div className="container">
        <h3>Reminder</h3>
        <p><i>Keep track, meet deadlines, succeed.</i></p>
        <Form handleSubmit={this.handleSubmit} />
        <Table
          characterData={characters}
          removeCharacter={this.removeCharacter}
        />
        
      </div>
    );
  }
}

export default App;
