import React, { PureComponent } from 'react';
import styles from './SingleTask.module.css';
import Spinner from '../Spinner/Spinner';
import { dateFormat } from '../../helpers/dateFormat';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import EditTask from '../EditTask/EditTask';
import { connect } from 'react-redux';
import { getSingleTask, removeTask } from '../../store/actions';

class SingleTask extends PureComponent{
    state = {
        openEditModal: false
    };

    componentDidMount(){
        const taskId = this.props.match.params.id; 
        this.props.getSingleTask(taskId);
    }

    componentDidUpdate(prevProps){
        if (!prevProps.editTaskStatus && this.props.editTaskStatus) {
            this.setState({
                openEditModal: false
            });
        }
    }

    toggleEditTask = () => {
        this.setState({
            openEditModal: !this.state.openEditModal
        });
    }
 
    render(){
        const {task} = this.props;
        const historyPush = this.props.history.push;

      return(
      <div>
          {!!task ? 
                    <div className={styles.singleTask}>
                        <p>Title: {task.title}</p>
                        <p>Description: {task.description}</p>
                        <p>Date: {dateFormat(task.date)}</p>

                        <Button variant="warning" 
                                className={styles.actionButton} 
                                onClick = {this.toggleEditTask} >
                                <FontAwesomeIcon icon={faEdit} />
                        </Button>

                        <Button variant="danger" 
                                className={styles.actionButton} 
                                onClick = {()=>this.props.removeTask(task._id, "single", historyPush)} >
                            <FontAwesomeIcon icon={faTrash} />
                        </Button>
                    </div> 
                  : <Spinner /> }
            
          { this.state.openEditModal &&
                    <EditTask onModalClose={this.toggleEditTask}
                              task={this.props.task} 
                              from = "single" />
                }  
      </div>
      )
  }
}

const mapStateToProps = (state) => {
    return {
        task: state.task,
        editTaskStatus: state.editTaskStatus
    }
}
const mapDispatchToProps = {
    getSingleTask: getSingleTask,
    removeTask: removeTask
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleTask);


