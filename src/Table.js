import React from "react";
import EdiText from "react-editext";

let count = 0;
const Table = (props) => {
  const { filterArr, removeCharacter, updateItems, page, length } = props;
  const table = page === "REMINDERS" ? "Reminder table" : "Garbage table";
  if (length > 0) {
    return (
      <div>
        <label>
          {table} contains {length} items
        </label>
        <table id="myTable" style={{ color: "blue", width: "auto" }}>
          <TableHeader />
          <TableBody
            filterArr={filterArr}
            removeCharacter={removeCharacter}
            updateItems={updateItems}
            recover={page}
            length={length}
          />
        </table>
      </div>
    );
  } else {
    return null;
  }
};

let TableHeader = () => {
  return (
    <thead>
      <tr>
        <th style={{ textAlign: "center" }}>Type</th>
        <th style={{ textAlign: "center" }}>Organization</th>
        <th style={{ textAlign: "center" }}>Deadline</th>
        <th style={{ textAlign: "center" }}></th>
      </tr>
    </thead>
  );
};

let TableBody = (props) => {
  const rows = props.filterArr.map((row, index) => {
    const handleSave = (val, iP) => {
      props.updateItems(val, iP.count);
      // alert("Row: "+iP.count); // -- this alert tells us the row we chose
    };
    if (props.recover === "HOME") {
      return (
        <tr key={index}>
          <td style={{ textAlign: "center" }}>{row.value}</td>
          <td style={{ textAlign: "center" }}>{row.description}</td>
          <td>
            <EdiText //
              type="date"
              value={props.filterArr[count].deadline} // bind this with the array (because rows move around)
              onSave={handleSave}
              inputProps={{
                count: count++,
              }}
            />
          </td>
          <td>
            <button
              type="submit"
              onClick={() => {
                props.removeCharacter(props.filterArr[index], "recover");
              }}
            >
              Restore
            </button>
          </td>
        </tr>
      );
    } else if (props.recover === "GARBAGE") {
      return (
        <tr key={index}>
          <td style={{ textAlign: "center" }}>{row.value}</td>
          <td style={{ textAlign: "center" }}>{row.description}</td>
          <td>
            <EdiText //
              type="date"
              value={props.filterArr[count].deadline}
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
          <td></td>
        </tr>
      );
    } else {
      // for reminders
      return (
        <tr key={index}>
          <td style={{ textAlign: "center" }}>{row.value}</td>
          <td style={{ textAlign: "center" }}>{row.description}</td>
          <td>
            <EdiText //
              type="date"
              value={props.filterArr[count].deadline}
              onSave={handleSave}
              inputProps={{
                count: count++,
              }}
              submitOnUnfocus={true}
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
