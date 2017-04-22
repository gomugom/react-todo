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
        .then(({ data }) => dispatch({
            type: 'SAVE_TODO',
            id,
            editedTodo: data
        })),
    cancelEdit: () => ({
        type: 'CANCEL_EDIT'
    }),
    toggleTodo: id => (dispatch, getState) => {
        const newDone = !getState().todos.find(v => v.id === id).isDone;
        ax.put(`/${id}`, { isDone: newDone })
        .then(({ data }) => dispatch({
            type: 'TOGGLE_TODO',
            id,
            editedTodo: data
        }));
    },
    toggleAll: () => (dispatch, getState) => {
        const prevTodos = getState().todos;
        const newDone = !prevTodos.every(v => v.isDone);
        const axArray = prevTodos.map(v =>
            ax.put(`/${v.id}`, { isDone: newDone })
        );
        axios.all(axArray).then(res => dispatch({
            type: 'TOGGLE_ALL',
            editedTodos: res.map(({ data }) => data)
        }));
    },
    clearCompleted: () => (dispatch, getState) => {
        const prevTodos = getState().todos;
        const axArray = prevTodos.filter(v => v.isDone).map(v =>
            ax.delete(`/${v.id}`)
        );
        axios.all(axArray).then(() => dispatch({
            type: 'CLEAR_COMPLETED'
        }));
    }
};

export default TodosActions;
