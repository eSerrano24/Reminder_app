import React from "react";

const Filter = props => {

    // to concat the input
    const {filterData} = props;

    return (
      <div>
        <label>Filter by type</label>
        <input
          type="text"
          name="filter"
          id="filter"
          value={filterData}
          onChange={props.handleFilter}
        />
      </div>
    )
}

export default Filter;