import React, { PureComponent } from 'react';
import styles from './All.module.css';
import { Container, Row, Col, InputGroup, Button} from 'react-bootstrap';
import Task from './Task';
import logo from '../Assets/Images/logo.jpg';
import AddTask from './AddTask/AddTask';
import Confirm from './Confirm/Confirm';
import EditTask from './EditTask/EditTask';

class ToDo extends PureComponent{
    state = {
        tasks: [],
        selectedTasks: new Set(),
        confirmStatus: false,
        editTaskId: null,
        editTask: null
    }

    addNewTask = (task) => {
        const tasks = [task, ...this.state.tasks];

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

    addSelected = (id) => {
        const selectedTasks = new Set(this.state.selectedTasks);
        if(selectedTasks.has(id)){
            selectedTasks.delete(id);
        }else{
            selectedTasks.add(id);
        }
        
        this.setState({
            selectedTasks: selectedTasks
        })
    };

    removeSelected = () => {
        let tasks = [...this.state.tasks];
        this.state.selectedTasks.forEach((id) => {
            tasks = tasks.filter((task) => task._id !== id)
        });

        this.setState({
            tasks: tasks,
            selectedTasks: new Set(),
            confirmStatus: false
        });
    };

    toggleConfirm = () => {
        this.setState({
            confirmStatus: !this.state.confirmStatus
        });
    }

    toggleEditTask = (id) => {
        let filtered = this.state.tasks.filter(el => el._id === id);

        this.setState({
            editTaskId: id,
            editTask: filtered[0]
        });
    }

    onEditTaskSave = (editedTask) => {
        let editedTasks = this.state.tasks.map(task => task._id !== editedTask._id ? task : editedTask);
        
        this.setState({
            tasks: editedTasks,
            editTask: null,
            editTaskId: null
        });
    }

    render(){
        return(
            <Container className={styles.taskList}>

                <Row>
                    <Col sm={6}><img className={styles.img} alt='Logo' src={logo}/></Col>
                    <Col sm={6}><h1 className={styles.h1}>My ToDo List!</h1></Col>
                </Row>

                <Row className='justify-content-center' >
                    <Col sm={10} xs={12} md={8} lg={6} className={styles.row}>
                        <AddTask disabled={!!this.state.selectedTasks.size} 
                                 addNewTask={this.addNewTask} />
                    </Col>
                </Row>

                <Row className='justify-content-center' >
                    <Col sm={10} xs={12} md={8} lg={6} className={styles.row}>
                        <InputGroup className={styles.input}>
                                <Button variant="outline-danger" 
                                        onClick={this.toggleConfirm}
                                        disabled={!this.state.selectedTasks.size}>
                                    Remove Selected
                                </Button>
                        </InputGroup>
                    </Col>
                </Row>

                <Row className={styles.items}>
                    {this.state.tasks.map((el) => <Col xs={12} sm={6} md={6} lg={6} xl={6} key={el._id}>
                                                  <Task text={el.text} 
                                                        id={el._id} 
                                                        removeTask={this.removeTask}
                                                        toggleEditTask={this.toggleEditTask}
                                                        addSelected={this.addSelected}
                                                        disabled={!!this.state.selectedTasks.size}/>
                                                  </Col>)}
                </Row>

                { this.state.confirmStatus &&
                    <Confirm onModalClose={this.toggleConfirm}
                             onSubmit={this.removeSelected}
                             />
                } 
                { this.state.editTask &&
                    <EditTask onModalClose={this.toggleEditTask}
                              onSubmit={this.onEditTaskSave}
                              task={this.state.editTask}
                             />
                } 
            </Container>
        );
    }
}
export default ToDo;