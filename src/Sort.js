import React, { useState } from "react";
import Filter from "./Filter";
import MultiSelect from "react-multi-select-component";

const Sort = (props) => {
  const [selected, setSelected] = useState([]);
  const filter = [];
  let found;
  let dropdown = props.table.map((val, ind) => {
    found = false;
    filter.forEach((type) => {
      console.log("in");
      if (type === val.type) {
        console.log("HEY");
        found = true;
      }
    });
    if (found === false) {
      filter.push(val.type);
      return { label: val.type, value: val.type };
    } else {
      return "";
    }
  });
  dropdown = dropdown.filter((val) => {
    return val !== "";
  });
  console.log("dropdown: ");
  console.log(dropdown);
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
      <MultiSelect
        options={dropdown}
        value={selected}
        onChange={setSelected}
        labelledBy={"Select"}
        hasSelectAll={false}
      />
    </div>
  );
};

export default Sort;
