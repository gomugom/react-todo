import React, { Component } from 'react';

const Todo = ({
    text,
    isDone,
    deleteTodo
}) => {
    return (
        <li className="todo-item">
            <button className="toggle" />
            <div className="todo-item__view">
                <div className="todo-item__view__text">
                    {text}
                </div>
                <button
                    className="todo-item__destroy"
                    onClick={deleteTodo}
                />
            </div>
            <input
                className="todo-item__edit"
                type="text"
            />
        </li>
    );
}

export default Todo;
