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
        case 'ADD_TODO_TEMPORAL': {
            return update(state, {
                todos: {
                    $push: [ action.newTodo ]
                }
            });
        }
        case 'ADD_TODO_SUCCESS': {
            const temporalIndex = state.todos.findIndex(v => v.id === action.temporalId);
            return update(state, {
                todos: {
                    [temporalIndex]: {
                        id: {
                            $set: action.realTodo.id
                        }
                    }
                }
            });
        }
        case 'ADD_TODO_FAILED': {
            const temporalIndex = state.todos.findIndex(v => v.id === action.temporalId);
            return update(state, {
                todos: {
                    $splice: [
                        [ temporalIndex, 1 ]
                    ]
                }
            });
        }
        case 'DELETE_TODO_TEMPORAL': {
            return update(state, {
                todos: {
                    $splice: [
                        [ action.deleteIndex, 1 ]
                    ]
                }
            });
        }
        case 'DELETE_TODO_FAILED': {
            return update(state, {
                todos: {
                    $splice: [
                        [ action.deleteIndex, 0, action.todo ]
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
        case 'SAVE_TODO_TEMPORAL': {
            return update(state, {
                todos: {
                    [state.todos.findIndex(v => v.id === action.id)]: {
                        text: {
                            $set: action.text
                        }
                    }
                },
                editingId: {
                    $set: null
                }
            });
        }
        case 'SAVE_TODO_SUCCESS': {
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
        case 'SAVE_TODO_FAILED': {
            return update(state, {
                todos: {
                    [state.todos.findIndex(v => v.id === action.id)]: {
                        $set: action.editedTodo
                    }
                },
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
        case 'TOGGLE_TODO_TEMPORAL': {
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
        case 'TOGGLE_TODO_SUCCESS':
        case 'TOGGLE_TODO_FAILED': {
            return update(state, {
                todos: {
                    [state.todos.findIndex(v => v.id === action.id)]: {
                        $set: action.toggleTodo
                    }
                }
            });
        }
        case 'TOGGLE_ALL_TEMPORAL':
        case 'TOGGLE_ALL_FAILED': {
            return update(state, {
                todos: {
                    $set: action.editedTodos
                }
            });
        }
        case 'CLEAR_COMPLETED_TEMPORAL':
        case 'CLEAR_COMPLETED_FAILED': {
            return update(state, {
                todos: {
                    $set: action.todos
                }
            });
        }
        default: {
            return state;
        }
    }
}
export default TodoReducer;
