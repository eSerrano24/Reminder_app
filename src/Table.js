import React from "react";
import EdiText from 'react-editext';

let count = 0;
const Table = props => {
  const { characterData, removeCharacter, td_array, td_value, changeTd } = props;

  return (
    <table id = "myTable" style={{color: "blue", width: "auto"}}>
      <TableHeader  />
      <TableBody 
        characterData={characterData}
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
  const rows = props.characterData.map((row, index) => {
  
  const handleSave = (val, iP) => {
    const name = 'td_'+iP.count;
    props.td_array[iP.count] = val;
    props.changeTd(val);
    // const id = 'expire_'+iP.count;
    alert(iP.count); // -- it works
    // alert(id);
  }  
  // tr expire ...
    return (
    <tr key={index} name="expire" id={'expire_'+count} value={""}>
        <td style={{textAlign: "center"}}>{row.type}</td>
        <td style={{textAlign: "center"}}>{row.description}</td>
        <td style={{textAlign: "center"}}>{new Date().toLocaleDateString('default', {month: 'long'})+' '+new Date().getDate()+', '+ new Date().getFullYear()}</td>
        <td name = {"td_"+count} value = {props.td_value}>
          <EdiText
            type="date"
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
  }); // up til here was .mapping the rows of the table
  count = 0; // must reset this back to give the tr the right count value
  return <tbody>{rows}</tbody>;
};

export default Table;
