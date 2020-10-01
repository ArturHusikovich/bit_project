import React from 'react';

const Task = (props) => {
    return (
        <div>
            {props.num + 1}. {props.text}
        </div>
    )
}

export default Task;