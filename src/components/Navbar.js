import './css/Navbar.css';

import { useEffect } from 'react';
import { List } from 'react-bootstrap-icons';

import { AddButton } from './AddButton';
import { DeleteButton } from './DeleteButton';


const LG_SIZE_PIXELS = 1200;


export const Navbar = ({ lists, activateList, deleteList, addList, editList, toHomePage }) => {

    const onResize = () => {
        const navbar = document.getElementById('navbar');
        const list = document.getElementById('nav-list');
        const title = document.getElementById('sidebar-title');
        if (window.innerWidth < LG_SIZE_PIXELS) {
            navbar.classList.remove('sidebar');
            list.classList.remove('sidebar-list');
            list.classList.add('navbar-nav');
            title.style.visibility = 'hidden';
        } else {
            navbar.classList.add('sidebar');
            list.classList.add('sidebar-list');
            list.classList.remove('navbar-nav');
            title.style.visibility = 'visible';
        }
    };

    useEffect(() => {
        window.addEventListener('resize', onResize);
        onResize();
    }, []);

    const onEditList = (e, list) => {
        let newName = e.target.innerHTML;
        if (newName != list.name)
            editList({
                listId: list.listId,
                name: newName
            });
    }

    return (
        <nav className="navbar navbar-expand-xl fixed-top navbar-dark" id="navbar">

            <button className="navbar-toggler" data-toggle="collapse" data-target="#navbar-content"><List /></button>

            <div className="collapse navbar-collapse" id="navbar-content">
                <div className="navbar-nav" id="nav-list">

                    <div class="sidebar-title-container">
                        <h3 id="sidebar-title">Lists</h3>

                        <AddButton onClick={addList}
                                   tooltip={"Add new list"}
                        />
                    </div>

                    <span className="navbar-link" id="homeLink"
                          onClick={toHomePage}>
                        Back to home
                    </span>

                    {
                    lists.map(list => 
                        <span className="navbar-link" 
                              onClick={() => activateList(list)}>
                            
                            <DeleteButton onClick={() => deleteList(list)} />

                                <span className="nav-link-text editable"
                                        contentEditable="true"
                                        onBlur={e => onEditList(e, list)}>
                                        
                                    { list.name }
                                </span>
                                
                            </span>    
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
