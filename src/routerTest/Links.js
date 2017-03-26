import React from 'react';
import { Link } from 'react-router-dom';

const Links = () => (
    <header>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/about/name">About - Name</Link></li>
            <li><Link to="/about/redirect1">About - RedirectTo: Portfolio #1</Link></li>
            <li><Link to="/portfolio/">Portfolio - All</Link></li>
            <li><Link to="/portfolio/0">Portfoilo - #0</Link></li>
            <li><Link to="/portfolio/1">Portfoilo - #1</Link></li>
        </ul>
    </header>
);

export default Links;
