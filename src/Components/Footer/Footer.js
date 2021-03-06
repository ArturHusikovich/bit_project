import React from 'react';
import styles from './Footer.module.css';
import ahLogo from '../../Assets/Images/ahLogo.jpg';

const Footer = (props) => {
    return (
        <div className={styles.container}>
        <div className={styles.footer}>
            <div className={styles.rowTop}>
            <a href="https://github.com/ArturHusikovich"
               target="_blank"
               rel="noopener noreferrer"><span>Github </span></a>            
            </div>
            <div className={styles.rowBtn}>
                <div className={styles.left}>
                    <h4>Created By "Husikovich" Web Agency</h4>
                    <img className={styles.img} alt='Logo' src={ahLogo} />
                </div>
                <h4 className={styles.right}>&#169; Copyright | All rights reserved</h4>
            </div>
        </div>   
        </div>  
    )
}

export default Footer;