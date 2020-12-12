import React from 'react';
import styles from './Header.module.css';
import logo from '../../Assets/Images/logo.jpg';
import { Container, Row, Col, Navbar, Nav} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';


const Header = (props) => {
    return (
        <Container className={styles.container}>
            <Row className={styles.row}>
                <Col className={styles.col}><img className={styles.img} alt='Logo' src={logo}/></Col>
                
                <Col className={styles.col}>
                    <Navbar collapseOnSelect expand="lg" variant="light" className={styles.navbar}>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" className={styles.toggleBtn}/>
                        <Navbar.Collapse id="responsive-navbar-nav" className={styles.collapse}>
                            <Nav className="mr-auto">
                            <NavLink to='/' exact
                                     activeClassName={styles.activePage}
                                     className={styles.navLink} > Home
                            </NavLink>
                            <NavLink to='/about' exact
                                     activeClassName={styles.activePage}
                                     className={styles.navLink}> About
                            </NavLink>
                            <NavLink to='/contacts' exact
                                     activeClassName={styles.activePage} 
                                     className={styles.navLink}>Contacts
                            </NavLink>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </Col>

                <Col className={styles.col}><h1 className={styles.h1}>My ToDo List!</h1></Col>
            </Row>
        </Container>
    )
}

export default Header;


