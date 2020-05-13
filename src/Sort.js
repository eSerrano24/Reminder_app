import React from "react";
import Filter from "./Filter";
// import {Dropdown} from 'semantic-ui-react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css'

const Sort = (props) => {
  const filter = [];
  let choice = '';
  let dropdown = props.table.filter((val, ind) => {
    let found = false;
    filter.forEach((value) => {
      if (value.name === val.value) {
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
        By alphebetical order
      </button>
      <button name="published" onClick={props.sortTable}>
        By date published
      </button>
      <button name="deadline" onClick={props.sortTable}>
        By nearest deadline
      </button>
      <Filter
        filterExpression={props.filterExpression}
        handleFilter={props.handleFilter}
        dropdown={dropdown}
      />
    <Dropdown search options={dropdown} value={choice} onChange={changeFilter} placeholder='All possible options'/>
    </div>
  );
};

export default Sort;
