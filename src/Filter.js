import React from "react";

const Filter = props => {

    const {filterData} = props;

    return (
      <div>
        <label>Filter</label>
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