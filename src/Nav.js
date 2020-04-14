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
        Create Items
      </button>
      <button
        name="SORT"
        value={{ arr: "reminders" }}
        onClick={props.changePage}
      >
        Sort Items
      </button>
      <button
        name="REMINDERS"
        value={{ arr: "reminders" }}
        onClick={props.changePage}
      >
        Reminder Wall
      </button>
      <button
        name="GARBAGE"
        value={{ arr: "deleted", page: "page" }}
        onClick={props.changePage}
      >
        Garbage
      </button>
      <button>Settings</button>
    </div>
  );
};

export default Nav;
