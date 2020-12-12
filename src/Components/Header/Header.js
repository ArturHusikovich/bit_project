import React from 'react';
import styles from './Header.module.css';
import logo from '../../Assets/Images/logo.jpg';
import { Container, Row, Col, Navbar, Nav} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';


const Header = (props) => {
    return (
        <Container className={styles.container}>
            <Row className={styles.row}>
                <Col sm={3}><img className={styles.img} alt='Logo' src={logo}/></Col>
                
                <Col sm={5}>
                    <Navbar collapseOnSelect expand="lg" bg="light" variant="light" className={styles.navbar}>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
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

                <Col sm={4}><h1 className={styles.h1}>My ToDo List!</h1></Col>
            </Row>
        </Container>
    )
}

export default Header;


