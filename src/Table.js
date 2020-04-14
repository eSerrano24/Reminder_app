import React from "react";
import EdiText from "react-editext";

let count = 0;
const Table = (props) => {
  const {
    original,
    deleted,
    filterArr,
    removeCharacter,
    updateReminders,
  } = props;

  return (
    <table id="myTable" style={{ color: "blue", width: "auto" }}>
      <TableHeader />
      <TableBody
        original={original}
        filterArr={filterArr}
        removeCharacter={removeCharacter}
        deleted={deleted}
        updateReminders={updateReminders}
      />
    </table>
  );
};

let TableHeader = () => {
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
};

let TableBody = (props) => {
  const rows = props.filterArr.map((row, index) => {
    const handleSave = (val, iP) => {
      props.updateReminders(val, iP.count);
      // alert("Row: "+iP.count); // -- this alert tells us the row we chose
    };
    return (
      <tr key={index}>
        <td style={{ textAlign: "center" }}>{row.type}</td>
        <td style={{ textAlign: "center" }}>{row.description}</td>
        <td style={{ textAlign: "center" }}>{new Date(row.created).getUTCFullYear() +"-"+ ((new Date(row.created).getUTCMonth()>9) ? new Date(row.created).getUTCMonth() : '0'+new Date(row.created).getUTCMonth()) +"-"+ new Date(row.created).getUTCDate() }
        </td>
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
          <button onClick={() => props.removeCharacter(index)}>Delete</button>
        </td>
      </tr>
    );
  }); // up until here the code was .map-ping the rows of the table
  count = 0; // must reset this back to give the tr the right count value
  console.log("new table");
  return <tbody>{rows}</tbody>;
};

export default Table;
