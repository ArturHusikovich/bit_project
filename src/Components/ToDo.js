import React, { PureComponent } from 'react';
import styles from './All.module.css';
import { Container, Row, Col, InputGroup, Button} from 'react-bootstrap';
import Task from './Task';
import AddTask from './AddTask/AddTask';
import Confirm from './Confirm/Confirm';
import EditTask from './EditTask/EditTask';
import Search from './Search/Search';
import { connect } from 'react-redux';
import { getTasks, addTask, removeTask, editTask, removeSelected } from '../store/actions';

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
        const taskIds = [...this.state.selectedTasks]; 
        this.props.removeSelected(taskIds);
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

        if(!prevProps.removeTasksSuccess && this.props.removeTasksSuccess){
            this.setState({
                confirmStatus: false,
                selectedTasks: new Set()
            })
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
                    <Col sm={10} >
                        <Search />
                    </Col>
                </Row>

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
        editTaskStatus: state.editTaskStatus,
        removeTasksSuccess: state.removeTasksSuccess
    }
}
const mapDispatchToProps = {
    getTasks: getTasks,
    addTask: addTask,
    removeTask: removeTask,
    editTask: editTask,
    removeSelected: removeSelected
}
export default connect(mapStateToProps, mapDispatchToProps)(ToDo);