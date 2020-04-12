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
    deleted: [],
    deletePage: "FALSE"
  };

  removeCharacter = index => { // does not work for the trash yet
    const {reminders, deleted, deletePage } = this.state;
    if (deletePage === "TRUE") {
      const newArr = deleted.filter((notused, i) => {
        return i !== index;
      });
      this.setState({
        deleted: newArr,
        filterArr: newArr,
      });
    } else {
      const newArr = reminders.filter((notused, i) => {
        return i !== index;
      });
      this.setState({
        deleted: [...deleted, reminders[index]],
        reminders: newArr,
        filterArr: newArr,
      });
    } 

    // must resize table-array after deleting
    // alert("removing (index): "+index);
  };

  // when form is submitted
  handleSubmit = character => {
    const arr = [...this.state.reminders, character];
    this.setState({ 
      reminders: arr,
      filterArr: arr,
      filterExpression: ''
     });
     console.log(arr);
  };

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
    const {reminders, deleted, deletePage} = this.state;
    const {name, value} = event.target;

    let obj; let returned = 0;
    if (name === 'deleted') {
      obj = deleted;
      if (deletePage === 'FALSE') {
        this.setState({deletePage: 'TRUE'});
      } 
    } else if (name === 'alphabetized') {
      if (deletePage==="TRUE") {
        this.setState({deletePage: "FALSE"});
      }
      obj = [].concat(reminders).sort(function(a, b) {
        if (a.type.toLowerCase() < b.type.toLowerCase()) {
          returned = -1;
        }
        if (b.type.toLowerCase() < a.type.toLowerCase()) {
          returned = 1;
        } 
        return returned;
      });
    } // end of aphabetized
    else {
      if (deletePage==="TRUE") {
        this.setState({deletePage: "FALSE"});
      }
      obj = [].concat(reminders).sort(function(a,b) {
        if (name === 'deadline') {
          // alert('returned deadline');
          if (a.deadline > b.deadline) {
            returned = -1;
          }
          if (b.deadline > a.deadline) {
            returned = 1;
          } 
          return returned;
        }
        if (name === 'published') {
          // alert('returned published');
          returned = a.created - b.created
        }
        return returned; 
      });
  
      // map the table
      this.setState({
        [value]: obj
      });

    }
    this.setState({
      filterArr: this.selectFilter(this.state.filterExpression, obj), 
    })
  }

  undo = () => {
    const {reminders, deleted} = this.state;
      if (deleted.length > 0) {
        const push = deleted[deleted.length-1];
        const newArr = [...reminders, push];
        alert(push.deadline);
        this.setState({
        reminders: newArr,
        deleted: deleted.filter((val, ind) => {
          return ind !== deleted.length - 1;
          }),
        })        
      this.setState({
        filterArr: this.selectFilter(this.state.filterExpression, newArr),
      })
    }
  }

  updateReminders = (rem, count) => {
    const {reminders} = this.state;
    this.setState({
      reminders: reminders.map((val, ind) => {
        if(ind === count) {
          val.deadline = rem;
        }
        return val;
      })
    });
  }

  render() {
    const { reminders, filterExpression, filterArr, deletePage, deleted} = this.state;
    return (
      <div className="container">
        <h3>Reminder</h3>
        <button onClick={this.undo}>Undo</button>
        <Filter 
          filterExpression={filterExpression} 
          handleFilter={this.handleFilter}
        />
        <Options reminders={reminders} sortTable = {this.sortTable}/>
        <h4>Create</h4>
        <Form  
          handleSubmit={this.handleSubmit} 
        />
        <h4>Reminder wall</h4>
        <Table
          deletePage = {deletePage}
          deleted = {deleted}
          original = {reminders}
          filterArr = {filterArr}
          removeCharacter = {this.removeCharacter}
          updateReminders = {this.updateReminders}
        />
      </div>
    );
  }
}

export default App;
