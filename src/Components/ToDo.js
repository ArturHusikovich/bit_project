import React, { Component } from 'react';
import styles from './All.module.css';
import Task from './Task';

class ToDo extends Component{
    state = {
        inputValue: '',
        tasks: ['Call all the partners', 
                'Collect information about product',
                'Search and buy a new computer']
    }
   
    addNewTask = () => {
        this.setState( {tasks: [...this.state.tasks, this.state.inputValue],
                       inputValue: ''} );
    }

    changeInputValue = (event) => {
        this.setState({inputValue: event.target.value});
    }
    
    render(){
        return(
            <div className={styles.taskList}>
                <div>My ToDo List!</div>
                <div className={styles.items}>
                    {this.state.tasks.map((el, i) => <Task text={el} num={i} key={el} />)}
                </div>

                <div><input onChange={this.changeInputValue} 
                            value={this.state.inputValue} 
                            placeholder='Type your task'/></div>
                <div><button onClick={this.addNewTask}>Add New Task</button></div>
            </div>
        );
    }
}
export default ToDo;