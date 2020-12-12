import React, { useState } from 'react';
import styles from './Contacts.module.css';

const Contacts = (props) => {
    const [values, setValues] = useState({ name: '',
                                           email: '',
                                           phone: '',
                                           message: ''
                                         });

    const changeInput = (event) => {
        const {name, value} = event.target;
        
        setValues( {
            ...values,
            [name]: value
        })
    }

    const sendMessage = () => {
        console.log(values);
        setValues({name: '',
                   email: '',
                   phone: '',
                   message: ''})
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

            <input type="phone"
                   name="phone"
                   onChange={changeInput}
                   value={values.phone}
                   placeholder="Telephone"
                   className={styles.item} />

            <textarea name="message"
                      onChange={changeInput}
                      value={values.message}
                      className={styles.item}
                      placeholder="Type tour message"></textarea>

            <button onClick={sendMessage}> Send Message </button>
        </div>
    )
}

export default Contacts;