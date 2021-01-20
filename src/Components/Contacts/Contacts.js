import React, { useState, useEffect } from 'react';
import styles from './Contacts.module.css';
import { connect } from 'react-redux';
import { sendContacts } from '../../store/actions';

const Contacts = (props) => {
    const [values, setValues] = useState({ name: '',
                                           email: '',
                                           message: ''
                                         });

    useEffect(() => {
            setValues({name: '',
                       email: '',
                       message: ''})
        
    }, [props.sendContactsSuccess] );

    
    const changeInput = (event) => {
        const {name, value} = event.target;
        
        setValues( {
            ...values,
            [name]: value
        })
    }

    const submit = () => {
        props.sendContacts(values);
    }
    
    return (
        <div className={styles.main}>
            <input type="text" 
                   name="name"
                   onChange={changeInput}
                   value={values.name}
                   placeholder="Enter your name"
                   className={styles.item}/>

            <input type="email"
                   name="email"
                   onChange={changeInput}
                   value={values.email}
                   placeholder="Email for contact"
                   className={styles.item} />

            <textarea name="message"
                      onChange={changeInput}
                      value={values.message}
                      className={styles.item}
                      placeholder="Type tour message"></textarea>

            <button onClick={submit}> Send Message </button>

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        sendContactsSuccess: state.sendContactsSuccess
    }
}
const mapDispatchToProps = {
    sendContacts: sendContacts
}

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);