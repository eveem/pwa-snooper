import React, { Component } from 'react'
import { Input, Card, Button  } from 'antd'
import firebase from 'firebase'
import { Redirect } from 'react-router-dom'
import TopBar from './TopBar'

class Create extends Component {
  state = { 
  	text: ''
  }

  writePost = (post_id, text, timestamp) => {

    firebase.auth().onAuthStateChanged(user => {
      firebase.database().ref().child('post').push({
        post_id: firebase.database().ref().child('post').push().key,
        text: this.state.text,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        created_by: user.uid,
      })
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
  }
      
  render() {
    return (
      <div className="createContainer">
        <TopBar path="create" />
        <Card className="writeCard">
          <Input 
            type="textarea" 
            value={this.state.text} 
            onChange={this.handleChange} 
            placeholder="Tell me your secret." 
          />
          <Button onClick={this.onclick}>post</Button>
        </Card>
      </div>
    )
  }
}

export default Create