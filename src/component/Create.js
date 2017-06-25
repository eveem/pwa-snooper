import React, { Component } from 'react'
import { Input, Card, Button, Alert  } from 'antd'
import firebase from 'firebase'
import TopBar from './TopBar'

class Create extends Component {
  state = { 
  	text: '',
    success: false
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
  	this.setState({ 
      text: "",
      success: true
    })
  }

  onclick = async () => {
  	await this.writePost()
  	this.resetInput()
  }

  handleChange = e => {
    this.setState({ 
      text: e.target.value,
      success: false
    })
  }
      
  render() {
    return (
      <div className="createContainer">
        <TopBar path="create" />
        <Card className="writeCard">
          <div className="writeContainer">
            <Input 
              type="textarea" 
              value={this.state.text} 
              onChange={this.handleChange}
              placeholder="Tell me your secret." 
              autosize 
            />
            <Button 
              type="primary" 
              onClick={this.onclick} 
            >
              POST
            </Button>
          </div>
          { this.state.success && <Alert message="Create Success" type="success" /> }
        </Card>
      </div>
    )
  }
}

export default Create