import React, { PureComponent } from 'react';
import styles from './SingleTask.module.css';
import Spinner from '../Spinner/Spinner';
import { dateFormat } from '../../helpers/dateFormat';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import EditTask from '../EditTask/EditTask';

class SingleTask extends PureComponent{
    state = {
        task: null,
        openEditModal: false
    };

    componentDidMount(){
        const taskId =this.props.match.params.id; 

        fetch(`http://localhost:3001/task/${taskId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((response) => response.json())
        .then((data) => {
            if(data.error) {
                throw data.error;
            }

        this.setState({
                task: data
            });  
        })
        .catch((error) => {
                console.log("ToDo -> error", error)
            });
    }

    removeTask = () => {
        const taskId = this.props.match.params.id;

        fetch(`http://localhost:3001/task/${taskId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((response) => response.json())
        .then((data) => {
            if(data.error) {
                throw data.error;
            }
            this.props.history.push('/');            
        })
        .catch((error) => {
                console.log("ToDo -> error", error)
            });
    }

    toggleEditTask = () => {
        this.setState({
            openEditModal: !this.state.openEditModal
        });
    }

    onEditTaskSave = (editedTask) => {
        fetch(`http://localhost:3001/task/${editedTask._id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedTask)
        })
            .then((res) => res.json())
            .then(response => {
                if (response.error) {
                    throw response.error;
                }
        
                this.setState({
                    task: response,
                    openEditModal: false
                });

            })
            .catch((error) => {
                console.log("ToDo -> error", error)
            });

    }
 
    render(){
        const {task} = this.state;

      return(
      <div>
          {!!task ? 
                    <div className={styles.singleTask}>
                        <p>Title: {task.title}</p>
                        <p>Description: {task.description}</p>
                        <p>Date: {dateFormat(task.date)}</p>

                        <Button variant="warning" 
                                className={styles.actionButton} 
                                onClick = {this.toggleEditTask}
                                >
                                <FontAwesomeIcon icon={faEdit} />
                        </Button>

                        <Button variant="danger" 
                                className={styles.actionButton} 
                                onClick = {this.removeTask}
                                >
                            <FontAwesomeIcon icon={faTrash} />
                        </Button>
                    </div> 
                  : <Spinner /> }
            
          { this.state.openEditModal &&
                    <EditTask onModalClose={this.toggleEditTask}
                              onSubmit={this.onEditTaskSave}
                              task={this.state.task}
                             />
                } 
          
      </div>
      )
  }
}

export default SingleTask;


