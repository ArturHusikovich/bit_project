import React, { Component } from 'react';
import styles from './All.module.css';

class Price extends Component{
    constructor(props){
        super(props);
        this.state = {
            price: this.props.price,
            exchangeValue: 478,
            currency: "dollars"
        }
    }
   
    onChangeCurrency = () => {
        this.state.currency === "dollars" 
        ? this.setState({price: this.state.price * this.state.exchangeValue, currency: "drams"}) 
        : this.setState({price: this.state.price / this.state.exchangeValue, currency: "dollars"})
    }

    render(){
        return(
            <div className={styles.price}>
                <div>{this.state.price} {this.state.currency}</div>
                <div><button onClick={this.onChangeCurrency}>Change the currency</button></div>
            </div>
        );
    }
}
export default Price;