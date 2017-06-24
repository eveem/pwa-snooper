import React, { Component } from 'react'
import firebase from 'firebase'

class Main extends Component {
  state = {
    data: []
  }

  componentDidMount() {
    firebase.database().ref().child('post').once('value', (snapshot) => {
      this.setState({
        data: [...this.state.data, {...snapshot.val(), key: snapshot.key}]
      });
      console.log(snapshot.val())
    });
  }

  render() {
    return (
      <div>
        <h1>MAIN</h1>
      </div>
    )
  }
}

export default Main