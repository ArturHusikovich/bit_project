import React, { Component } from 'react';
import { Modal, Button} from 'react-bootstrap';
import PropTypes from 'prop-types';

class Confirm extends Component{
     render(){
        return(
            <Modal show={true} 
                   onHide={this.props.onModalClose}
                   backdrop="static"
                   keyboard={false} >

               <Modal.Header closeButton>
                   <Modal.Title>Are you sure to remove this tasks?</Modal.Title>
               </Modal.Header>
               
               <Modal.Footer>
                  <Button variant="secondary" 
                          onClick={this.props.onModalClose} >
                  Close
                  </Button>
                  
                  <Button variant="danger" 
                          onClick={this.props.onSubmit}>
                  I am sure
                  </Button>
               </Modal.Footer>

            </Modal>
        );
    }
}

export default Confirm;

Confirm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onModalClose: PropTypes.func.isRequired
};