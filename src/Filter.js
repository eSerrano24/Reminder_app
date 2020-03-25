import React from "react";

const Filter = props => {

    const {filterData} = props;
    return (
      <form>
        <label>Filter</label>
        <input
          type="text"
          name="filter"
          id="filter"
          value={filterData}
          onChange={props.handleFilter}
        />
      </form>
    )
}

export default Filter;