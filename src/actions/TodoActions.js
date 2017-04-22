import axios from 'axios';
const ax = axios.create({
    baseURL: 'http://localhost:2403/todos',
    timeout: 1000
});

const TodosActions = {
    getTodos: () => dispatch => {
        dispatch({
            type: 'GET_TODOS_REQUEST'
        });

        ax.get('/')
        .then(res => dispatch({
            type: 'GET_TODOS_SUCCESS',
            todos: res.data
        }))
        .catch(err => {
            console.error(err);
            dispatch({
                type: 'GET_TODOS_FAILED'
            });
        });
    },
    addTodo: text => dispatch => {
        const tempId = 'temp_' + Date.now();
        dispatch({
            type: 'ADD_TODO_REQUEST',
            newTodo: {
                id: tempId,
                text,
                isDone: false
            }
        });
        ax.post('/', { text })
        .then(res => dispatch({
            type: 'ADD_TODO_SUCCESS',
            tempId,
            realTodo: res.data
        }))
        .catch(err => {
            console.error(err);
            dispatch({
                type: 'ADD_TODO_FAILED',
                tempId
            });
        });
    },
    deleteTodo: id => (dispatch, getState) => {
        const prevTodos = getState().todos;
        dispatch({
            type: 'DELETE_TODO_REQUEST',
            id
        });
        ax.delete(`/${id}`)
        .then(() => dispatch({
            type: 'DELETE_TODO_SUCCESS'
        }))
        .catch(err => {
            console.error(err);
            dispatch({
                type: 'DELETE_TODO_FAILED',
                todos: prevTodos
            });
        });
    },
    editTodo: id => ({
        type: 'EDIT_TODO',
        id
    }),
    cancelEdit: () => ({
        type: 'CANCEL_EDIT'
    }),
    saveTodo: (id, newText) => (dispatch, getState) => {
        const prevText = getState().todos.find(v => v.id === id).text;
        dispatch({
            type: 'SAVE_TODO_REQUEST',
            id,
            newText
        });
        ax.put(`/${id}`, { text: newText })
        .then(() => dispatch({
            type: 'SAVE_TODO_SUCCESS'
        }))
        .catch(err => {
            console.error(err);
            dispatch({
                type: 'SAVE_TODO_FAILED',
                id,
                newText: prevText
            });
        });
    },
    toggleTodo: id => (dispatch, getState) => {
        const prevDone = getState().todos.find(v => v.id === id).isDone;
        dispatch({
            type: 'TOGGLE_TODO_REQUEST',
            id,
            isDone: !prevDone
        });

        ax.put(`/${id}`, { isDone: !prevDone })
        .then(() => dispatch({
            type: 'TOGGLE_TODO_SUCCESS'
        }))
        .catch(err => {
            console.error(err);
            dispatch({
                type: 'TOGGLE_TODO_FAILED',
                id,
                isDone: prevDone
            });
        });
    },
    toggleAll: () => (dispatch, getState) => {
        const prevTodos = getState().todos;
        const newDone = !prevTodos.every(v => v.isDone);
        dispatch({
            type: 'TOGGLE_ALL_REQUEST',
            toggledTodos: prevTodos.map(v => Object.assign({}, v, {
                isDone: newDone
            }))
        });

        const axArray = prevTodos.map(todo =>
            ax.put(`/${todo.id}`, { isDone: newDone })
        );
        axios.all(axArray)
        .then(() => dispatch({
            type: 'TOGGLE_ALL_SUCCESS'
        }))
        .catch(err => {
            console.error(err);
            dispatch({
                type: 'TOGGLE_ALL_FAILED',
                toggledTodos: prevTodos
            });
        });
    },
    clearCompleted: () => (dispatch, getState) => {
        const prevTodos = getState().todos;
        dispatch({
            type: 'DELETE_COMPLETED_REQUEST',
            todos: prevTodos.filter(v => !v.isDone)
        });

        const axArray = prevTodos.filter(todo => todo.isDone)
            .map(v => ax.delete(`/${v.id}`));
        axios.all(axArray).then(() => dispatch({
            type: 'DELETE_COMPLETED_SUCCESS'
        }))
        .catch(err => {
            console.error(err);
            dispatch({
                type: 'DELETE_COMPLETED_FAILED',
                todos: prevTodos
            });
        });
    }
};

export default TodosActions;
