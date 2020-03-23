import React, { Component } from "react";
import Table from "./Table";
import Form from "./Form";
import Filter from "./Filter";

class App extends Component {
  state = {
    characters: [],
    filter: [],
    filterData: ''
  };

  removeCharacter = index => {
    const { characters, filter, filterData } = this.state;

    this.setState({
      characters: characters.filter((character, i) => {
        return i !== index;
      })
    });
  };

  handleSubmit = character => {
    this.setState({ characters: [...this.state.characters, character] });
  };

  // filter method
  handleFilter = key => {
    // this.setState({filter: 0}) // arr.filter the characters
  };

  render() {
    const { characters, filterData } = this.state;

    return (
      <div className="container">
        <h3>Reminder</h3>
        <Filter 
          filterData={filterData} 
          handleFilter={this.handleFilter}
        />
        <h4>Create</h4>
        <Form handleSubmit={this.handleSubmit} />
        <h4>Reminder wall</h4>
        <Table
          characterData={characters}
          removeCharacter={this.removeCharacter}
        />

        
      </div>
    );
  }
}

export default App;
