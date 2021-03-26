import './css/List.css';

import { useState } from 'react';

import { Task } from './Task';

export const List = ({ title, id, listId, tasks, onDragEnd, onMouseEnter, onListMouseClick }) => {

    const changeStateEvent = (event, state) => {
        //console.log(event.target.dataset.taskid, state, title)
    }

    const dragEnd = (taskId, id) => {
        //console.log(taskId, id)
        onDragEnd(taskId);
    }


    return (
        <div className="col-4 list-col"
                id={`list-col-${id}`}
                onDragEnter={() => onMouseEnter(id)}
                onMouseDown={() => onListMouseClick(id)}
            >
            <h3 class="list-title">{ title }</h3>

            <div class="task-list">
                {tasks.map(task => <Task 
                            onDragEnd={taskId => dragEnd(taskId, id)}
                            taskId={task.taskId}
                            title={task.title}
                            description={task.description}
                            listId={listId}
                            />)}
            </div>
        </div>
    )
}

export default List
