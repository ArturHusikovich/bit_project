import React, { Component } from 'react';
import styles from './All.module.css';

class Price extends Component{
    render(){
        return(
            <div className={styles.price}>
            {this.props.price}
            </div>
        );
    }
}
export default Price;