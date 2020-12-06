import React, { PureComponent } from 'react';
import styles from './AddTask.module.css';
import { Button, Modal} from 'react-bootstrap';
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


class AddTask extends PureComponent{
    state = {
        title: '',
        description: '',
        date: new Date()
    }

    dateChange = (date) => {
        this.setState({
            date
        });
    }
    
    changeInputValue = (event) => {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        });
    };
    
    sendNewTask = () => {
        if(!this.state.title){
            return;
        }

        let newTask = {
            title: this.state.title,
            description: this.state.description,
            date: this.state.date.toISOString().slice(0, 10)
        };

        this.props.onSubmit(newTask);
    };

    render(){
        return(
            <Modal show={true} 
                   onHide={this.props.onModalClose}
                   backdrop="static"
                   keyboard={false} >

                <Modal.Header closeButton>
                   <Modal.Title>Add Your Task</Modal.Title>
               </Modal.Header>

               <Modal.Body>
                   <div>
                   <input type="text" 
                          onChange={this.changeInputValue}
                          name='title' 
                          placeholder='Enter title'
                          className={styles.input}/>
                   </div>

                   <div>
                    <textarea rows='3'
                              name='description'
                              onChange={this.changeInputValue}
                              placeholder='Enter description'
                              className={styles.input}>
                    </textarea>
                    </div>

                    <div>
                        <DatePicker selected={this.state.date}
                                    onSelect={this.dateChange}
                                    minDate = {new Date()}
                                    className={styles.input} />
                    </div>
               </Modal.Body>
               
               <Modal.Footer>
                  <Button variant="secondary" 
                          onClick={this.props.onModalClose} >
                  Close
                  </Button>
                  
                  <Button variant="danger" 
                          onClick={this.sendNewTask}>
                  Add
                  </Button>
               </Modal.Footer>
            </Modal>
        );
    }
}

export default AddTask;

AddTask.propTypes = {
    disabled: PropTypes.bool,
    addNewTask: PropTypes.func
};