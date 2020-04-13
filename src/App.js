import React, { Component } from "react";
import Table from "./Table";
import Form from "./Form";
import Sort from "./Sort";
import Nav from "./Nav";

class App extends Component {
  state = {
    reminders: [],
    filterArr: [],
    filterExpression: '',
    deleted: [],
    page: "HOME",
  };

  removeCharacter = index => { // does not work for the trash yet
    const {reminders, deleted, page } = this.state;
    if (page === "GARBAGE") {
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

  changePage = event => {
 
    const {name, value} = event.target; // name i.e. GARBAGE value.arr == deleted
    const {deleted, reminders} = this.state;
    let obj = []; 

    if (name === 'GARBAGE') {
      obj = deleted;
    } else if (name === 'HOME') {
      obj = reminders;
    }
    
    this.setState({
      page: name,
      [value.arr]: obj,
      filterArr: obj
    });
  }

  sortTable = (event) => {  
    const {reminders, deleted} = this.state;
    const {name, value} = event.target; // value is: reminders name: ex: published

    let obj; let returned = 0;
 
    obj = [].concat(reminders).sort(function(a,b) {
        if (name === 'alphabetized') {
          if (a.type.toLowerCase() < b.type.toLowerCase()) {
            returned = -1;
          }
          if (b.type.toLowerCase() < a.type.toLowerCase()) {
            returned = 1;
          } 
          return returned;
        } // end of aphabetized
        if (name === 'deadline') {

          if (a.deadline > b.deadline) {
            returned = -1;
          }
          if (b.deadline > a.deadline) {
            returned = 1;
          } 
          return returned;
        }
        if (name === 'published') {
          returned = a.created - b.created;
        }
        return returned; 
      });
  
      // map the table
      this.setState({
        [value]: obj
      });

    this.setState({
      filterArr: this.selectFilter(this.state.filterExpression, obj), 
    })
  }

  undo = () => {
    const {reminders, deleted} = this.state;
      if (deleted.length > 0) {
        const push = deleted[deleted.length-1];
        const newArr = [...reminders, push];
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
    let { reminders, filterExpression, filterArr, page, deleted} = this.state;
    if (page === 'GARBAGE') {
      return (
        <div className="container">
          <h3>Reminder</h3>
          <Nav changePage = {this.changePage}/>
          <Sort reminders={reminders} sortTable = {this.sortTable}/> 
 
          <label>Items: {filterArr.length}</label>
          <Table
            page = {page}
            deleted = {deleted}
            original = {reminders}
            filterArr = {filterArr}
            removeCharacter = {this.removeCharacter}
            updateReminders = {this.updateReminders}
          />
        </div>
      );
    } else {
      return (
        <div className="container">

          <h3>Reminder</h3>

          <Nav changePage = {this.changePage}/>

          <Form  
            handleSubmit={this.handleSubmit} 
          />

          <label style={{position:'absolute', right:'150px'}}>Items: {filterArr.length}</label>

          <Sort 
            reminders={reminders} 
            sortTable = {this.sortTable} 
            undo = {this.undo} 
 
            length = {deleted.length}
            filterExpression = {filterExpression}
            handleFilter = {this.handleFilter}
          />

          <Table
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
}

export default App;
