import React, { Component } from 'react';
import styles from './All.module.css';

class Name extends Component{
    render(){
        return(
            <div className={styles.name}>
            {this.props.name}
            </div>
        );
    }
}
export default Name;


