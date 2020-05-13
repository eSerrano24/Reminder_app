import React from "react";

const Filter = props => {

    // to concat the input
    const {filterExpression} = props;
    let styles = {};

    return (
        <input
          type="search"
          name="filter"
          id="filter"
          value={filterExpression}
          onChange={props.handleFilter}
          style = {styles}
          placeholder = 'Search'
          autocomplete="off"
          list={props.dropdown}
        />
    )
}

export default Filter;