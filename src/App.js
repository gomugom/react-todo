import React, { Component } from 'react';
import axios from 'axios';
import update from 'immutability-helper';

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
                todos: update(this.state.todos, {
                    $push: [ res.data ]
                })
            });
        });
    }
    deleteTodo(id) {
        const prevTodos = [...this.state.todos];
        const deleteIndex = prevTodos.findIndex(v => v.id === id);
        const newTodos = update(prevTodos, {
            $splice: [[ deleteIndex, 1]]
        });
        this.setState({
            todos: newTodos
        });

        ax.delete(`/${id}`).catch(err => {
            this.setState({
                todos: prevTodos
            });
        });
    }
    editTodo(id) {
        this.setState({
            editingId: id
        });
    }
    saveTodo(id, newText) {
        const prevTodos = [...this.state.todos];
        const editIndex = prevTodos.findIndex(v => v.id === id);
        const newTodos = update(prevTodos, {
            [editIndex]: {
                text: {
                    $set: newText
                }
            }
        });
        this.setState({
            todos: newTodos,
            editingId: null
        });

        ax.put(`/${id}`, { text: newText }).catch(err => {
            this.setState({
                todos: prevTodos
            });
        });
    }
    cancelEdit() {
        this.setState({
            editingId: null
        });
    }
    toggleTodo(id) {
        const prevTodos = [...this.state.todos];
        const editIndex = prevTodos.findIndex(v => v.id === id);
        const newDone = !prevTodos[editIndex].isDone;
        const newTodos = update(prevTodos, {
            [editIndex]: {
                isDone: {
                    $set: newDone
                }
            }
        });
        this.setState({
            todos: newTodos
        });

        ax.put(`/${id}`, { isDone: newDone }).catch(err => {
            this.setState({
                todos: prevTodos
            });
        });
    }
    toggleAll() {
        const prevTodos = [...this.state.todos];
        const newDone = !prevTodos.every(v => v.isDone);
        const newTodos = update(prevTodos, {
            $apply: todos => todos.map(v => update(v, {
                isDone: {
                    $set: newDone
                }
            }))
        });
        this.setState({
            todos: newTodos
        });

        const axArray = prevTodos.map(v => ax.put(`/${v.id}`, {
            isDone: newDone
        }));
        axios.all(axArray).catch(err => {
            this.setState({
                todos: prevTodos
            });
        });
    }
    clearCompleted() {
        const prevTodos = [...this.state.todos];
        const newTodos = update(prevTodos, {
            $apply: todos => todos.filter(v => !v.isDone)
        });
        this.setState({
            todos: newTodos
        });

        const axArray = this.state.todos
            .filter(v => v.isDone)
            .map(v => ax.delete(`/${v.id}`));
        axios.all(axArray).catch(err => {
            this.setState({
                todos: prevTodos
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
