import React, { Component } from 'react'
import firebase from 'firebase'
import { Redirect } from 'react-router-dom'

class Login extends Component {
  state = {
    redirect: false 
  }

  handleClick = async() => {
    const provider = new firebase.auth.FacebookAuthProvider();
    provider.setCustomParameters({
      'display': 'popup'
    }); 
    await firebase.auth().signInWithPopup(provider)
    this.setState({
      redirect: true
    })
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
     this.setState({
        redirect: user ? true : false
     })
    })
  }

  render() {
    if (this.state.redirect) {
      return (
        <Redirect to='/create' />
      )
    }
    return (
      <div className="container">
        <button className="facebook" onClick={this.handleClick}>
          LOGIN FACEBOOK
        </button>
      </div>
    )
  }
}

export default Login