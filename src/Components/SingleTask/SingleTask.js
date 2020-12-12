import React, { PureComponent } from 'react';
import styles from './SingleTask.module.css';
import Spinner from '../Spinner/Spinner';
import { DateFormat } from '../../Assets/common/DateFormat';

class SingleTask extends PureComponent{
    state = {
        task: null
    };

    componentDidMount(){
        const taskId =this.props.match.params.id; 

        fetch(`http://localhost:3001/task/${taskId}`, {
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
                task: data
            });  
        })
        .catch((error) => {
                console.log("ToDo -> error", error)
            });
    }
 
    render(){
        const {task} = this.state;

      return(
      <div>
          {!!task ? 
                    <div className={styles.singleTask}>
                        <p>Title: {task.title}</p>
                        <p>Description: {task.description}</p>
                        <p>Date: {DateFormat(task.date)}</p>
                    </div> 
                  : <Spinner /> }
          
      </div>
      )
  }
}

export default SingleTask;


