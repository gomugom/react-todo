import React from 'react';
import ClassNames from 'classnames';

const filters = ['All', 'Active', 'Completed'];

const Footer = ({
    filterName,
    completedLength,
    activeLength,
    selectFilter,
    clearCompleted
}) => {
    const links = filters.map(f => (
        <li key={`filter#${f}`}>
            <a
                className={ClassNames({
                    'selected': filterName === f
                })}
                onClick={() => selectFilter(f)}
            >{f}</a>
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
