import React, {useState} from "react";
import EdiText from 'react-editext';

const Table = props => {
  const { characterData, removeCharacter } = props;
  const [value, setValue] = useState("");

  return (
    <table style={{color: "blue", width: "auto"}}>
      <TableHeader  />
      <TableBody 
        characterData={characterData}
        removeCharacter={removeCharacter}
        value = {value}
        setValue = {setValue}
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
  
  
  const handleSave = val => { 
    props.setValue(val);
  }  

    return (
      <tr key={index}>
        <td style={{textAlign: "center"}}>{row.type}</td>
        <td style={{textAlign: "center"}}>{row.description}</td>
        <td style={{textAlign: "center"}}>{new Date().toLocaleDateString('default', {month: 'long'})+' '+new Date().getDate()+', '+ new Date().getFullYear()}</td>
        <td><EdiText type="date"
          hint="All dates are allowed between 2000 and 2049"
          value={props.value}
          onSave={handleSave}/> </td>
        <td>
          <button onClick={() => props.removeCharacter(index)}>Delete</button>
        </td>
      </tr>
    );
  });

  return <tbody>{rows}</tbody>;
};

export default Table;
