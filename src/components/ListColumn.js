import './css/List.css';

import { useState, useEffect } from 'react';

import { Task } from './Task';

export const ListColumn = ({ title, tasks, deleteTask, editTask, onHover, onTaskDragEnd }) => {

    const [dragHover, setDragHover] = useState(false);

    const onDragEnter = () => {
        if (!dragHover) {
            setDragHover(true);
            onHover(title);
        }
    }

    const baseClass = 'offset-1 col-10 col-lg-4 offset-lg-0 list-col';

    return (
        <div className={dragHover ? baseClass + ' column-drag' : baseClass}
             onDragEnter={onDragEnter}
             onDragLeave={() => setDragHover(false)}
             onDragOver={() => setDragHover(true)}
        >
            
            <h3 className="list-title">
                { title }
            </h3>

            <div className="task-list row">
                {
                tasks.map(task => 
                            <Task task={task}
                                  deleteTask={deleteTask}
                                  editTask={editTask}
                                  onDragEnter={onDragEnter}
                                  onTaskDragEnd={onTaskDragEnd}
                            />)
                }
            </div>
        </div>
    )
}

export default ListColumn
