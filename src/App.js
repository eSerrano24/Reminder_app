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
  };

  // when form is submitted
  formSubmit = (character) => {
    const arr = [...this.state.reminders, character];
    this.setState({
      reminders: arr,
      filterArr: arr,
      filterExpression: "",
    });
  };

  // filter method
  handleFilter = (val) => {
    const { value } = val.target; // filter data
    const { page, reminders, deleted } = this.state;
    this.setState({ filterExpression: val.target.value });

    // if the user has input reminders in the filter
    this.setState({
      filterArr: this.selectFilter(
        value,
        page === "GARBAGE" ? deleted : reminders
      ), // reminders only not garbage
    });
  };

  // used to filter what tables show
  selectFilter = (value, reminders) => {
    const regEx = new RegExp("^" + value);
    let filter;
    if (value !== "") {
      filter = reminders.filter((item) => {
        return regEx.test(item.value);
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
        if (a.value.toLowerCase() < b.value.toLowerCase()) {
          returned = -1;
        }
        if (b.value.toLowerCase() < a.value.toLowerCase()) {
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

  // if delete reminder item on accident
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

  // deadlines can be updated
  updateItems = (deadline, count) => {
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

  findInd = (table, deadline, count) => {
    return table.map((val, ind) => {
      if (ind === count) {
        val.deadline = deadline;
      }
      return val;
    });
  };

  render() {
    let { reminders, filterExpression, filterArr, page, deleted } = this.state;

    if (page === "GARBAGE") {
      return (
        <div className="container">
          <h3>Garbage</h3>
          <Nav changePage={this.changePage} page={page} />

          <Sort
            table={deleted}
            sortTable={this.sortTable} 
            filterExpression={filterExpression}
            handleFilter={this.handleFilter}
          />

          <Table
            page="GARBAGE"
            length={deleted.length}
            filterArr={filterArr}
            removeCharacter={this.removeCharacter}
            updateItems={this.updateItems}
          />
        </div>
      );
    } else if (page === "CREATE") {
      return (
        <div className="container">
          <h3>Reminder</h3>

          <Nav changePage={this.changePage} page={page} />

          <Form formSubmit={this.formSubmit} />
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
              table={reminders}
              sortTable={this.sortTable}
              filterExpression={filterExpression}
              handleFilter={this.handleFilter}
            />

            <button onClick={this.undo}>Undo</button>

            <Table
              page={page}
              filterArr={filterArr}
              removeCharacter={this.removeCharacter}
              updateItems={this.updateItems}
              length={reminders.length}
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
              table={reminders}
              sortTable={this.sortTable}
              filterExpression={filterExpression}
              handleFilter={this.handleFilter}
            />

            <Table
              page={page}
              filterArr={filterArr}
              removeCharacter={this.removeCharacter}
              updateItems={this.updateItems}
              length={reminders.length}
            />
          </div>
        );
      }
    } else {
      // the HOME page
      if (reminders.length > 0 && deleted.length > 0) {
        return (
          <div className="container">
            <h3>Home</h3>

            <Nav changePage={this.changePage} page={page} />

            <Table
              page="REMINDERS"
              length={reminders.length}
              filterArr={this.selectFilter(filterExpression, reminders)}
              removeCharacter={this.removeCharacter}
              updateItems={this.updateItems}
            />

            <Table
              page="HOME"
              length={deleted.length}
              filterArr={this.selectFilter(filterExpression, deleted)}
              removeCharacter={this.removeCharacter}
              updateItems={this.updateItems}
            />
            <button
              name="REMINDERS"
              value={{ arr: "reminders" }}
              onClick={this.changePage}
            >
              Reminder items
            </button>
            <button
              name="GARBAGE"
              value={{ arr: "deleted", page: "page" }}
              onClick={this.changePage}
            >
              Garbage items
            </button>
          </div>
        );
      } else if (reminders.length > 0) {
        return (
          <div className="container">
            <h3>Home</h3>

            <Nav changePage={this.changePage} page={page} />

            <Table
              page="REMINDERS"
              length={reminders.length}
              filterArr={this.selectFilter(filterExpression, reminders)}
              removeCharacter={this.removeCharacter}
              updateItems={this.updateItems}
            />

            <button
              name="REMINDERS"
              value={{ arr: "reminders" }}
              onClick={this.changePage}
            >
              Reminder items
            </button>
          </div>
        );
      } else if (deleted.length > 0) {
        return (
          <div className="container">
            <h3>Home</h3>

            <Nav changePage={this.changePage} page={page} />

            <Table
              page="HOME"
              length={deleted.length}
              filterArr={this.selectFilter(filterExpression, deleted)}
              removeCharacter={this.removeCharacter}
              updateItems={this.updateItems}
            />

            <button
              name="GARBAGE"
              value={{ arr: "deleted", page: "page" }}
              onClick={this.changePage}
            >
              Garbage items
            </button>
          </div>
        );
      } else {
        return (
          <div className="container">
            <h3>Home</h3>

            <Nav changePage={this.changePage} page={page} />
          </div>
        );
      }
    }
  }
}

export default App;
