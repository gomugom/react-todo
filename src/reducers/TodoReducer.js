import update from 'immutability-helper';

const initialState = {
    todos: [],
    editingId: null
};

const TodoReducer = (state = initialState, action) => {
    switch(action.type) {
    case 'GET_TODOS_SUCCESS': {
        return update(state, {
            todos: {
                $set: action.todos
            }
        });
    }
    case 'ADD_TODO_REQUEST': {
        return update(state, {
            todos: {
                $push: [ action.newTodo ]
            }
        });
    }
    case 'ADD_TODO_SUCCESS': {
        return update(state, {
            todos: {
                $splice: [
                    [state.todos.findIndex(v => v.id === action.tempId), 1, action.realTodo]
                ]
            }
        });
    }
    case 'ADD_TODO_FAILED': {
        return update(state, {
            todos: {
                $splice: [
                    [state.todos.findIndex(v => v.id === action.tempId), 1]
                ]
            }
        });
    }
    case 'DELETE_TODO': {
        return update(state, {
            todos: {
                $splice: [
                    [ state.todos.findIndex(v => v.id === action.id), 1 ]
                ]
            }
        });
    }
    case 'DELETE_TODO_FAILED': {
        return update(state, {
            todos: {
                $set: action.todos
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
    case 'CANCEL_EDIT': {
        return update(state, {
            editingId: {
                $set: null
            }
        });
    }
    case 'SAVE_TODO_REQUEST':
    case 'SAVE_TODO_FAILED': {
        return update(state, {
            todos: {
                [state.todos.findIndex(v => v.id === action.id)]: {
                    text: {
                        $set: action.newText
                    }
                }
            },
            editingId: {
                $set: null
            }
        });
    }
    case 'TOGGLE_TODO_REQUEST':
    case 'TOGGLE_TODO_FAILED': {
        return update(state, {
            todos: {
                [state.todos.findIndex(v => v.id === action.id)]: {
                    isDone: {
                        $set: action.isDone
                    }
                }
            }
        });
    }
    case 'TOGGLE_ALL_REQUEST':
    case 'TOGGLE_ALL_FAILED': {
        return update(state, {
            todos: {
                $set: action.toggledTodos
            }
        });
    }
    case 'DELETE_COMPLETED_REQUEST':
    case 'DELETE_COMPLETED_FAILED': {
        return update(state, {
            todos: {
                $set: action.todos
            }
        });
    }
    default: return state;
    }
};
export default TodoReducer;
