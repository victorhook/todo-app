import './css/List.css';

import { useState, useEffect } from 'react';

import { List } from './List';

const STATES = [
    'not started',
    'started',
    'finished'
]


export const ListContainer = ( { changeTaskState, listId } ) => {

    const [hovered, setHovered] = useState(-1);
    const [clicked, setClicked] = useState(-1);

    const [notStarted, setNotStarted] = useState([
        {taskId: 2, title: "hey dude", description: "some stuff", listId: listId},
        {taskId: 3, title: "hey dud123e", description: "some stuff", listId: listId},
        {taskId: 4, title: "hey d3213ude", description: "some stuff", listId: listId},
        {taskId: 5, title: "hey d3123ude", description: "some stuff", listId: listId},
        {taskId: 6, title: "hey duadsadde", description: "some stuff", listId: listId}
    ]);
    const [started, setStarted] = useState([
        {taskId: 7, title: "hey d123123ude", description: "some stuff", listId: listId},
        {taskId: 8, title: "hey dasddude", description: "some stuff", listId: listId},
    ]);
    const [finished, setFinished] = useState([
        {taskId: 9, title: "hey asdasddude", description: "some stuff", listId: listId}
    ]);
    
    const onListMouseEnter = list => {
        setHovered(list);
    }

    const onListMouseClick = list => {
        setClicked(list);
    }

    const onDragEnd = task => {
        //changeTaskState(taskId, STATES[hovered])

        if (clicked == hovered)
            return;

        switch (clicked) {
            case 0:
                setNotStarted(notStarted.filter(t => t.taskId != task.taskId));
                break;
            case 1:
                setStarted(started.filter(t => t.taskId != task.taskId));
                break;
            case 2:
                setFinished(finished.filter(t => t.taskId != task.taskId));
                break;
        }

        switch (hovered) {
            case 0:
                setNotStarted([...notStarted, task]);
                break;
            case 1:
                setStarted([...started, task]);
                break;
            case 2:
                setFinished([...finished, task]);
                break;
        }
    }

    return (
        <div className="row list-container">
            <List id={0} listId={listId} onDragEnd={onDragEnd} onMouseEnter={onListMouseEnter} 
                  onListMouseClick={onListMouseClick} title="not started" tasks={notStarted}      
            />
            <List id={1} listId={listId} onDragEnd={onDragEnd} onMouseEnter={onListMouseEnter} 
                  onListMouseClick={onListMouseClick} title="started" tasks={started}      
            />
            <List id={2} listId={listId} onDragEnd={onDragEnd} onMouseEnter={onListMouseEnter} 
                  onListMouseClick={onListMouseClick} title="finished" tasks={finished}      
            />


            <div class="modal" id="task-modal">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <p>ASD</p>
                    </div>
                </div>
            </div>

            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#task-modal">
                Launch demo modal
            </button>

        </div>
    )
}

export default ListContainer
