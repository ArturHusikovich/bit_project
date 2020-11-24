import React, { Component } from 'react';
import { Modal, Button} from 'react-bootstrap';
import PropTypes from 'prop-types';
import styles from './EditTask.module.css';

class EditTask extends Component{
    constructor(props){
        super(props);
    
        this.state = {
          ...props.task
        };
    }

    editTask = (event) => {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        });
    };

    saveTask = () => {
        if(!this.state.title){
            return
        };

        this.props.onSubmit(this.state)
    }

     render(){
        return(
            <Modal show={true} 
                   onHide={this.props.onModalClose}
                   backdrop="static"
                   keyboard={false} >

               <Modal.Header closeButton>
                   <Modal.Title>Edit task</Modal.Title>
               </Modal.Header>

               <Modal.Body>
                   <div>
                        <span>Title</span>
                        <input type="text" 
                               value={this.state.title}
                               onChange={this.editTask}
                               className={styles.input}
                               name="title"
                               />
                   </div>
                   <div>
                        <span>Description</span>
                        <textarea type="text" 
                               value={this.state.description}
                               onChange={this.editTask}
                               className={styles.input}
                               name="description">
                        </textarea>
                   </div>
               </Modal.Body> 
               
               <Modal.Footer>
                  <Button variant="secondary" 
                          onClick={this.props.onModalClose} >
                  Close
                  </Button>
                  
                  <Button variant="danger" 
                          onClick={this.saveTask}>
                  Edit
                  </Button>
               </Modal.Footer>

            </Modal>
        );
    }
}

export default EditTask;

EditTask.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onModalClose: PropTypes.func.isRequired
};