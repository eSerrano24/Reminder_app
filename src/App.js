import React, { Component } from "react";
import Table from "./Table";
import Form from "./Form";
import Filter from "./Filter";
import Order from "./Order";

class App extends Component {
  state = {
    characters: [],
    filter: [],
    filterData: ''
  };

  removeCharacter = index => {
    const { characters } = this.state;
    const value = characters.filter((character, i) => {
      return i !== index;
    });

    this.setState({
      characters: value
    });

    this.setState({
      filter: value
    });

  };

  handleSubmit = character => {
    const value = [...this.state.characters, character];
    this.setState({ characters: value });
    this.setState({ filter: value});
    this.setState({ filterData: ''});
  };

  // filter method
  handleFilter = key => {
    const {value} = key.target; // filter data
    const regEx = new RegExp('^'+value);
    const {characters} = this.state;
    this.setState({filterData: value});

    // if the user is filtering by type then filter nothing
    if(value !== '') {
      this.setState({filter: characters.filter((item, i, arr) => {
        return (regEx.test(item.type));
        })
      })
    } else {
      this.setState({filter: characters});
    }
  };

  sortTable = choice => {
    
  }

  render() {
    const { filterData, filter } = this.state;

    return (

      <div className="container">
        <h3>Reminder</h3>
        <Filter 
          filterData={filterData} 
          handleFilter={this.handleFilter}
        />
        <Order sortTable = {this.sortTable}/>
        <h4>Create</h4>
        <Form handleSubmit={this.handleSubmit} />
        <h4>Reminder wall</h4>
        <Table
          characterData={filter}
          removeCharacter={this.removeCharacter}
        />
      
      </div>
    );
  }
}

export default App;
