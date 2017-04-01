import React from 'react';
import { Link } from 'react-router-dom';
import ClassNames from 'classnames';

const filters = ['', 'active', 'completed'];

const Footer = ({
    filterName,
    completedLength,
    activeLength,
    clearCompleted
}) => {
    const links = filters.map(f => (
        <li key={`filter#${f}`}>
            <Link
                className={ClassNames({
                    'selected': filterName === f
                })}
                to={`/${f}`}
            >
                {f ? f.replace(/^\w/, v=> v.toUpperCase()) : 'All'}
            </Link>
        </li>
    ));

    return (
        <div className="footer">
            <span className="todo-count">
                <strong>{activeLength}</strong>{' '}
                <span>item{activeLength === 1 ? '' : 's'}</span>{' '}
                left
            </span>
            <ul className="todo-filters">
                {links}
            </ul>
            <button
                className={ClassNames('todo-delete-completed', {
                    hidden : !completedLength
                })}
                onClick={clearCompleted}
            >
                Clear Completed
            </button>
        </div>
    );
};
export default Footer;
