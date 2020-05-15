import React from "react";
import "react-dropdown/style.css";

const Sort = (props) => {
  if (props.table.length > 1) {
    return (
      <div>
        <label>Sort</label>
        <button name="published" onClick={props.sortTable}>
          By date created
        </button>
        <button name="deadline" onClick={props.sortTable}>
          By nearest deadline
        </button>
      </div>
    );
  } else {
    return null;
  }
};

export default Sort;
/*
       <button name="alphabetized" onClick={props.sortTable}>
        By alphebetical order
      </button>
 import Filter from "./Filter";
import Dropdown from 'react-dropdown';

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

    const changeFilter = (event) => {
    choice = event.value;
    props.handleFilter({target: event});
  }
 
    // can use an if statement to add a show all button
    // dropdown.unshift({value: "", label: "Choose an option"});
       <Filter
        filterExpression={props.filterExpression}
        handleFilter={props.handleFilter}
        dropdown={dropdown}
      />
    <Dropdown search options={dropdown} value={choice} onChange={changeFilter} placeholder='All possible options'/>
  */
