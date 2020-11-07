import React, { Component } from 'react';
import styles from './All.module.css';
import { Container, Row, Col, FormControl, InputGroup, Button} from 'react-bootstrap';
import Task from './Task';
import logo from '../Assets/Images/logo.jpg';
import IdGenerator from '../Assets/common/IdGenerator';

class ToDo extends Component{
    state = {
        tasks: [],
        inputValue: ''
    }
   
    changeInputValue = (event) => {
        this.setState({inputValue: event.target.value});
    };
    
    handleKeyDown = (event) => {
        if(event.key === 'Enter'){
            this.addNewTask();
        }
    };

    addNewTask = () => {
        let newTask = {
            _id: IdGenerator(),
            text: this.state.inputValue
        };

        const tasks = [newTask, ...this.state.tasks];
        this.setState({
            tasks: tasks,
            inputValue: ''
        });
    };

    removeTask = (id) => {
        const newTasks = this.state.tasks.filter(task => task._id !== id);
        this.setState({
            tasks: newTasks
        });
    };

    render(){
        return(
            <Container className={styles.taskList}>
                <Row>
                    <Col md="6"><img className={styles.img} alt='Logo' src={logo}/></Col>
                    <Col md="6"><h1 className={styles.h1}>My ToDo List!</h1></Col>
                </Row>
                
                <Row className='justify-content-center' >
                    <Col sm={10} xs={12} md={8} lg={6} className={styles.row}>
                        <InputGroup className={styles.input}>
                            <FormControl placeholder="Type new task"
                                         aria-label="Type new task"
                                         aria-describedby="basic-addon2"
                                         onChange={this.changeInputValue}
                                         onKeyDown = {this.handleKeyDown}
                                         value = {this.state.inputValue} />
                            <InputGroup.Append>
                                <Button variant="outline-primary"
                                        onClick={this.addNewTask}
                                        disabled = {!this.state.inputValue}>
                                        Add New Task
                                </Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Col>
                </Row>

                <Row className={styles.items}>
                    {this.state.tasks.map((el) => <Col xs={12} sm={6} md={6} lg={6} xl={6} key={el._id}>
                                                  <Task text={el.text} id={el._id} removeTask={this.removeTask}/>
                                                  </Col>)}
                </Row>
            </Container>
        );
    }
}
export default ToDo;