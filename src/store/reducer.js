const defaultState = {
    tasks: [],
    errorMessage: null,
    successMessage: null,
    addTaskStatus: false,
    editTaskStatus: false,
    loading: false,
    removeTasksSuccess: false,
    removeTaskSuccess: false,
    task: null,
    contact: null
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
                successMessage: "Task added successfully!",
                loading: false
            }
        }

        case "EDIT_TASK": {
            if (action.from === 'single') {
                return {
                  ...state,
                  task: action.editedTask,
                  loading: false,
                  editTaskStatus: true,
                  successMessage: 'Task edited successfully!',
                }
              }
              else {
                const tasks = [...state.tasks];
                const foundTaskIndex = tasks.findIndex((task) => task._id === action.editedTask._id);
                tasks[foundTaskIndex] = action.editedTask;
                return {
                    ...state,
                    tasks: tasks,
                    successMessage: "Task edited successfully!",
                    editTaskStatus: true,
                    loading: false
                }
        } }

        case "REMOVE_TASK": {
            if(action.from==="single"){
                return {
                    ...state,
                    task: null,
                    loading: false,
                    removeTaskSuccess: true,
                    successMessage: 'Task removed successfully!',
                  }
                } else {
                    const newTasks = state.tasks.filter(task => task._id !== action.id);
            
                    return {
                        ...state,
                        tasks: newTasks,
                        successMessage: "Task removed successfully!",
                        loading: false
                    }
        } }

        case "REMOVE_SELECTED_TASKS": {
            let tasks = [...state.tasks];
            action.taskIds.forEach((id) => {
                tasks = tasks.filter((task) => task._id !== id);
            });
            return {
              ...state,
              tasks: tasks,
              loading: false,
              removeTasksSuccess: true,
              successMessage: 'Tasks removed successfully!',
            }
          }
        
        case "GET_SINGLE_TASK": {
              return {
                  ...state,
                  task: action.task,
                  loading: false,
              }
          }

        case "CHANGE_TASK_STATUS": {
          let message;
          if(action.editedTask.status === 'done'){
            message = 'Congratulations, the task completed!';
          } else {
            message = 'The task is active now!'
          }

          if(action.from === 'single'){
            return{
              ...state,
              task: action.editedTask,
              loading: false,
              editTaskStatus: true,
              successMessage: message
            }
          } else {
            const tasks = [...state.tasks];
            const foundTaskIndex = tasks.findIndex((task) => task._id === action.editedTask._id);
                tasks[foundTaskIndex] = action.editedTask;
                return {
                    ...state,
                    tasks: tasks,
                    successMessage: message,
                    editTaskStatus: true,
                    loading: false
                }
          }
        }

        case "SEND_CONTACTS": {
          return {
            ...state,
            successMessage: "Contacts are sent!",
            contact: action.contacts,
            loading: false
          }
        }

        default: return state
    }
  }



  