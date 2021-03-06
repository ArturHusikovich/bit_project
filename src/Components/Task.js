import React, { PureComponent } from 'react';
import styles from './All.module.css';
import {Card, Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faCheck, faHistory } from '@fortawesome/free-solid-svg-icons';
import { dateFormat } from '../helpers/dateFormat';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { textFormat } from '../helpers/textFormat';

class Task extends PureComponent{
    state = {
        checked: false
    };

    selectedTask = () => {
        this.props.addSelected(this.props.id);
        this.setState({
            checked: !this.state.checked
        });
    }

    render() {
        return(
            <div className={this.state.checked ? styles.taskChecked : styles.task}>
            <Card>
                <Card.Body>
                
                    <Card.Title>
                        <input type="checkbox" onClick={this.selectedTask} className={styles.checkedTask}/>
                        <Link to={`/task/${this.props.id}`} className={styles.title}>
                        {textFormat(this.props.title, 25)}
                        </Link>
                    </Card.Title>
                            <Card.Text className={styles.item}>
                                <span>Description: {textFormat(this.props.description, 50)}</span>
                                <span>Date: {dateFormat(this.props.date)}</span>
                                <span>Created At: {dateFormat(this.props.created_at)}</span>
                                <span>Status: {this.props.status}</span>
                            </Card.Text>

                            {this.props.status === "active" ?
                            <Button variant="success" 
                                    className={styles.actionButton}
                                    disabled = {this.props.disabled}
                                    onClick = {()=> this.props.changeTaskStatus(this.props.id, {status: 'done'}, 'tasks')} >
                            <FontAwesomeIcon icon={faCheck} />
                            </Button> :
                            <Button variant="warning" 
                                    className={styles.actionButton}
                                    disabled = {this.props.disabled}
                                    onClick = {()=> this.props.changeTaskStatus(this.props.id, {status: 'active'},'tasks')} >
                            <FontAwesomeIcon icon={faHistory} />
                            </Button>
                            }
                            
                            <Button variant="info" 
                                    className={styles.actionButton} 
                                    disabled={this.props.disabled}
                                    onClick = {() => this.props.toggleEditTask(this.props.id)}>
                                <FontAwesomeIcon icon={faEdit} />
                            </Button>

                            <Button variant="danger" 
                                    className={styles.actionButton} 
                                    disabled={this.props.disabled}
                                    onClick = {() => this.props.removeTask(this.props.id)}>
                            <FontAwesomeIcon icon={faTrash} />
                            </Button>
                </Card.Body>
            </Card>
        </div>
        );
    }
}

export default Task;

Task.propTypes = {
    description: PropTypes.string,
    toggleEditTask: PropTypes.func.isRequired,
    date: PropTypes.string,
    created_at: PropTypes.string

};