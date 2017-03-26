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
            ]
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
    render() {
        return (
            <div className="todo-app">
                <Header addTodo={text => this.addTodo(text)} />
                <TodoList
                    todos={this.state.todos}
                    deleteTodo={id => this.deleteTodo(id)}
                />
                <Footer />
            </div>
        );
    }
}

export default App;
