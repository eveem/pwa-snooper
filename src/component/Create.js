import React, { Component } from 'react'
import { Input } from 'antd'
import firebase from 'firebase'

class Create extends Component {
  state = { 
  	text: ''
  }

  writePost = (post_id, text, timestamp) => {
  	firebase.database().ref().child('post').push({
  		post_id: firebase.database().ref().child('post').push().key,
  		text: this.state.text,
  		timestamp: firebase.database.ServerValue.TIMESTAMP
  	})
  }
  	
  onclick = () => {
  	this.setState({ text: this.state.text })
  	this.writePost ()
  }

  handleChange = e => {
    this.setState({ text: e.target.value })
    console.log(e.target.value)
  }

  render() {
    return (
      <div>
        <h1>Create</h1>
        <Input type="textarea" value={this.state.text} onChange={this.handleChange} placeholder="Tell me your secret." />
        <button onClick={this.onclick}>click</button>
      </div>
    )
  }
}

export default Create