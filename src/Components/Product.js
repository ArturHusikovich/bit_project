import React, { Component } from 'react';
import styles from './All.module.css';
import Description from './Description';
import Name from './Name';
import Price from './Price';

class Product extends Component{
    render(){
        return(
            <div className={styles.main}>
                <Name name={this.props.name} />
                <Price price={this.props.price} />
                <Description description={this.props.description} />             
            </div>
        );
    }
}
export default Product; 