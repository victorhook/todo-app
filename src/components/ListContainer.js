import './css/List.css';

import { useState, useEffect } from 'react';

import { ListColumn } from './ListColumn';
import { AddButton } from './AddButton';
import { Api } from '../Api';

const STATES = [
    'not started',
    'started',
    'finished'
];

const NEW_TASK_ID = -1;


export const ListContainer = ( { list, tasks, addTask, deleteTask, editTask, editList } ) => {

    const [hoveredColumn, setHoveredColumn] = useState(null);

    const onHover = column => {
        setHoveredColumn(column);
    }

    const onTaskDragEnd = task => {
        if (task.state != hoveredColumn) {
            let taskWithNewState = Object.assign({}, task);
            taskWithNewState.state = hoveredColumn;
            editTask(taskWithNewState);
        }
    }

    const onEdit = newName => {
        if (newName != list.name) {
            let editedList = Object.assign({}, list);
            editedList.name = newName;
            editList(editedList);
        }
    }


    return (
        <div className="content-container" key={list}>

            <h3 className="list-super-title editable"
                contentEditable="true"
                onBlur={e => onEdit(e.target.innerHTML)}
                spellCheck="false"
            >
                {list.name}
            </h3>

            <AddButton onClick={() => addTask(list)}
                       tooltip={"Add new task"}
            />

            <div className="row list-container">

                <ListColumn title={"not started"}
                            tasks={tasks.filter(task => task.state == Api.STATES.NOT_STARTED)}
                            deleteTask={deleteTask}
                            editTask={editTask}
                            onHover={onHover}
                            onTaskDragEnd={onTaskDragEnd}
                            />

                <ListColumn title={"started"}
                            tasks={tasks.filter(task => task.state == Api.STATES.STARTED)}
                            deleteTask={deleteTask}
                            editTask={editTask}
                            onHover={onHover}
                            onTaskDragEnd={onTaskDragEnd}
                            />

                <ListColumn title={"finished"}
                            tasks={tasks.filter(task => task.state == Api.STATES.FINISHED)}
                            deleteTask={deleteTask}
                            editTask={editTask}
                            onHover={onHover}
                            onTaskDragEnd={onTaskDragEnd}
                            />

            </div>

        </div>
    )
}

export default ListContainer
