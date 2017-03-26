import React, { Component } from 'react';
import axios from 'axios';

import Header from './Header';
import TodoList from './TodoList';
import Footer from './Footer';

const ax = axios.create({
    baseURL: 'http://localhost:2403/todos',
    timeout: 1000
});

class App extends Component {
    constructor() {
        super();
        this.state = {
            todos: [],
            editingId: null,
            filterName: 'All'
        };
    }
    componentWillMount() {
        ax.get('/').then(res => {
            this.setState({
                todos: res.data
            });
        });
    }
    addTodo(text) {
        ax.post('/', { text }).then(res => {
            this.setState({
                todos: [ ...this.state.todos, res.data ]
            });
        })
    }
    deleteTodo(id) {
        const newTodos = [...this.state.todos];
        const deleteIndex = newTodos.findIndex(v => v.id === id);

        ax.delete(`/${id}`).then(() => {
            newTodos.splice(deleteIndex, 1);
            this.setState({
                todos: newTodos
            });
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

        ax.put(`/${id}`, {
            text: newText
        }).then(res => {
            newTodos[editIndex] = res.data;
            this.setState({
                todos: newTodos,
                editingId: null
            });
        })
    }
    cancelEdit() {
        this.setState({
            editingId: null
        });
    }
    toggleTodo(id) {
        const newTodos = [...this.state.todos];
        const editIndex = newTodos.findIndex(v => v.id === id);
        const newDone = !newTodos[editIndex].isDone;

        ax.put(`/${id}`, {
            isDone: newDone
        }).then(res => {
            newTodos.splice(editIndex, 1, res.data);
            this.setState({
                todos: newTodos
            });
        });
    }
    toggleAll() {
        const newDone = !this.state.todos.every(v => v.isDone);
        const axArray = this.state.todos.map(v => ax.put(`/${v.id}`, {
            isDone: newDone
        }));

        axios.all(axArray).then(res => {
            this.setState({
                todos: res.map(r => r.data)
            });
        });
    }
    clearCompleted() {
        const axArray = this.state.todos
            .filter(v => v.isDone)
            .map(v => ax.delete(`/${v.id}`));
        const newTodos = this.state.todos.filter(v => !v.isDone);

        axios.all(axArray).then(() => {
            this.setState({
                todos: newTodos
            });
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

        const completedLength = todos.filter(v => v.isDone).length;
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
