import React, { Component } from "react";
import Table from "./Table";
import Form from "./Form";
import Sort from "./Sort";
import Nav from "./Nav";

class App extends Component {
  state = {
    reminders: [],
    filterArr: [],
    filterExpression: "",
    deleted: [],
    page: "HOME",
  };

  removeCharacter = (index, type) => {
    const { reminders, deleted, filterArr } = this.state;

    let rem;
    reminders.forEach((val) => {
      if (index === val) {
        rem = val;
      }
    });
    if (rem) {
      // going into the garbage

      this.setState({
        deleted: [...deleted, rem],
        reminders: reminders.filter((val) => {
          return val !== index;
        }),
      });
    } else {
      // delete forever

      if (type === "recover") {
        this.setState({
          reminders: [...reminders, index],
        });
      }

      this.setState({
        deleted: deleted.filter((val) => {
          return val !== index;
        }),
      });
    }

    this.setState({
      filterArr: filterArr.filter((val) => {
        return val !== index;
      }),
    });

    // must resize table-array after deleting
    // alert("removing (index obj): "+index);
  };

  // when form is submitted
  handleSubmit = (character) => {
    const arr = [...this.state.reminders, character];
    this.setState({
      reminders: arr,
      filterArr: arr,
      filterExpression: "",
    });
    console.log(arr);
  };

  // filter method
  handleFilter = (val) => {
    const { value } = val.target; // filter data
    this.setState({ filterExpression: val.target.value });

    // if the user has input reminders in the filter
    this.setState({
      filterArr: this.selectFilter(value, this.state.reminders),
    });
  };

  selectFilter = (value, reminders) => {
    const regEx = new RegExp("^" + value);
    let filter;
    if (value !== "") {
      filter = reminders.filter((item) => {
        return regEx.test(item.type);
      });
    } else {
      filter = reminders;
    }
    return filter;
  };

  sortTable = (event) => {
    const { reminders, deleted, filterExpression, page } = this.state;
    const { name } = event.target; // value is: reminders name: ex: published

    let obj1, obj2;

    obj1 = this.sortArrs(0, reminders, name);
    obj2 = this.sortArrs(0, deleted, name);

    // map the table
    this.setState({
      reminders: obj1,
      deleted: obj2,
    });

    this.setState({
      filterArr: this.selectFilter(
        filterExpression,
        page === "GARBAGE" ? obj2 : obj1
      ),
    });
  };

  sortArrs = (returned, items, name) => {
    return [].concat(items).sort(function (a, b) {
      if (name === "alphabetized") {
        if (a.type.toLowerCase() < b.type.toLowerCase()) {
          returned = -1;
        }
        if (b.type.toLowerCase() < a.type.toLowerCase()) {
          returned = 1;
        }
        return returned;
      } // end of aphabetized
      if (name === "deadline") {
        if (a.deadline > b.deadline) {
          returned = 1;
        }
        if (b.deadline > a.deadline) {
          returned = -1;
        }
        return returned;
      }
      if (name === "published") {
        returned = a.created - b.created;
      }
      return returned;
    });
  };

  changePage = (event) => {
    const { name, value } = event.target; // name i.e. GARBAGE value.arr == example. deleted or reminders array (they are really named that)
    const { deleted, reminders } = this.state;
    let obj = [];

    /* this code is for the reminder and garbage buttons, they have a specific filter in effect right after a button is pressed*/
    if (name === "GARBAGE") {
      obj = deleted;
    } else if (name === "REMINDERS" || name === "CALCULATE") {
      obj = reminders;
    }

    this.setState({
      page: name,
      [value.arr]: obj,
      filterArr: obj,
    });
  };

  undo = () => {
    const { reminders, deleted } = this.state;
    if (deleted.length > 0) {
      const push = deleted[deleted.length - 1];
      const newArr = [...reminders, push];
      this.setState({
        reminders: newArr,
        deleted: deleted.filter((val, ind) => {
          return ind !== deleted.length - 1;
        }),
      });
      this.setState({
        filterArr: this.selectFilter(this.state.filterExpression, newArr),
      });
    }
  };

  updateReminders = (deadline, count) => {
    const { reminders, deleted, page } = this.state;

    if (page === "GARBAGE") {
      this.setState({
        deleted: this.findInd(deleted, deadline, count),
      });
    } else {
      this.setState({
        reminders: this.findInd(reminders, deadline, count),
      });
    }
  };

  findInd = (type, deadline, count) => {
    return type.map((val, ind) => {
      if (ind === count) {
        val.deadline = deadline;
      }
      return val;
    });
  };

  render() {
    let { reminders, filterExpression, filterArr, page, deleted } = this.state;
    let cost = 0;

    reminders.forEach((val) => {
      if (!isNaN(val.$)) {
        cost += parseInt(val.$);
      }
    });

    if (page === "GARBAGE") {
      return (
        <div className="container">
          <h3>Garbage</h3>
          <Nav changePage={this.changePage} page={page} />

          <Sort
            reminders={reminders}
            sortTable={this.sortTable}
            undo={this.undo}
            length={deleted.length}
            filterExpression={filterExpression}
            handleFilter={this.handleFilter}
          />

          <label>Garbage &nbsp;&nbsp;&nbsp; Items: {filterArr.length}</label>
          <Table
            page="GARBAGE"
            length={deleted.length}
            filterArr={filterArr}
            removeCharacter={this.removeCharacter}
            updateReminders={this.updateReminders}
          />
        </div>
      );
    } else if (page === "CREATE") {
      return (
        <div className="container">
          <h3>Reminder</h3>

          <Nav changePage={this.changePage} page={page} />

          <Form
            handleSubmit={this.handleSubmit}
            updateReminders={this.updateReminders}
          />
        </div>
      );
    } else if (page === "REMINDERS") {
      if (deleted.length > 0) {
        // show undo button
        return (
          <div className="container">
            <h3>Reminder</h3>

            <Nav changePage={this.changePage} page={page} />
            <Sort
              reminders={reminders}
              sortTable={this.sortTable}
              undo={this.undo}
              length={deleted.length}
              filterExpression={filterExpression}
              handleFilter={this.handleFilter}
            />
            <label>
              Reminders &nbsp;&nbsp;&nbsp; Items: {filterArr.length}
            </label>

            <button onClick={this.undo}>Undo</button>

            <Table
              page={page}
              filterArr={filterArr}
              removeCharacter={this.removeCharacter}
              updateReminders={this.updateReminders}
            />
          </div>
        );
      } else {
        return (
          // no undo button reminder
          <div className="container">
            <h3>Reminder</h3>

            <Nav changePage={this.changePage} page={page} />
            <Sort
              reminders={reminders}
              sortTable={this.sortTable}
              undo={this.undo}
              length={deleted.length}
              filterExpression={filterExpression}
              handleFilter={this.handleFilter}
            />
            <label>
              Reminders &nbsp;&nbsp;&nbsp; Items: {filterArr.length}
            </label>
            <Table
              page={page}
              filterArr={filterArr}
              removeCharacter={this.removeCharacter}
              updateReminders={this.updateReminders}
            />
          </div>
        );
      }
    } else if (page === "CALCULATE") {
      return (
        <div className="container">
          <h3>Calculate</h3>
          <Nav changePage={this.changePage} page={page} />
          <h4>Total cost</h4>
          {cost}
          <h4>Estimated time total</h4>
        </div>
      );
    } else {
      // the HOME page
      return (
        <div className="container">
          <h3>Home</h3>

          <Nav changePage={this.changePage} page={page} />

          <label>Reminders &nbsp;&nbsp;&nbsp; Items: {reminders.length}</label>
          <Table
            page="REMINDERS"
            length={reminders.length}
            filterArr={this.selectFilter(filterExpression, reminders)}
            removeCharacter={this.removeCharacter}
            updateReminders={this.updateReminders}
          />
          <label>Garbage &nbsp;&nbsp;&nbsp; Items: {deleted.length}</label>
          <Table
            page="HOME"
            length={deleted.length}
            filterArr={this.selectFilter(filterExpression, deleted)}
            removeCharacter={this.removeCharacter}
            updateReminders={this.updateReminders}
          />
          <button
            name="REMINDERS"
            value={{ arr: "reminders" }}
            onClick={this.changePage}
          >
            Reminder items only
          </button>
          <button
            name="GARBAGE"
            value={{ arr: "deleted", page: "page" }}
            onClick={this.changePage}
          >
            Garbage items only
          </button>
          <button
            name="CALCULATE"
            value={{ arr: "reminders" }}
            onClick={this.changePage}
          >
            Calculate
          </button>
        </div>
      );
    }
  }
}

export default App;
