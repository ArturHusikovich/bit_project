const defaultState = {
    tasks: [],
    errorMessage: null,
    successMessage: null,
    addTaskStatus: false,
    editTaskStatus: false,
    loading: false
  };

  export const reducer = (state = defaultState, action) => {
    switch(action.type){
        case "LOADING": {
            return {
              ...state,
              loading: true,
              errorMessage: null,
              successMessage: null,
              addTaskStatus: false
            }
          }
        case "SET_TASKS": {
            return {
              ...state,
              tasks: action.tasks,
              loading: false
            }
          }

        case "ERROR": {
            return {
              ...state,
              errorMessage: action.errorMessage,
              loading: false
            }
          }
        
        case "ADD_TASK": {
            const newTasks = [...state.tasks, action.task];
            return {
                ...state,
                tasks: newTasks,
                addTaskStatus: true,
                successMessage: "Task is successfully added!",
                loading: false
            }
        }

        case "EDIT_TASK": {
            const foundTaskIndex = state.tasks.findIndex((task) => task._id === action.editedTask._id);
            const newTasks = [state.tasks[foundTaskIndex] = action.editedTask]
            return {
                ...state,
                tasks: newTasks,
                successMessage: "Task is successfully edited!",
                editTaskStatus: true,
                loading: false
            }
        }

        case "REMOVE_TASK": {
            const newTasks = state.tasks.filter(task => task._id !== action.id);
            
            return {
                ...state,
                tasks: newTasks,
                successMessage: "Task is successfully removed!",
                loading: false
            }
        }
        default: return state
    }
  }

  