import React, { PureComponent } from 'react';
import styles from './AddTask.module.css';
import { FormControl, InputGroup, Button} from 'react-bootstrap';
import IdGenerator from '../../Assets/common/IdGenerator';
import PropTypes from 'prop-types';

class AddTask extends PureComponent{
    state = {
        inputValue: ''
    }
   
    changeInputValue = (event) => {
        this.setState({
            inputValue: event.target.value
        });
    };
    
    handleKeyDown = (event) => {
        if(event.key === 'Enter'){
            this.sendNewTask();
        }
    };

    sendNewTask = () => {
        let newTask = {
            _id: IdGenerator(),
            text: this.state.inputValue
        };

        this.props.addNewTask(newTask);

        this.setState({
            inputValue: ''
        });
    };

    render(){
        return(
            <>
            <InputGroup className={styles.input}>
                <FormControl placeholder="Type new task"
                             aria-label="Type new task"
                             aria-describedby="basic-addon2"
                             onChange={this.changeInputValue}
                             onKeyDown = {this.handleKeyDown}
                             value = {this.state.inputValue} 
                             disabled = {this.props.disabled} 
                             className= {styles.input}/>
                    <InputGroup.Append>
                        <Button variant="outline-primary"
                                onClick={this.sendNewTask}
                                disabled = {!this.state.inputValue}>
                                Add New Task
                        </Button>
                    </InputGroup.Append>
            </InputGroup>
            </>
        );
    }
}

export default AddTask;

AddTask.propTypes = {
    disabled: PropTypes.bool,
    addNewTask: PropTypes.func.isRequired
};