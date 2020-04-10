import React, { Component } from "react";
import Table from "./Table";
import Form from "./Form";
import Filter from "./Filter";
import Options from "./Options";

class App extends Component {
  state = {
    reminders: [],
    filterArr: [],
    filterExpression: '',
    td_array: [],
    deleted: []
  };

  removeCharacter = index => {
    const { reminders } = this.state;
    const newArr = reminders.filter((notused, i) => {
      if (i === index) {
        this.state.deleted.push(notused);
      }
      return i !== index;
    });

    this.setState({
      reminders: newArr,
      filterArr: newArr
    });

    // must resize table-array after deleting
    alert("removing (index): "+index);
    this.state.td_array.splice(index, 1);
    console.log("td_arr: on remove- "+this.state.td_array);
  };

  // when form is submitted
  handleSubmit = character => {
    const arr = [...this.state.reminders, character];
    this.setState({ 
      reminders: arr,
      filterArr: arr,
      filterExpression: ''
     });
  };

  // value of the expiration date when it is changed for the table class
  tdDates = (val, ind) => {
    const {reminders} = this.state;
    this.setState({
      reminders: reminders.map(function(row, i) {
        if(i===ind) {
          row.value = Date.parse(val);
          row.created = new Date().getTime();
        }
        return row;
      })
    })
  }

  // filter method
  handleFilter = val => {
    const {value} = val.target; // filter data
    this.setState({filterExpression: val.target.value});

    // if the user has input reminders in the filter
    this.setState({filterArr: this.selectFilter(value, this.state.reminders)});
  };

  selectFilter = (value, reminders) => {
    const regEx = new RegExp('^'+value);
    let filter;
    if(value !== '') {
      filter = reminders.filter((item) => {
        return (regEx.test(item.type));
      }) 
    } else {
      filter = reminders;
    }
    return filter;
  } 

  sortTable = (event) => {  
    const {reminders, deleted} = this.state;
    const {name, value} = event.target;

    let obj;
    if (name === 'deleted') {
      obj = deleted;
    }
    else {
      obj = [].concat(reminders).sort(function(a,b) {
        if(name === 'deadline') {
          return b.value - a.value;
        }
        if (name === 'alphabetized') {
          if (a.type < b.type) {
            return 1;
          }
          if (b.type < a.type) {
            return -1;
          }
        }
        if (name === 'published') {
          return a.created - b.created
        }
        alert('returned 0');
        return 0;
      });
      const td_sort = obj.map((val)=> {
        return new Date(val.value).toLocaleDateString();
      });
  
      // map the table
      this.setState({
        [value]: obj,
        td_array: td_sort
      });
      console.log("sort: "+this.state.td_array);
    }
    this.setState({
      filterArr: this.selectFilter(this.state.filterExpression, obj), 
    })
  }

  render() {
    const { reminders, filterExpression, filterArr, td_array} = this.state;
    return (
      <div className="container">
        <h3>Reminder</h3>
        <Filter 
          filterExpression={filterExpression} 
          handleFilter={this.handleFilter}
        />
        <Options reminders={reminders} sortTable = {this.sortTable}/>
        <h4>Create</h4>
        <Form 
          tdDates={this.tdDates} 
          td_array={td_array} 
          handleSubmit={this.handleSubmit} 
        />
        <h4>Reminder wall</h4>
        <Table
          original = {reminders}
          filterArr={filterArr}
          removeCharacter={this.removeCharacter}
          td_array={td_array}
          tdDates={this.tdDates} 
        />
      </div>
    );
  }
}

export default App;
