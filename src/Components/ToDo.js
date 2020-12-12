import React, { PureComponent } from 'react';
import styles from './All.module.css';
import { Container, Row, Col, InputGroup, Button} from 'react-bootstrap';
import Task from './Task';
import AddTask from './AddTask/AddTask';
import Confirm from './Confirm/Confirm';
import EditTask from './EditTask/EditTask';

class ToDo extends PureComponent{
    state = {
        tasks: [],
        selectedTasks: new Set(),
        confirmStatus: false,
        editTask: null,
        addTaskModal: false
    }

    addNewTask = (task) => {

        fetch(`http://localhost:3001/task`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })
        .then((response) => response.json())
        .then((data) => {
            if(data.error) {
                throw data.error;
            }

        const tasks = [data, ...this.state.tasks];
            this.setState({
                tasks: tasks,
                addTaskModal: false
            });
            
        })
        .catch((error) => {
                console.log("ToDo -> error", error)
            });
    };

    removeTask = (id) => {
        fetch(`http://localhost:3001/task/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            if(data.error) {
                throw data.error;
            }

        const newTasks = this.state.tasks.filter(task => task._id !== id);
        this.setState({
                tasks: newTasks
            });
            
        })
        .catch((error) => {
                console.log("ToDo -> error", error)
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
        const body = {
            tasks: [...this.state.selectedTasks] 
        }


        fetch(`http://localhost:3001/task`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then((response) => response.json())
        .then((data) => {
            if(data.error) {
                throw data.error;
            }

            let tasks = [...this.state.tasks];
            this.state.selectedTasks.forEach((id) => {
                tasks = tasks.filter((task) => task._id !== id)
            });
    
            this.setState({
                tasks: tasks,
                selectedTasks: new Set(),
                confirmStatus: false
            });

        })
        .catch((error) => {
                console.log("ToDo -> error", error)
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

        fetch(`http://localhost:3001/task/${editedTask._id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedTask)
        })
            .then((res) => res.json())
            .then(response => {
                if (response.error) {
                    throw response.error;
                }

                const tasks = [...this.state.tasks];

                const foundTaskIndex = tasks.findIndex((task) => task._id === editedTask._id);
                tasks[foundTaskIndex] = response;
        
                this.setState({
                    tasks: tasks,
                    editTask: null
                });

            })
            .catch((error) => {
                console.log("ToDo -> error", error)
            });
    }

    componentDidMount(){
        fetch(`http://localhost:3001/task`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((response) => response.json())
        .then((data) => {
            if(data.error) {
                throw data.error;
            }

        this.setState({
                tasks: data
            });  
        })
        .catch((error) => {
                console.log("ToDo -> error", error)
            });
    }

    toggleAddTaskModal = () => {
        this.setState({
            addTaskModal: !this.state.addTaskModal
        });
    }
    render(){
        return(
            <Container className={styles.taskList}>

                <Row className='justify-content-center' >
                    <Col sm={10} xs={12} md={8} lg={6} className={styles.row}>
                        <Button onClick={this.toggleAddTaskModal}
                                disabled={!!this.state.selectedTasks.size}
                                variant="outline-primary">
                            Add New Task
                        </Button>
                    </Col>
                </Row>

                <Row className='justify-content-center' >
                    <Col sm={10} xs={12} md={8} lg={6} className={styles.row}>
                        <InputGroup  className='justify-content-center' >
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
                                                  <Task title={el.title} 
                                                        id={el._id} 
                                                        date={el.date}
                                                        created_at={el.created_at}
                                                        description={el.description}
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
                { this.state.editTask &&
                    <EditTask onModalClose={this.toggleEditTask}
                              onSubmit={this.onEditTaskSave}
                              task={this.state.editTask}
                             />
                } 
                { this.state.addTaskModal &&
                    <AddTask onModalClose={this.toggleAddTaskModal}
                             onSubmit={this.addNewTask}
                              />
                        
                }
            </Container>
        );
    }
}
export default ToDo;