import React, { Component } from 'react'

//import containers
import NavBar from './containers/NavBar'

class App extends Component{
    render(){
        return(
            <div>
                <NavBar/>
                <div className="content">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default App;