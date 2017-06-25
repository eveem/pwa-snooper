import React, { Component } from 'react'
import firebase from 'firebase'
import { Redirect, Link } from 'react-router-dom'

class TopBar extends Component {
  state = {
    redirect: false
  }

  componentDidMount() {
    this.fireBaseListener = firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        this.setState({
          redirect: true
        })
      }
    })
  }

  logOut = async() => {
    await firebase.auth().signOut()
    this.setState({
      redirect: true
    })
  }

  render() {
    const { path } = this.props
    if (this.state.redirect) {
      return (
        <Redirect to='/' />
      )
    }
    return (
      <div>
        <div className="top">
          { 
            path !== 'main' && 
            <Link to='/main'>
              <button className="ghost read">
                READ CONTENT
              </button> 
            </Link>
          }
          { 
            path !== 'create' && 
            <Link to='/create'>
              <button className="ghost read">
                  WRITE CONTENT
              </button>
            </Link>
          }
          { 
            path !== 'profile' && 
            <Link to='/profile'>
              <button className="ghost read">
                YOUR CONTENT
              </button> 
            </Link>
          }
          <button className="ghost logout" onClick={this.logOut}>Logout</button>
        </div>
      </div>
    );
  }
}

export default TopBar;