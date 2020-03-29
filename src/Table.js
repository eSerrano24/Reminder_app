import React from "react";
import EdiText from 'react-editext';

let count = 0;
const Table = props => {
  const { characterData, removeCharacter } = props;

  return (
    <table id = "myTable" style={{color: "blue", width: "auto"}}>
      <TableHeader  />
      <TableBody 
        characterData={characterData}
        removeCharacter={removeCharacter}
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
    alert(iP.count); // -- it works
    // have to set the latest child's value, the children of the >>trs<<,
    // then got re arrange the child by a temp variable maybe 
    // but before that got to give the tr a value
  }  
  // tr expire ...
    return (
    <tr key={index} name="expire" id={'expire_'+count}>
        <td style={{textAlign: "center"}}>{row.type}</td>
        <td style={{textAlign: "center"}}>{row.description}</td>
        <td style={{textAlign: "center"}}>{new Date().toLocaleDateString('default', {month: 'long'})+' '+new Date().getDate()+', '+ new Date().getFullYear()}</td>
        <td id={"td_"+count}>
          <EdiText
            type="date"
            value= ''
            onSave={handleSave}
            inputProps={{
              count: count++
            }}
          />
        </td>
        <td>
          <button onClick={() => props.removeCharacter(index)}>Delete</button>
        </td>
      </tr>   
    );
  });
  count = 0; // must reset this back to give the tr the right count value
  return <tbody>{rows}</tbody>;
};

export default Table;
