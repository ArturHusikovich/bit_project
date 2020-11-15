import React, { Component } from 'react';
import { Modal, Button} from 'react-bootstrap';
import PropTypes from 'prop-types';

class EditTask extends Component{
    constructor(props){
        super(props);
    
        this.state = {
          ...props.task
        };
    }

    editTask = (event) => {
        this.setState({
            text: event.target.value
        });
    }

    saveTask = () => {
        if(!this.state.text){
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
                   <input type="text" 
                          value={this.state.text}
                          onChange={this.editTask} />
               </Modal.Body>
               
               <Modal.Footer>
                  <Button variant="secondary" 
                          onClick={this.props.onModalClose} >
                  Close
                  </Button>
                  
                  <Button variant="danger" 
                          onClick={this.saveTask}>
                  I am sure
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