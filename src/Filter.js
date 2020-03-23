import React, { Component } from "react";

const Filter = props => {

    const {filterData} =props;
    return (
        <form>
    <label for="filter">Filter</label>
    <input
      type="text"
      name="filter"
      id="filter"
      value={filterData}
      onChange={props.handleFilter({filterData})}
    />
    </form>
    )
}

export default Filter;