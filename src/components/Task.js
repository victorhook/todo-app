import './css/Task.css';

import { useEffect, useState, useRef } from 'react';

import { DeleteButton } from './DeleteButton';
import { StateChangeButton } from './StateChangeButton';
import { Api } from '../Api';


export const Task = ( { task, deleteTask, editTask, onTaskDragEnd } ) => {

    const [arrows, setArrows] = useState({left: false, right: false});

    // Sets which of the arrows should be visible
    useEffect(() => {
        let arrowDirections = {left: false, right: false};
        if (task.state === Api.STATES.NOT_STARTED) {
            arrowDirections.right = true;
        } else if (task.state === Api.STATES.STARTED) {
            arrowDirections.left = true;
            arrowDirections.right = true;
        } else {
            arrowDirections.left = true;
        }
        setArrows(arrowDirections);
    }, []);

    /* We only want to send edit request if there's a difference in the content. */
    const onEdit = changedTask => {
        if (task.title != changedTask.title ||
            task.description != changedTask.description ||
            task.state != changedTask.state) {
                editTask(changedTask);
            }
    }

    return (
        /* -- Main container for the task -- */
        <div className="task"
            draggable
            onDragEnd={() => onTaskDragEnd(task)}
        >

            <DeleteButton onClick={() => deleteTask(task)}
                        tooltip={"Delete task"}
            />

            {/* -- Title -- */ }
            <h3 className='task-title editable'
                contentEditable="true"
                spellCheck="false"
                onBlur={
                    e => {
                        let edited = Object.assign({}, task);
                        edited.title = e.target.innerHTML;
                        onEdit(edited);
                }}
            >
                {task.title}
            </h3>

            {/* -- Description -- */ }
            <p className="task-description editable"
            contentEditable="true"
            spellCheck="false"
            onBlur={
                    e => {
                        let edited = Object.assign({}, task);
                        edited.description = e.target.innerHTML;
                        onEdit(edited);
                    }
            }
            >
                {task.description}
            </p>

            {/* -- Left & right arrows, to change state -- */ }
            <StateChangeButton left={true} 
                            onClick={() => {
                                        let edited = Object.assign({}, task);
                                        edited.state = task.state === Api.STATES.FINISHED 
                                                    ? Api.STATES.STARTED
                                                    : Api.STATES.NOT_STARTED;
                                        onEdit(edited);
                                }}
                                nextState={task.state === Api.STATES.FINISHED 
                                        ? Api.STATES.STARTED
                                        : Api.STATES.NOT_STARTED}
                            visible={arrows.left}/>
            <StateChangeButton left={false}
                            onClick={() => {
                                    let edited = Object.assign({}, task);
                                    edited.state = task.state === Api.STATES.NOT_STARTED 
                                                ? Api.STATES.STARTED
                                                : Api.STATES.FINISHED;
                                    onEdit(edited);
                                }}
                                nextState={task.state === Api.STATES.NOT_STARTED 
                                        ? Api.STATES.STARTED
                                        : Api.STATES.FINISHED}
                            visible={arrows.right}/>

        </div>
    )
}

export default Task
