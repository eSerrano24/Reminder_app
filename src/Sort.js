import React from "react";
import Filter from "./Filter";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css'

const Sort = (props) => {
  const filter = [];
  let choice = '';
  let dropdown = props.table.filter((val, ind) => {
    let found = false;
    filter.forEach((value) => {
      if (value === val.value) {
        found = true;
      }
    });
    if (found === false) {
      filter.push(val.value);  
    }
    return found===false; 
  });
 
  // can use an if statement to add a show all button
  // dropdown.unshift({value: "", label: "Choose an option"});

  const changeFilter = (event) => {
    choice = event.value;
    props.handleFilter({target: event});
  }

  return (
    <div>
      <label>Sort and Filter</label>
      <button name="alphabetized" onClick={props.sortTable}>
        A-z
      </button>
      <button name="published" onClick={props.sortTable}>
        Published
      </button>
      <button name="deadline" onClick={props.sortTable}>
        Deadline
      </button>
      <Filter
        filterExpression={props.filterExpression}
        handleFilter={props.handleFilter}
      />
    <Dropdown options={dropdown} value={choice} onChange={changeFilter} placeholder='Select an option'/>
    </div>
  );
};

export default Sort;
