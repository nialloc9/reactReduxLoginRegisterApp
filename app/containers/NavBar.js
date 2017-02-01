import React from 'react'
//import connection to store
import { connect } from 'react-redux'

//import axios
import axios from 'axios'

//import dispatch
import { dispatch } from '../store'

//import actions
import { bindActionCreators } from 'redux'
import { authLogin, authLogout, showLogginModal } from '../actions'

//import Bootstrap
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, FormGroup, FormControl, Button } from 'react-bootstrap'

//import login Modal
import LoginModal from '../components/LoginModal'

//import from router
import { hashHistory } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'



class NavBar extends React.Component{

    handleLogin(userData){
    //add task and timestamp
        userData.task='AUTH_LOGIN'
        userData.timestamp = Date.now()

        //http request
        axios({
            url: "/projects/reactReduxRegisterAndLoginApp/server/login.php",
            method: 'post',
            data: userData
        }).then((response)=>{
            //check if data is valid
            if(response.data != false){
                dispatch(authLogin(response.data))
            }
        })
    }
  //render method
  render(){
    //deconstruct props
    const { auth, navBar } = this.props

    //login function

    //loggedin NavBar
    const loggedin = (
      <div className="customNavArea">
        <Navbar inverse collapseOnSelect className="customNav">
          <Navbar.Header>
            <Navbar.Brand>
              Logo
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <LinkContainer to="/#"><NavItem eventKey={1}>Home</NavItem></LinkContainer>
              <NavItem eventKey={2} href="#">Niall</NavItem>
              <NavItem eventKey={3} href="#">Chat</NavItem>
              <NavItem eventKey={4} href="#">Notifications</NavItem>
            </Nav>
            <Navbar.Form pullLeft>
             <FormGroup>
               <FormControl type="text" placeholder="Search" />
             </FormGroup>
            </Navbar.Form>
            <Nav pullRight>
              <NavItem eventKey={5} onClick={this.props.authLogout}>Logout</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )



    //not loggedin NavBar
    const notLoggedin = (
      <div className="customNavArea">
        <Navbar inverse collapseOnSelect fluid className="customNav">
          <Navbar.Header>
            <Navbar.Brand>
              Logo
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <LinkContainer to={{pathname: '/', query: {}}}><NavItem eventKey={1}>Home</NavItem></LinkContainer>
              <NavItem eventKey={2} href="#">Community</NavItem>
              <NavItem eventKey={3} href="#">About</NavItem>
              <NavItem eventKey={4} href="#">T&Q</NavItem>
            </Nav>
            <Nav pullRight>
              <NavItem eventKey={5}>Register</NavItem>
              <NavItem eventKey={6}><LoginModal store={{showLogginModalTorF: navBar.showLogginModalTorF, info: auth.info}} showLogginModal={this.props.showLogginModal.bind()} handleLogin={this.handleLogin.bind()}/></NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )


    const nav = (auth.loggedin) ? loggedin : notLoggedin
    return(
      <div>
        {nav}
      </div>
    )
  }
}

//map state to props for component
function mapStateToProps(state){
  return {
    auth: state.auth,
    navBar: state.navBar
  }
}

//match actions to dispatch
function matchDispatchToProps(dispatch){
  return bindActionCreators({ authLogin: authLogin, authLogout: authLogout, showLogginModal: showLogginModal}, dispatch)
}

//export Component
export default connect(mapStateToProps, matchDispatchToProps)(NavBar)
