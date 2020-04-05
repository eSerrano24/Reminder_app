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
    td_array: [],
    td_value: null
  };

  removeCharacter = index => {
    const { characters } = this.state;
    alert("index: "+index);
    const value = characters.filter((character, i) => {
      return i !== index;
    });

    this.setState({
      characters: value,
    });

    this.setState({
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
  changeTd = val => {
    this.setState({td_value: val})
  }

  changeTdAr = val => {}

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

    // we must revalue the rows because the td_array should be the source of properly mapping the table.row[3]values to it's td_index. if after rearrangement or deletion, the rows "may" have never been updated yet.
    // I could be wrong ... not to self, comment it out to see
    for (let i = 0; i < this.state.td_array.length; i++) {
      // is it susceptible to exceeding td_array length? ... I think it will not
      document.getElementById("myTable").rows[i+1].getElementsByTagName("TD")[3].value = this.state.td_array[i];
    }

    console.log('the td_array:');
    console.log(this.state.td_array);

    // this algorithm probably stinks but it's possible, right now it does not reorder everything completely in one shot
    let table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("myTable");
    switching = true;
    while (switching) {
      switching = false;
      rows = table.rows;
      for (i = 1; i < (rows.length-1); i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("TD")[3].value;
        y = rows[i+1].getElementsByTagName("TD")[3].value;

        alert("Row value: "+i+": "+x);
        alert("Row value: "+(i+i)+": "+y);
        alert("T F : "+(x>y));

        if (x > y) {
          shouldSwitch = true;
          break; 
        }
      }
    } 

    if (shouldSwitch) {
      // repeated code make a function out of this
      const characters = this.state.characters;
      let temp = this.state.characters[i];
      characters[i] = characters[i-1];
      characters[i-1] = temp;

      // conflict of table? React table vs static table
      console.log('switch row');
      this.setState({
        characters: characters
      });
      // rows[i].parentNode.insertBefore(rows[i+1], rows[i]);
      // replace the td_array here too
      // ...
      // ...
      // tricky must remember the rows and the array index are different by 'one' when mapping these comparatively
      const td_array = this.state.td_array;
      temp = td_array[i];
      td_array[i] = td_array[i-1];
      td_array[i-1] = temp;
      this.setState({
        td_array: td_array
      });
      switching = true;
    }
    console.log("sort: "+this.state.td_array);
  }

  render() {
    const { filterData, filter, td_array, td_value } = this.state;
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
          changeTd={this.changeTd} 
          changeTdAr={this.changeTdAr} 
          td_array={td_array} td_value={td_value} 
          handleSubmit={this.handleSubmit} 
        />
        <h4>Reminder wall</h4>
        <Table
          characterData={filter}
          removeCharacter={this.removeCharacter}
          td_array={td_array}
          td_value = {td_value}
          changeTd={this.changeTd} 
          changeTdAr={this.changeTdAr}
        />
      </div>
    );
  }
}

export default App;
