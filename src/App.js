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

  changeTd = val => {
    this.setState({td_value: val})
  }

  changeTdAr = val => {
    const temp = this.state.td_array;
    this.setState({td_array: temp.push(val)})
  }

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

  sortTable = () => {
    for(let i = 0; i < this.state.td_array.length; i++) {
      alert(this.state.td_array);
      document.getElementById("myTable").rows[i+1].getElementsByTagName("TD")[3].value = this.state.td_array[i];
    }

    let table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("myTable");
    switching = true;
    while (switching) {
      switching = false;
      rows = table.rows;
      alert("rows: "+rows);
      for (i = 1; i < (rows.length-1); i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("TD")[3];
        y = rows[i+1].getElementsByTagName("TD")[3];
        console.log(x);
        
        /*x2 = document.getElementById('expire_'+(i-1)).value;
        y2 = document.getElementById('expire_'+(i)).value;
        x1.value = x2;
        y1.value = y2;
        */
        alert("i: "+i);
        alert("x: "+x);
        alert("y: "+y);
        alert("T F : "+(x>y));
        if (x > y) {
          shouldSwitch = true;
          break; 
        }
      }
    } 
    if (shouldSwitch){
      rows[i].parentNode.insertBefore(rows[i+1], rows[i]);
      alert('true');
      // rename every id
      switching = true;
    }
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
        <Form changeTd={this.changeTd} changeTdAr={this.changeTdAr} td_array={td_array} td_value={td_value} handleSubmit={this.handleSubmit} />
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
