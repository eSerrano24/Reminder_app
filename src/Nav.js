import React from "react";

const Nav = (props) => {
  // style out the color of the tabs if we are on that section
  return (
    <div>
      <button
        name="HOME"
        value={{ arr: "reminders" }}
        onClick={props.changePage}
      >
        Home
      </button>
      <button
        name="CREATE"
        value={{ arr: "reminders" }}
        onClick={props.changePage}
      >
        New
      </button>
  
    </div>
  );
};

export default Nav;
