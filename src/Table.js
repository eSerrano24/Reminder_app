import React from "react";

const Table = props => {
  const { characterData, removeCharacter } = props;

  return (
    <table>
      <TableHeader />
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
        <th>Type</th>
        <th>Description</th>
         
        <th></th>
        <th></th>
      </tr>
    </thead>
  );
};

let TableBody = props => {
  const rows = props.characterData.map((row, index) => {
    return (
      <tr key={index}>
        <td>{row.type}</td>
        <td>{row.description}</td>
        <td>{new Date().toLocaleDateString('default', {month: 'long'})+'/'+new Date().getDate()+'/'+ new Date().getFullYear()}</td>
        <td>
          <button onClick={() => props.removeCharacter(index)}>Delete</button>
        </td>
      </tr>
    );
  });

  return <tbody>{rows}</tbody>;
};

export default Table;
