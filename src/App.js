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
    deleted: [],
    td_deleted: [],
    deletePage: false
  };

  removeCharacter = index => { // does not work for the trash yet
    const {reminders, td_deleted, deleted } = this.state;
    const newDelete = [...td_deleted, reminders[index].value];
    const newArr = reminders.filter((notused, i) => {
      return i !== index;
    });

    this.setState({
      deleted: [...deleted, reminders[index]],
      reminders: newArr,
      filterArr: newArr,
      td_deleted: newDelete
    });

    // must resize table-array after deleting
    // alert("removing (index): "+index);
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
    const {reminders, td_array} = this.state;
    this.setState({
      td_array: [...td_array, val],
      reminders: reminders.map(function(row, i) {
        if(i===ind) {
          row.value = val;
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
    const {reminders, deleted, deletePage} = this.state;
    const {name, value} = event.target;

    let obj; let returned = 0;
    if (name === 'deleted') {
      obj = deleted;
      this.setState({deletePage: !deletePage});
    } else if (name === 'alphabetized') {
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
      obj = [].concat(reminders).sort(function(a,b) {
        if (name === 'deadline') {
          // alert('returned deadline');
          if (a.value > b.value) {
            returned = -1;
          }
          if (b.value > a.value) {
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
      const td_sort = obj.map((val)=> {
        return val.value;
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

  undo = () => {
    const {reminders, deleted, td_array, td_deleted} = this.state;
    if (deleted.length > 0) {
    const push = deleted[deleted.length-1];
    const newArr = [...reminders, push];
    alert(push.value);
    this.setState({
      td_array: [...td_array, push.value],
      td_deleted: (td_deleted).filter((val, ind)=>{
        return ind !== (td_deleted.length-1);
      }),

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

  render() {
    const { reminders, filterExpression, filterArr, td_array, deletePage, td_deleted} = this.state;
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
          tdDates={this.tdDates} 
          td_array={td_array} 
          handleSubmit={this.handleSubmit} 
        />
        <h4>Reminder wall</h4>
        <Table
          deletePage={deletePage}
          td_deleted = {td_deleted}
          td_array={td_array}
          original = {reminders}
          filterArr={filterArr}
          removeCharacter={this.removeCharacter}

          tdDates={this.tdDates} 

        />
      </div>
    );
  }
}

export default App;
