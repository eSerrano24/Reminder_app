import React from "react";
import EdiText from 'react-editext';

let count = 0;
const Table = props => {
  
  const { original, filter, removeCharacter, td_array, td_value, changeTd } = props;

  return (
    <table id = "myTable" style={{color: "blue", width: "auto"}}>
      <TableHeader/>
      <TableBody 
        original = {original}
        filter={filter}
        removeCharacter={removeCharacter}
        td_array = {td_array}
        td_value = {td_value}
        changeTd = {changeTd}
      />
    </table>
  );
};

let TableHeader = () => {
  return (
    <thead>
      <tr>
        <th style={{textAlign: "center"}}>Type</th>
        <th style={{textAlign: "center"}}>Description</th>
        <th style={{textAlign: "center"}}>Published</th>
        <th style={{textAlign: "center"}}>Deadline</th>
        <th style={{textAlign: "center"}}></th>
      </tr>
    </thead>
  );
};

let TableBody = props => {

  const rows = props.filter.map((row, index) => {
  
  const handleSave = (val, iP) => {
    props.td_array[iP.count] = val; // we don't need to use setState?
    props.changeTd(val, iP.count); // this is to share the handleSave val data with the td value below
    // will td.value be necessary with by adding this value to the form state?

    alert("Row: "+iP.count); // -- this alert tells us the row we chose
  }  
    return (
    <tr key={index}>
        <td style={{textAlign: "center"}}>{row.type}</td>
        <td style={{textAlign: "center"}}>{row.description}</td>
        <td style={{textAlign: "center"}}>{new Date().toLocaleDateString('default', {month: 'long'})+' '+new Date().getDate()+', '+ new Date().getFullYear()}</td>
        <td value = {props.td_value}>
          <EdiText
            type="date"
            value={props.td_array[index]} // bind this with the array (because rows move around)
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
  console.log('new table');
  return <tbody>{rows}</tbody>;
};

export default Table;
