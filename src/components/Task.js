import React from 'react'

import { useEffect } from 'react';

export const Task = ( { onDragEnd, taskId, title, description, listId: listId} ) => {

    const currTask = {
        taskId: taskId,
        title: title,
        description: description,
        listId: listId,
    };

    const onChange = e => {
        console.log(e)
    }
    
    return (
        <div class="task" draggable onDragEnd={() => onDragEnd(currTask)} id={`task-${taskId}`}>
            <h3 class="task-title">{title}</h3>
            <span>List: {listId} - Task: {taskId}</span>
            <p class="task-description">{description}</p>
        </div>
    )
}

export default Task
