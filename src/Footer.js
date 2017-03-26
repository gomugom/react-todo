import React from 'react';

const Footer = ({
    completedLength,
    clearCompleted
}) => (
    <div className="footer">
        <span className="todo-count">
            <strong>0</strong>{' '}
            <span>items</span>{' '}
            left
        </span>
        <ul className="todo-filters">
            <li>
                <a>All</a>
            </li>
            <li>
                <a>Active</a>
            </li>
            <li>
                <a>Completed</a>
            </li>
        </ul>
        <button
            className={[
                "todo-delete-completed",
                completedLength ? '' : ' hidden'
            ].join('')}
            onClick={clearCompleted}
        >
            Clear Completed
        </button>
    </div>
);
export default Footer;
