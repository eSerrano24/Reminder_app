import React from 'react';

const Order = props => {

    return (
        <div>
            <button>Sort by Published</button>
            <button onClick={props.sortTable}>Sort by Deadline</button>
        </div>
    );
}

export default Order;