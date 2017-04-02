import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from './Header';
import TodoList from './TodoList';
import Footer from './Footer';

import TodoActions from '../actions/TodoActions';

const mapStateToProps = state => ({
    todos: state.todos,
    editingId: state.editingId
});
const mapDispatchToProps = dispatch => ({
    getTodos       : () => dispatch(TodoActions.getTodos()),
    addTodo        : text => dispatch(TodoActions.addTodo(text)),
    deleteTodo     : (todos, todo) => dispatch(TodoActions.deleteTodo(todos, todo)),
    editTodo       : id => dispatch(TodoActions.editTodo(id)),
    saveTodo       : (todo, newText) => dispatch(TodoActions.saveTodo(todo, newText)),
    cancelEdit     : () => dispatch(TodoActions.cancelEdit()),
    toggleTodo     : (todo, newDone) => dispatch(TodoActions.toggleTodo(todo, newDone)),
    toggleAll      : todos => dispatch(TodoActions.toggleAll(todos)),
    clearCompleted : todos => dispatch(TodoActions.clearCompleted(todos))
});

class App extends Component {
    componentWillMount() {
        this.props.getTodos();
    }

    render() {
        const {
            todos,
            editingId,
            addTodo,
            deleteTodo,
            editTodo,
            saveTodo,
            cancelEdit,
            toggleTodo,
            toggleAll,
            clearCompleted
        } = this.props;

        const { match: { params } } = this.props;
        const filterName = params.filterName || '';

        const completedLength = todos.filter(v => v.isDone).length;
        const activeLength = todos.length - completedLength;

        const filteredTodos = !filterName
            ? todos
            : todos.filter(todo => (
                (filterName === 'active' && !todo.isDone)
                || (filterName === 'completed' && todo.isDone)
            ));

        return (
            <div className="todo-app">
                <Header
                    addTodo={addTodo}
                    toggleAll={() => toggleAll(todos)}
                    isAllDone={todos.every(v => v.isDone)}
                />
                <TodoList
                    todos={filteredTodos}
                    editingId={editingId}
                    deleteTodo={todo => deleteTodo(todos, todo)}
                    editTodo={editTodo}
                    saveTodo={saveTodo}
                    cancelEdit={cancelEdit}
                    toggleTodo={toggleTodo}
                />
                <Footer
                    activeLength={activeLength}
                    completedLength={completedLength}
                    filterName={filterName}
                    clearCompleted={() => clearCompleted(todos)}
                />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
