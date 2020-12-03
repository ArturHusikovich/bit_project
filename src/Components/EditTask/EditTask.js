import React, { Component } from 'react';
import { Modal, Button} from 'react-bootstrap';
import PropTypes from 'prop-types';
import styles from './EditTask.module.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class EditTask extends Component{
    constructor(props){
        super(props);
        const {date} = props.task;
    
        this.state = {
          ...props.task,
          date: date ? new Date(date): new Date()
        }
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
        const editedTask = {
            ...this.state,
            date: this.state.date.toISOString().slice(0, 10)

        }
        this.props.onSubmit(editedTask)
    };

    dateChange = (date) => {
        this.setState({
            date
        });
    };

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
                   <div>
                        <DatePicker selected={this.state.date} 
                                    onChange={this.dateChange} 
                                    minDate = {new Date()} />
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