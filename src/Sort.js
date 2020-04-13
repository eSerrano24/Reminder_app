import React from 'react';
import Filter from './Filter';

const Sort = props => {

    if (props.length > 0)  {
        return (
            <div>
                <label>Sort by</label>
                <button name='alphabetized' value='reminders' onClick={props.sortTable}>Type</button>
                <button name='published' value='reminders' onClick={props.sortTable}>Published</button>
                <button name='deadline' value='reminders' onClick={props.sortTable}>Deadline</button>
                <Filter 
                    filterExpression={props.filterExpression} 
                    handleFilter={props.handleFilter}
                />
                <button onClick={props.undo}>Undo</button>
            </div>
        );
    } else {
        return(
        <div>
            <label>Sort by</label>
            <button name='alphabetized' value='reminders' onClick={props.sortTable}>Type</button>
            <button name='published' value='reminders' onClick={props.sortTable}>Published</button>
            <button name='deadline' value='reminders' onClick={props.sortTable}>Deadline</button>    
            <Filter 
                filterExpression={props.filterExpression} 
                handleFilter={props.handleFilter}
            />
        </div>
        )
    }
}

export default Sort;