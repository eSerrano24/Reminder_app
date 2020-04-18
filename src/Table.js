import React from "react";
import EdiText from "react-editext";

let count = 0;
const Table = (props) => {
  const {
    filterArr,
    reminders,
    deleted,
    removeCharacter,
    updateReminders,
    page,
    selectFilter,
    filterExpression,
    undo,
  } = props;
  if (page === "HOME") {
    if (deleted.length === 0) {
      return (
        <div>
          <label>
            Reminder Wall &nbsp;&nbsp;&nbsp; Items: {reminders.length}
          </label>
          <table style={{ color: "blue", width: "auto" }}>
            <TableHeader recover="reminders" />
            <TableBody
              removeCharacter={removeCharacter}
              updateReminders={updateReminders}
              filterArr={selectFilter(filterExpression, reminders)}
              recover="reminders"
            />
          </table>
          <label>Garbage Wall &nbsp;&nbsp;&nbsp; Items: {deleted.length}</label>

          <table style={{ color: "blue", width: "auto" }}>
            <TableHeader recover="GARBAGE" />
            <TableBody
              filterArr={selectFilter(filterExpression, deleted)}
              removeCharacter={removeCharacter}
              updateReminders={updateReminders}
              recover="GARBAGE"
            />
          </table>
        </div>
      );
    } else { // there is a deleted population

      return (
        <div>
          <label>
            Reminder Wall &nbsp;&nbsp;&nbsp; Items: {reminders.length}
          </label>
          <button onClick={undo}>Undo</button>
          <table style={{ color: "blue", width: "auto" }}>
            <TableHeader recover="reminders" />
            <TableBody
              removeCharacter={removeCharacter}
              updateReminders={updateReminders}
              filterArr={selectFilter(filterExpression, reminders)}
              recover="reminders"
            />
          </table>
          <label>Garbage Wall &nbsp;&nbsp;&nbsp; Items: {deleted.length}</label>

          <table style={{ color: "blue", width: "auto" }}>
            <TableHeader recover="GARBAGE" />
            <TableBody
              filterArr={selectFilter(filterExpression, deleted)}
              removeCharacter={removeCharacter}
              updateReminders={updateReminders}
              recover="GARBAGE"
            />
          </table>
        </div>
      );
    } // almost end of home
  } else {
    return (
      <table id="myTable" style={{ color: "blue", width: "auto" }}>
        <TableHeader recover= {page}/>
        <TableBody
          filterArr={filterArr}
          removeCharacter={removeCharacter}
          updateReminders={updateReminders}
          recover={page}
        />
      </table>
    );
  }
};

let TableHeader = (props) => {
  if (props.recover === "GARBAGE") {
    return (
      <thead>
        <tr>
          <th>Recover</th>
          <th style={{ textAlign: "center" }}>Type</th>
          <th style={{ textAlign: "center" }}>Description</th>
          <th style={{ textAlign: "center" }}>Published</th>
          <th style={{ textAlign: "center" }}>Deadline</th>
          <th style={{ textAlign: "center" }}></th>
        </tr>
      </thead>
    );
  } else {
    return (
      <thead>
        <tr>
          <th style={{ textAlign: "center" }}>Type</th>
          <th style={{ textAlign: "center" }}>Description</th>
          <th style={{ textAlign: "center" }}>Published</th>
          <th style={{ textAlign: "center" }}>Deadline</th>
          <th style={{ textAlign: "center" }}></th>
        </tr>
      </thead>
    );
  }
};

let TableBody = (props) => {
  const rows = props.filterArr.map((row, index) => {
    const handleSave = (val, iP) => {
      props.updateReminders(val, iP.count);
      // alert("Row: "+iP.count); // -- this alert tells us the row we chose
    };
    if (props.recover === "GARBAGE") {
      return (
        <tr key={index}>
          <td>
            <button
              type="submit"
              onClick={()=>{props.removeCharacter(props.filterArr[index], "recover")}}
            >?</button>
          </td>
          <td style={{ textAlign: "center" }}>{row.type}</td>
          <td style={{ textAlign: "center" }}>{row.description}</td>
          <td style={{ textAlign: "center" }}>
            {new Date(row.created).getUTCFullYear() +
              "-" +
              (new Date(row.created).getUTCMonth() > 9
                ? new Date(row.created).getUTCMonth()
                : "0" + new Date(row.created).getUTCMonth()) +
              "-" +
              new Date(row.created).getUTCDate()}
          </td>
          <td>
            <EdiText //
              type="date"
              value={
                props.filterArr[count].deadline === null
                  ? ""
                  : props.filterArr[count].deadline
              } // bind this with the array (because rows move around)
              onSave={handleSave}
              inputProps={{
                count: count++,
              }}
            />
          </td>
          <td>
            <button
              onClick={() =>
                props.removeCharacter(props.filterArr[index], "delete")
              }
            >
              Delete
            </button>
          </td>
        </tr>
      );
    } else {

      return (
        <tr key={index}>
          <td style={{ textAlign: "center" }}>{row.type}</td>
          <td style={{ textAlign: "center" }}>{row.description}</td>
          <td style={{ textAlign: "center" }}>
            {new Date(row.created).getUTCFullYear() +
              "-" +
              (new Date(row.created).getUTCMonth() > 9
                ? new Date(row.created).getUTCMonth()
                : "0" + new Date(row.created).getUTCMonth()) +
              "-" +
              new Date(row.created).getUTCDate()}
          </td>
          <td>
            <EdiText //
              type="date"
              value={
                props.filterArr[count].deadline === null
                  ? ""
                  : props.filterArr[count].deadline
              } // bind this with the array (because rows move around)
              onSave={handleSave}
              inputProps={{
                count: count++,
              }}
            />
          </td>
          <td>
            <button
              onClick={() =>
                props.removeCharacter(props.filterArr[index], "delete")
              }
            >
              Delete
            </button>
          </td>
        </tr>
      );
    }
  }); // up until here the code was .map-ping the rows of the table
  count = 0; // must reset this back to give the tr the right count value
  console.log("new table");
  return <tbody>{rows}</tbody>;
};

export default Table;
