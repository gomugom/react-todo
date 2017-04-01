import axios from 'axios';
const ax = axios.create({
    baseURL: 'http://localhost:2403/todos',
    timeout: 1000
});

const TodosActions = {
    getTodos: () => dispatch =>
        ax.get('/').then(res => dispatch({
            type: 'GET_TODOS',
            todos: res.data
        })),
    addTodo: text => dispatch =>
        ax.post('/', { text })
        .then(res => dispatch({
            type: 'ADD_TODO',
            newTodo: res.data
        })),
    deleteTodo: id => dispatch =>
        ax.delete(`/${id}`)
        .then(() => dispatch({
            type: 'DELETE_TODO',
            id
        })),
    editTodo: id => ({
        type: 'EDIT_TODO',
        id
    }),
    saveTodo: (id, newText) => dispatch =>
        ax.put(`/${id}`, { text: newText })
        .then(res => dispatch({
            type: 'SAVE_TODO',
            id,
            editedTodo: res.data
        })),
    cancelEdit: () => ({
        type: 'CANCEL_EDIT'
    }),
    toggleTodo: (id, newDone) => dispatch =>
        ax.put(`/${id}`, { isDone: newDone })
        .then(res => dispatch({
            type: 'TOGGLE_TODO',
            id,
            editedTodo: res.data
        })),
    toggleAll: todos => dispatch => {
        const newDone = !todos.every(v => v.isDone);
        const axArray = todos.map(v =>
            ax.put(`/${v.id}`, { isDone: newDone })
        );
        axios.all(axArray).then(res => dispatch({
            type: 'TOGGLE_ALL',
            editedTodos: res.map(v => v.data)
        }));
    },
    clearCompleted: todos => dispatch => {
        const axArray = todos.filter(v => v.isDone).map(v =>
            ax.delete(`/${v.id}`)
        );
        axios.all(axArray).then(res => dispatch({
            type: 'CLEAR_COMPLETED'
        }));
    }
};

export default TodosActions;
