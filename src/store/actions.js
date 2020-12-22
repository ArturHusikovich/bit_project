import request from '../helpers/request';

export function getTasks(){
    return (dispatch) => {
        dispatch({type: 'LOADING'});

        request('http://localhost:3001/task')
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

        request('http://localhost:3001/task', 'POST', task)
        .then(res =>{
            dispatch({type: 'ADD_TASK', task: res});
        })
        .catch(err =>{
            dispatch({type: 'ERROR', errorMessage: err.message});
        });
    }
}

export function removeTask(id){
    return (dispatch) => {
        dispatch({type: 'LOADING'});

        request(`http://localhost:3001/task/${id}`, 'DELETE')
        .then(res =>{
            dispatch({type: 'REMOVE_TASK', id: id});
        })
        .catch(err =>{
            dispatch({type: 'ERROR', errorMessage: err.message});
        });
    }
}

export function editTask(editedTask){
    return (dispatch) => {
        dispatch({type: 'LOADING'});

        request(`http://localhost:3001/task/${editedTask._id}`, 'PUT', editedTask)
        .then(res =>{
            dispatch({type: 'EDIT_TASK', editedTask: res});
        })
        .catch(err =>{
            dispatch({type: 'ERROR', errorMessage: err.message});
        });
    }
}

