import React, { PureComponent } from 'react';
import styles from './All.module.css';
import {Card, Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { dateFormat } from '../helpers/dateFormat';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

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
                        <Link to={`/task/${this.props.id}`}>
                        {this.props.title}
                        </Link>
                    </Card.Title>
                            <Card.Text className={styles.item}>
                                <span>Description: {this.props.description}</span>
                                <span>Date: {dateFormat(this.props.date)}</span>
                                <span>Created At: {dateFormat(this.props.created_at)}</span>
                            </Card.Text>
                            
                            <Button variant="warning" 
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