import React, { Component } from 'react';
import Todo from './Todo';

const TodoList = ({
    todos,
    deleteTodo
}) => {
    const todoList = todos.map(({ id, text, isDone }) => (
        <Todo
            key={`todo#${id}`}
            text={text}
            isDone={isDone}
            deleteTodo={() => deleteTodo(id)}
        />
    ));
    return (
        <div className="todo-app__main">
            <ul className="todo-list">
                {todoList}
            </ul>
        </div>
    );
}

export default TodoList;
