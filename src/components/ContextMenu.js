import './css/ContextMenu.css';

import { useState, useEffect } from 'react';


export const ContextMenu = ({ params }) => {

    const [pos, setPos] = useState({x: 0, y: 0});
    const [visibility, setVisibility] = useState('hidden');

    useEffect(() => {
        document.oncontextmenu = e => {
            setPos({
                x: e.clientX-300, 
                y: e.clientY-80
            })
            setVisibility('visible');
            e.preventDefault();
        }
    
        document.addEventListener('click', () => {
            setVisibility('hidden');
        });

    }, [])

    return (
        // For some reason, changing the style with visibility state did NOT
        // work, so using classes instead.
        <div className={`context-menu ${visibility}`}
            style={{
                top: `${pos.y}px`, 
                left: `${pos.x}px`,
            }}>

            <ul className="context-list">
            {
                params.map(param => 
                    <li className="context-item"
                        onClick={param.callback}>
                        <span>{param.label}</span>
                    </li>
                )
            }
            </ul>
        </div>
    )
}

export default ContextMenu
