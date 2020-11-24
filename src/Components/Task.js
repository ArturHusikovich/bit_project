import React, { PureComponent } from 'react';
import styles from './All.module.css';
import {Card, Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'


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
                <input type="checkbox" onClick={this.selectedTask}/>

                    <Card.Title>{this.props.title}</Card.Title>
                            <Card.Text>
                                {this.props.description}
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