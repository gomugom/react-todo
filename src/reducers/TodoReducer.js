import update from 'immutability-helper';

const initialState = {
    todos: [],
    editingId: null
};

const TodoReducer = (state = initialState, action) => {
    switch(action.type) {
    case 'GET_TODOS': {
        return update(state, {
            todos: {
                $set: action.todos
            }
        });
    }
    case 'ADD_TODO': {
        return update(state, {
            todos: {
                $push: [ action.newTodo ]
            }
        });
    }
    case 'DELETE_TODO': {
        return update(state, {
            todos: {
                $splice: [
                        [ state.todos.findIndex(v => v.id === action.id), 1]
                ]
            }
        });
    }
    case 'EDIT_TODO': {
        return update(state, {
            editingId: {
                $set: action.id
            }
        });
    }
    case 'SAVE_TODO': {
        return update(state, {
            todos: {
                [state.todos.findIndex(v => v.id === action.id)]: {
                    $set: action.editedTodo
                }
            },
            editingId: {
                $set: null
            }
        });
    }
    case 'CANCEL_EDIT': {
        return update(state, {
            editingId: {
                $set: null
            }
        });
    }
    case 'TOGGLE_TODO': {
        return update(state, {
            todos: {
                [state.todos.findIndex(v => v.id === action.id)]: {
                    $set: action.editedTodo
                }
            }
        });
    }
    case 'TOGGLE_ALL': {
        return update(state, {
            todos: {
                $set: action.editedTodos
            }
        });
    }
    case 'CLEAR_COMPLETED': {
        return update(state, {
            todos: {
                $apply: todos => todos.filter(v => !v.isDone)
            }
        });
    }
    default: {
        return state;
    }
    }
};
export default TodoReducer;
