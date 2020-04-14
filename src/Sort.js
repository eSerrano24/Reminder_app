import React from "react";
import Filter from "./Filter";

const Sort = (props) => {
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
    </div>
  );
};

export default Sort;
