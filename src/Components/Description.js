import React, { Component } from 'react';
import styles from './All.module.css';

class Description extends Component {
    render (){
        return(
            <div className={styles.des}>
            {this.props.description}
            </div>
        )
    }
}
      
export default Description;