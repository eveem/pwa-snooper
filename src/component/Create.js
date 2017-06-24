import React, { Component } from 'react'
import { Input } from 'antd'
import firebase from 'firebase'
import { connect } from 'react-firebase'
import { uniqueId } from 'lodash'

firebase.initializeApp({
  databaseURL: 'https://pwa-crossword.firebaseio.com/'
})

var database = firebase.database();

class Create extends Component {
  state = { 
  	text: '',
  	id: ''
  }

  writePost = (post_id, text, timestamp) => {
  	this.state.id = uniqueId()
  	firebase.database().ref('post/' + this.state.id).set({
  		post_id: this.state.id,
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