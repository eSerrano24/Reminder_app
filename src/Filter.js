import React from "react";

const Filter = props => {

    // to concat the input
    const {filterExpression} = props;
    let styles = {};
    return (
        <input
          type="text"
          name="filter"
          id="filter"
          value={filterExpression}
          onChange={props.handleFilter}
          style = {styles}
          placeholder = 'Filter by Type'
        />
    )
}

export default Filter;