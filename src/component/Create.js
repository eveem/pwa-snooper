import React, { Component } from 'react'
import { Card, Button } from 'antd'
import firebase from 'firebase'
import { Redirect } from 'react-router-dom'

class Create extends Component {
  state = {
    redirect: false
  }

  logOut = async() => {
    try {
      await firebase.auth().signOut()
      this.setState({
        redirect: true
      })
    } catch(e) {
      console.log(e)
    }
  }

  componentDidMount() {
    this.addAuthListener()
  }

  addAuthListener = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({
        redirect: !user ? true : false
      })
    })
  }

  render() {
    if (this.state.redirect) {
      return (
        <Redirect to='/' />
      )
    }
    return (
      <div className="container">
        <Card className="card">
          <h1>CREATE</h1>
          <Button onClick={this.logOut}>logout</Button>
        </Card>
      </div>
    )
  }
}

export default Create