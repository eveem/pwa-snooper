import React, { Component } from 'react'
import { Input, Card, Button  } from 'antd'
import firebase from 'firebase'
import { Redirect } from 'react-router-dom'

class Create extends Component {
  state = { 
  	text: '',
    redirect: false
  }

  writePost = (post_id, text, timestamp) => {
  	firebase.database().ref().child('post').push({
  		post_id: firebase.database().ref().child('post').push().key,
  		text: this.state.text,
  		timestamp: firebase.database.ServerValue.TIMESTAMP
  	})
  }
  	
  resetInput = () => {
  	this.setState({ text: "" })
  }

  onclick = () => {
  	this.setState({ text: this.state.text })
  	this.writePost ()
  	this.resetInput ()
  }

  handleChange = e => {
    this.setState({ text: e.target.value })
    console.log(e.target.value)
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
          <Input type="textarea" value={this.state.text} onChange={this.handleChange} placeholder="Tell me your secret." />
          <Button onClick={this.onclick}>post</Button>
          <Button onClick={this.logOut}>logout</Button>
        </Card>
      </div>
    )
  }
}

export default Create