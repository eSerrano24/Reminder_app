import React from "react";

const Nav = (props) => {
  if (props.page === "HOME") {
    return (
      <div>
        <button
          name="CREATE"
          value={{ arr: "reminders" }}
          onClick={props.changePage}
        >
          New
        </button>
      </div>
    );
  } else {
    return (
      <div>
        <button
          name="HOME"
          value={{ arr: "reminders" }}
          onClick={props.changePage}
        >
          Home
        </button>
      </div>
    );
  }
};

export default Nav;
