import React, {useState} from "react";
import EdiText from 'react-editext';

let count = 0;
const Table = props => {
  const { characterData, removeCharacter } = props;
  const [value, setValue] = useState(0);

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
  
  const handleSave = (val) => {
    alert(val);
    // have to set the latest child's value, the children of the >>tds<<,
    // then got re arrange the child by a temp variable maybe 
    props.setValue(props.value+1)

  }  
  // td expire ...
    return (
      <tr key={index} name="expire">
        <td style={{textAlign: "center"}}>{row.type}</td>
        <td style={{textAlign: "center"}}>{row.description}</td>
        <td style={{textAlign: "center"}}>{new Date().toLocaleDateString('default', {month: 'long'})+' '+new Date().getDate()+', '+ new Date().getFullYear()}</td>
        <td >
          <EdiText
            type="date"
            value= 'YYYY-MM-DD'
            onSave={handleSave}
          />
     
        </td>
        <td>
          <button onClick={() => props.removeCharacter(index)}>Delete</button>
        </td>
      </tr>
    );
  });

  return <tbody>{rows}</tbody>;
};

export default Table;
