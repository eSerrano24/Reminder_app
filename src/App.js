import React, { Component } from "react";
import Table from "./Table";
import Form from "./Form";
import Filter from "./Filter";
import Order from "./Order";

class App extends Component {
  state = {
    characters: [],
    filter: [],
    filterData: '',
    td_array: []
  };

  removeCharacter = index => {
    const { characters } = this.state;
    const value = characters.filter((character, i) => {
      return i !== index;
    });

    this.setState({
      characters: value,
      filter: value
    });

    // must resize table-array after deleting
    alert("removing (index): "+index);
    this.state.td_array.splice(index, 1);
    console.log("td_arr: on remove- "+this.state.td_array);
  };

  // when form is submitted
  handleSubmit = character => {
    const value = [...this.state.characters, character];
    this.setState({ 
      characters: value,
      filter: value,
      filterData: ''
     });
  };

  // value of the expiration date when it is changed for the table class
  tdExpire = (val, ind) => {
    const {characters} = this.state;
    this.setState({
      characters: characters.map(function(row, i) {
        if(i===ind) {
          row.value = Date.parse(val);
        }
        return row;
      })
    })
  }

  // filter method
  handleFilter = val => {
    const {value} = val.target; // filter data
    const regEx = new RegExp('^'+value);
    const {characters} = this.state;
    let filter;

    this.setState({filterData: value});

    // if the user has input characters in the filter
    if(value !== '') {
      filter = characters.filter((item) => {
        return (regEx.test(item.type));
      }) 
    } else {
      filter = characters;
    }
    this.setState({filter: filter});
  };

  sortTable = () => {

    const {characters} = this.state;
   
    const obj = [].concat(characters).sort(function(a,b){
      return a.value - b.value;
    });

    const obj2 = obj.map((val)=> {
      return new Date(val.value).toLocaleDateString();
    });

    console.log('the td_array:');
    console.log(this.state.td_array);

    // map the table
    this.setState({
      characters: obj,
      filter: obj,
      td_array: obj2
    });
    console.log("sort: "+this.state.td_array);
  }

  render() {
    const { characters, filterData, filter, td_array} = this.state;
    return (
      <div className="container">
        <h3>Reminder</h3>
        <Filter 
          filterData={filterData} 
          handleFilter={this.handleFilter}
        />
        <Order sortTable = {this.sortTable}/>
        <h4>Create</h4>
        <Form 
          tdExpire={this.tdExpire} 
          td_array={td_array} 
          handleSubmit={this.handleSubmit} 
        />
        <h4>Reminder wall</h4>
        <Table
          original = {characters}
          filter={filter}
          removeCharacter={this.removeCharacter}
          td_array={td_array}
          tdExpire={this.tdExpire} 
        />
      </div>
    );
  }
}

export default App;
