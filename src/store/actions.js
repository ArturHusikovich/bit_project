import request from '../helpers/request';

const apiUrl = process.env.REACT_APP_URL;

export function getTasks(data = {}){
    let url = `${apiUrl}/task`;
    let query = '?';
    
    for(let key in data){
        let value = data[key];
        query = `${query}${key}=${value}&`;
    }

    if(query==='?'){
        query = '';
    }

    return (dispatch) => {
        dispatch({type: 'LOADING'});

        request(url+query)
        .then(res =>{
            dispatch({type: 'SET_TASKS', tasks: res});
        })
        .catch(err =>{
            dispatch({type: 'ERROR', errorMessage: err.message});
        });
    }
}

export function addTask(task){
    return (dispatch) => {
        dispatch({type: 'LOADING'});

        request(`${apiUrl}/task`, 'POST', task)
        .then(res =>{
            dispatch({type: 'ADD_TASK', task: res});
        })
        .catch(err =>{
            dispatch({type: 'ERROR', errorMessage: err.message});
        });
    }
}

export function removeTask(id, from="tasks", redirect){
    return (dispatch) => {
        dispatch({type: 'LOADING'});

        request(`${apiUrl}/task/${id}`, 'DELETE')
        .then(res =>{
            dispatch({type: 'REMOVE_TASK', id, from});
            if(from==="single"){
                redirect("/");
            }
        })
        .catch(err =>{
            dispatch({type: 'ERROR', errorMessage: err.message});
        });
    }
}

export function editTask(editedTask, from){
    return (dispatch) => {
        dispatch({type: 'LOADING'});

        request(`${apiUrl}/task/${editedTask._id}`, 'PUT', editedTask)
        .then(res =>{
            dispatch({type: 'EDIT_TASK', editedTask: res, from});
        })
        .catch(err =>{
            dispatch({type: 'ERROR', errorMessage: err.message});
        });
    }
}

export function removeSelected(taskIds){
    return (dispatch) => {
        dispatch({type: 'LOADING'});

        request(`${apiUrl}/task`, 'PATCH', {tasks: taskIds})
        .then(res =>{
            dispatch({type: 'REMOVE_SELECTED_TASKS', taskIds});
        })
        .catch(err =>{
            dispatch({type: 'ERROR', errorMessage: err.message});
        });
    }
}

export function getSingleTask(taskId){
    return (dispatch) => {
        dispatch({type: 'LOADING'});

        request(`${apiUrl}/task/${taskId}`)
        .then(res =>{
            dispatch({type: 'GET_SINGLE_TASK', task: res});
        })
        .catch(err =>{
            dispatch({type: 'ERROR', errorMessage: err.message});
        });
    }
}

export function changeTaskStatus(id, data, from){
    return (dispatch) => {
        dispatch({type: 'LOADING'});

        request(`${apiUrl}/task/${id}`, 'PUT', data)
        .then(res =>{
            dispatch({type: 'CHANGE_TASK_STATUS', editedTask: res, from});
        })
        .catch(err =>{
            dispatch({type: 'ERROR', errorMessage: err.message});
        });
    }
}

export function sendContacts(data){
    return (dispatch) => {
        dispatch({type: 'LOADING'});

        request(`${apiUrl}/form`, 'POST', data)
        .then(res =>{
            dispatch({type: 'SEND_CONTACTS'});
        })
        .catch(err =>{
            dispatch({type: 'ERROR', errorMessage: err.message});
        });
    }
}
