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
    const todoList = todos.map(todo => (
        <Todo
            key={`todo#${todo.id}`}
            text={todo.text}
            isDone={todo.isDone}
            isEditing={editingId === todo.id}
            deleteTodo={() => deleteTodo(todo)}
            editTodo={() => editTodo(todo.id)}
            saveTodo={text => saveTodo(todo, text)}
            cancelEdit={cancelEdit}
            deleteTodo={() => deleteTodo(todo)}
            toggleTodo={() => toggleTodo(todo, !todo.isDone)}
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
