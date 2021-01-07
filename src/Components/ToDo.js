import React, { PureComponent } from 'react';
import styles from './All.module.css';
import { Container, Row, Col, InputGroup, Button} from 'react-bootstrap';
import Task from './Task';
import AddTask from './AddTask/AddTask';
import Confirm from './Confirm/Confirm';
import EditTask from './EditTask/EditTask';
import { connect } from 'react-redux';
import { getTasks, addTask, removeTask, editTask } from '../store/actions';

class ToDo extends PureComponent{
    state = {
        selectedTasks: new Set(),
        confirmStatus: false,
        editTask: null,
        addTaskModal: false
    }

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

    componentDidMount(){
        this.props.getTasks();
    }
    
    componentDidUpdate(prevProps){
        if(!prevProps.addTaskStatus && this.props.addTaskStatus){
            this.toggleAddTaskModal();
        }

        if(!prevProps.editTaskStatus && this.props.editTaskStatus){
            this.toggleEditTask();
        }
    }

    toggleAddTaskModal = () => {
        this.setState({
            addTaskModal: !this.state.addTaskModal
        });
    }

    toggleEditTask = (id) => {
        let filtered = this.props.tasks.filter(el => el._id === id);

        this.setState({
            editTaskId: id,
            editTask: filtered[0]
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
                    {this.props.tasks.map((el) => <Col key={el._id}>
                                                  <Task title={el.title} 
                                                        id={el._id} 
                                                        date={el.date}
                                                        created_at={el.created_at}
                                                        description={el.description}
                                                        removeTask={this.props.removeTask}
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
                              onSubmit={this.props.editTask}
                              task={this.state.editTask}
                             />
                }
                { this.state.addTaskModal &&
                    <AddTask onModalClose={this.toggleAddTaskModal}
                             onSubmit={this.props.addTask}
                              />
                        
                }
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return { 
        tasks: state.tasks,
        addTaskStatus: state.addTaskStatus,
        editTaskStatus: state.editTaskStatus
    }
}
const mapDispatchToProps = {
    getTasks: getTasks,
    addTask: addTask,
    removeTask: removeTask,
    editTask: editTask
}
export default connect(mapStateToProps, mapDispatchToProps)(ToDo);