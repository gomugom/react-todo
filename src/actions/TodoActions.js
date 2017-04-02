import axios from 'axios';
const ax = axios.create({
    baseURL: 'http://localhost:2403/todos',
    timeout: 1000
});

const TodosActions = {
    getTodos: () => dispatch => {
        ax.get('/')
        .then(res => dispatch({
            type: 'GET_TODOS',
            todos: res.data
        }))
    },
    addTodo: text => dispatch => {
        const temporalId = 'temp_' + Date.now();
        dispatch({
            type: 'ADD_TODO_TEMPORAL',
            newTodo: {
                id: temporalId,
                text,
                isDone: false
            }
        });
        ax.post('/', { text })
        .then(res => dispatch({
            type: 'ADD_TODO_SUCCESS',
            temporalId,
            realTodo: res.data
        }))
        .catch(err => dispatch({
            type: 'ADD_TODO_FAILED',
            temporalId
        }));
    },
    deleteTodo: (todos, todo) => dispatch => {
        const deleteIndex = todos.findIndex(v => v.id === todo.id);
        dispatch({
            type: 'DELETE_TODO_TEMPORAL',
            deleteIndex
        });
        ax.delete(`/${todo.id}`)
        .then(()=> dispatch({
            type: 'DELETE_TODO_SUCCESS'
        }))
        .catch(() => dispatch({
            type: 'DELETE_TODO_FAILED',
            deleteIndex,
            todo
        }));
    },
    editTodo: id => ({
        type: 'EDIT_TODO',
        id
    }),
    saveTodo: (todo, newText) => dispatch => {
        dispatch({
            type: 'SAVE_TODO_TEMPORAL',
            id: todo.id,
            text: newText
        });

        ax.put(`/${todo.id}`, { text: newText })
        .then(res => dispatch({
            type: 'SAVE_TODO_SUCCESS',
            id: todo.id,
            editedTodo: res.data
        }))
        .catch(err => dispatch({
            type: 'SAVE_TODO_FAILED',
            id: todo.id,
            editedTodo: todo
        }));
    },
    cancelEdit: () => ({
        type: 'CANCEL_EDIT'
    }),
    toggleTodo: (todo, newDone) => dispatch => {
        dispatch({
            type: 'TOGGLE_TODO_TEMPORAL',
            id: todo.id,
            isDone: newDone
        });
        ax.put(`/${todo.id}`, { isDone: newDone })
        .then(res => dispatch({
            type: 'TOGGLE_TODO_SUCCESS',
            id: todo.id,
            toggleTodo: res.data
        }))
        .catch(err => dispatch({
            type: 'TOGGLE_TODO_FAILED',
            id: todo.id,
            toggleTodo: todo
        }));
    },
    toggleAll: todos => dispatch => {
        const newDone = !todos.every(v => v.isDone);
        dispatch({
            type: 'TOGGLE_ALL_TEMPORAL',
            editedTodos: todos.map(v => Object.assign({}, v, {
                isDone: newDone
            }))
        });
        const axArray = todos.map(v =>
            ax.put(`/${v.id}`, { isDone: newDone })
        );
        axios.all(axArray)
        .then(res => dispatch({
            type: 'TOGGLE_ALL_SUCCESS'
        }))
        .catch(err => dispatch({
            type: 'TOGGLE_ALL_FAILED',
            editedTodos: todos
        }));
    },
    clearCompleted: todos => dispatch => {
        dispatch({
            type: 'CLEAR_COMPLETED_TEMPORAL',
            todos: todos.filter(v => !v.isDone)
        });
        const axArray = todos.filter(v => v.isDone).map(v =>
            ax.delete(`/${v.id}`)
        );
        axios.all(axArray)
        .then(res => dispatch({
            type: 'CLEAR_COMPLETED_SUCCESS'
        }))
        .catch(err => dispatch({
            type: 'CLEAR_COMPLETED_FAILED',
            todos
        }));
    }
};

export default TodosActions;
