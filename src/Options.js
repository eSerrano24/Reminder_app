import React from 'react';

const Options = props => {

    return (
        <div>
            <button name='alphabetized' value='reminders' onClick={props.sortTable}>Sort by Type (a-z)</button>
            <button name='published' value='reminders' onClick={props.sortTable}>Sort by Published</button>
            <button name='deadline' value='reminders' onClick={props.sortTable}>Sort by Deadline</button>
            <button name='deleted' value='deleted' onClick={props.sortTable}>Show Deleted</button>
        </div>
    );
}

export default Options;