import { useEffect } from 'react';

import { List } from 'react-bootstrap-icons';

export const Navbar = () => {

    const onResize = () => {
        const navbar = document.getElementById('navbar');
        const list = document.getElementById('nav-list');
        const title = document.getElementById('sidebar-title');
        if (window.outerWidth < 992) {
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


    return (
        <nav class="navbar navbar-expand-lg fixed-top navbar-dark" id="navbar">
            
            <button class="navbar-toggler" data-toggle="collapse" data-target="#navbar-content"><List /></button>

            <div class="collapse navbar-collapse" id="navbar-content">
                <div class="navbar-nav" id="nav-list">
                    <h3 id="sidebar-title">Lists</h3>
                    <a class="navbar-link" href="#">LINK1</a>
                    <a class="navbar-link" href="#">LINK1</a>
                    <a class="navbar-link" href="#">LINK1</a>
                    <a class="navbar-link" href="#">LINK1</a>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
