import React from 'react';
import styles from './All.module.css';
import {Card, Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'

const Task = (props) => {
    return (
        <div>
            <Card className={styles.task}>
                <Card.Body>
                    <Card.Title>{props.text.slice(0, 10) + '...'}</Card.Title>
                            <Card.Text>
                                {props.text}
                            </Card.Text>
                            
                            <Button variant="warning" className={styles.actionButton}>
                                <FontAwesomeIcon icon={faEdit} />
                            </Button>

                            <Button variant="danger" className={styles.actionButton} 
                                    onClick = {() => props.removeTask(props.id)}>
                            <FontAwesomeIcon icon={faTrash} />
                            </Button>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Task;