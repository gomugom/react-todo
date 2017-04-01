import React, { Component } from 'react';
import Todo from './Todo';

const TodoList = ({
    todos,
    editingId,
    deleteTodo,
    editTodo,
    saveTodo,
    cancelEdit,
    toggleTodo
}) => {
    const todoList = todos.map(({ id, text, isDone }) => (
        <Todo
            key={`todo#${id}`}
            text={text}
            isDone={isDone}
            isEditing={editingId === id}
            deleteTodo={() => deleteTodo(id)}
            editTodo={() => editTodo(id)}
            saveTodo={text => saveTodo(id, text)}
            cancelEdit={cancelEdit}
            deleteTodo={() => deleteTodo(id)}
            toggleTodo={() => toggleTodo(id, !isDone)}
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
