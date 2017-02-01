import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
//import from Bootstrap
import { Modal, FormGroup, FormControl, Button, Checkbox } from 'react-bootstrap'

import { Link } from 'react-router'

class LoginModal extends Component{

  //login btn click
  handleLoginClick(){
    //get username and password values
    const username = findDOMNode(this.refs.loginUsername).value;
    const password = findDOMNode(this.refs.loginPassword).value;
    const keepMeLoggedin = findDOMNode(this.refs.loginKeepMeLoggedin).checked;

    //create onbject and pass data to handleLogin
    const userData = {username, password, keepMeLoggedin}
    this.props.handleLogin(userData)
  }

  //cancel btn Click
  handleCancelClick(tOrF){
    this.props.showLogginModal(tOrF);
  }

  //render
  render(){
    return(
      <div>

        <span onClick={() => this.handleCancelClick(true)}>Login</span>

        <Modal show={this.props.store.showLogginModalTorF} onHide={() => this.handleCancelClick(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
             <FormGroup>
                Username: <FormControl ref="loginUsername" type="text" placeholder="Username" /> <br />
                Password: <FormControl ref="loginPassword" type="password" placeholder="Password" /> <br />
                Keep me logged in. <input type="checkbox" ref="loginKeepMeLoggedin"/>
             </FormGroup>
          </Modal.Body>
          <Modal.Footer>
            <span>{this.props.store.info}</span>
            <Link to="/fp"><span className="loginModelLink">Reset Password</span></Link>
            <Button onClick={() => this.handleLoginClick()}>Login</Button>
            <Button onClick={() => this.handleCancelClick(false)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

LoginModal.propTypes = {
    store: PropTypes.object.isRequired,
    showLogginModal: PropTypes.func.isRequired,
    handleLogin: PropTypes.func.isRequired
}


export default LoginModal
