import React, { Component } from 'react';

import Header from './Header';
import TodoList from './TodoList';
import Footer from './Footer';

class App extends Component {
    constructor() {
        super();
        this.state = {
            todos: [
                {
                    id: 1,
                    text: '치킨에 맥주',
                    isDone: false
                }, {
                    id: 2,
                    text: '삼겹살에 쏘주',
                    isDone: false
                }, {
                    id: 3,
                    text: '피자에 파스타',
                    isDone: true
                }
            ],
            editingId: null,
            filterName: 'All'
        };
    }
    addTodo(text) {
        this.setState({
            todos: [ ...this.state.todos, {
                id: Date.now(),
                text,
                isDone: false
            }]
        });
    }
    deleteTodo(id) {
        const newTodos = [...this.state.todos];
        const deleteIndex = newTodos.findIndex(v => v.id === id);
        newTodos.splice(deleteIndex, 1);
        this.setState({
            todos: newTodos
        });
    }
    editTodo(id) {
        this.setState({
            editingId: id
        });
    }
    saveTodo(id, newText) {
        const newTodos = [...this.state.todos];
        const editIndex = newTodos.findIndex(v => v.id === id);
        newTodos[editIndex] = Object.assign({}, newTodos[editIndex], {
            text: newText
        });
        this.setState({
            todos: newTodos,
            editingId: null
        });
    }
    cancelEdit() {
        this.setState({
            editingId: null
        });
    }
    toggleTodo(id) {
        const newTodos = [...this.state.todos];
        const editIndex = newTodos.findIndex(v => v.id === id);
        newTodos[editIndex] = Object.assign({}, newTodos[editIndex], {
            isDone: !newTodos[editIndex].isDone
        });
        this.setState({
            todos: newTodos
        });
    }
    toggleAll() {
        const newDone = !this.state.todos.every(v => v.isDone);
        const newTodos = this.state.todos.map(v => {
            v.isDone = newDone;
            return v;
        });
        this.setState({
            todos: newTodos
        });
    }
    clearCompleted() {
        const newTodos = this.state.todos.filter(v => !v.isDone);
        this.setState({
            todos: newTodos
        });
    }
    selectFilter(filterName) {
        this.setState({
            filterName
        });
    }

    render() {
        const {
            todos,
            editingId,
            filterName
        } = this.state;

        const completedLength = todos.filter(v => v.isDone);
        const activeLength = todos.length - completedLength;

        const filteredTodos = (filterName === 'All')
            ? todos
            : todos.filter(todo => (
                (filterName === 'Active' && !todo.isDone)
                || (filterName === 'Completed' && todo.isDone)
            ));

        return (
            <div className="todo-app">
                <Header
                    addTodo={text => this.addTodo(text)}
                    toggleAll={() => this.toggleAll()}
                    isAllDone={todos.every(v => v.isDone)}
                />
                <TodoList
                    todos={filteredTodos}
                    editingId={editingId}
                    deleteTodo={id => this.deleteTodo(id)}
                    editTodo={id => this.editTodo(id)}
                    saveTodo={(id, newText) => this.saveTodo(id, newText)}
                    cancelEdit={() => this.cancelEdit()}
                    toggleTodo={id => this.toggleTodo(id)}
                />
                <Footer
                    activeLength={activeLength}
                    completedLength={completedLength}
                    filterName={filterName}
                    selectFilter={filterName => this.selectFilter(filterName)}
                    clearCompleted={() => this.clearCompleted()}
                />
            </div>
        );
    }
}

export default App;
