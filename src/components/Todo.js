import React, { Component } from 'react';
import ClassNames from 'classnames';

class Todo extends Component {
    componentDidUpdate(prevProps) {
        if(this.props.isEditing && !prevProps.isEditing) {
            this.inputDom.focus();
            this.inputDom.value = this.props.text;
        }
    }
    handleKeyDown(e) {
        const text = e.target.value;
        if(!text || e.keyCode !== 13) return;
        this.props.saveTodo(text);
        e.target.value = '';
    }

    render() {
        const {
            text,
            isDone,
            isEditing,
            deleteTodo,
            editTodo,
            cancelEdit,
            toggleTodo
        } = this.props;

        return (
            <li className={ClassNames('todo-item', {
                editing: isEditing,
                completed: isDone
            })}>
                <button
                    className="toggle"
                    onClick={toggleTodo}
                />
                <div className="todo-item__view">
                    <div
                        className="todo-item__view__text"
                        onDoubleClick={editTodo}
                    >
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
                    ref={ref => { this.inputDom = ref }}
                    onKeyDown={e => this.handleKeyDown(e)}
                    onBlur={cancelEdit}
                />
            </li>
        );
    }
}

export default Todo;
